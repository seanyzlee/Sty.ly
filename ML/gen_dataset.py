import ollama
from langchain.prompts import ChatPromptTemplate
import pandas as pd
import json

PROMPT_TEMPLATE = """
Based on the following weather data, please annotate the data to create a new dataset by providing an outfit recommendation. Append the outfit as a new key-value pair in the JSON format:

{weather_data}

Return the JSON with an added "outfit" key, where the value is a string of recommended items like "Sunglasses, Hat, T-shirt". The outfit should be appropriate for the weather conditions. Provide only a string of items with no additional text. No other keys or values should be added or removed from the JSON except adding the new "outfit" key and its value.
Example (do not deviate from this): {{"Summary": "Mostly Cloudy", "Precipitation Type": "rain", "Temperature": 13.9, "Humidity": 0.67, "outfit": "Rain jacket, Waterproof trousers, Breathable socks"}}
"""
MODEL = 'llama3.1'

def new_dataset(weather_data):
    response = ollama.chat(
        model=MODEL,
        messages=[{'role': 'user', 'content': ChatPromptTemplate.from_template(PROMPT_TEMPLATE).format(weather_data=weather_data)}],
        stream=False,
        format='json'
        )['message']['content']
    
    try:
        # Load the response string as a JSON object
        outfit_data = json.loads(response)
    except json.JSONDecodeError:
        print(f"Error decoding JSON response: {response}")
        return weather_data  # Return original data in case of error

    # Add the outfit recommendation to the original weather data
    weather_data["outfit"] = outfit_data.get("outfit", "No recommendation")
    
    return weather_data

def rain_csv_to_json(csv):
    return pd.read_csv(csv).to_json('datasets/unfiltered_clean_data/weatherHistory_rain.json', orient='records', lines=False)

def snow_csv_to_json(csv):
    return pd.read_csv(csv).to_json('datasets/unfiltered_clean_data/weatherHistory_snow.json', orient='records', lines=False)

def sun_csv_to_json(csv):
    return pd.read_csv(csv).to_json('datasets/unfiltered_clean_data/weatherHistory_nan.json', orient='records', lines=False)

def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def write_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)  # Write the entire list as a JSON array
        
def call_LLM_for_rain_outfit_dataset():
    rain_csv_to_json('datasets/unfiltered_clean_data/weatherHistory_rain.csv')
    rain_json = read_json('datasets/unfiltered_clean_data/weatherHistory_rain.json')
    annotated_data = []
    for i in range(len(rain_json)):
        annotated_entry = new_dataset(rain_json[i])
        print("Rain: ", annotated_entry)
        annotated_data.append(annotated_entry)
    write_json(annotated_data, 'datasets/clean_data/weatherHistory_rain_outfit.json')

def call_LLM_for_snow_outfit_dataset():
    snow_csv_to_json('datasets/unfiltered_clean_data/weatherHistory_snow.csv')
    snow_json = read_json('datasets/unfiltered_clean_data/weatherHistory_snow.json')
    annotated_data = []
    for i in range(len(snow_json)):
        annotated_entry = new_dataset(snow_json[i])
        print("Snow: ", annotated_entry)
        annotated_data.append(annotated_entry)
    write_json(annotated_data, 'datasets/clean_data/weatherHistory_snow_outfit.json')

def call_LLM_for_sun_outfit_dataset():
    sun_csv_to_json('datasets/unfiltered_clean_data/weatherHistory_nan.csv')
    sun_json = read_json('datasets/unfiltered_clean_data/weatherHistory_nan.json')
    annotated_data = []
    for i in range(len(sun_json)):
        annotated_entry = new_dataset(sun_json[i])
        print("Sun: ", annotated_entry)
        annotated_data.append(annotated_entry)
    write_json(annotated_data, 'datasets/clean_data/weatherHistory_nan_outfit.json')

def main():
    call_LLM_for_snow_outfit_dataset()
    

if __name__ == '__main__':
    main()