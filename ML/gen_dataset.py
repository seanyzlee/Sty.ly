import ollama
from langchain.prompts import ChatPromptTemplate
import pandas as pd

PROMPT_TEMPLATE = """
You have been given example entries from a dataset. Please generate {entries} more entries that are similar to the given examples.
Data: 
{data}
"""

def new_dataset(entries, data):
    return ollama.chat(
        model='llama3.1',
        messages=[{'role': 'user', 'content': ChatPromptTemplate.from_template(PROMPT_TEMPLATE).format(entries=str(entries), data=data)}],
        stream=False,
        )

def csv_to_json(csv):
    return pd.read_csv(csv).to_json('ML/datasets/weatherHistory_clean_rain.json', orient='records', lines=False)

def read_json(json):
    with open(json, 'r') as file:
        return file.read()

def main():
    csv_to_json('ML/datasets/weatherHistory_clean_rain.csv')
    data = read_json('ML/datasets/weatherHistory_clean_rain.json')
    new_data = new_dataset(50, data)
    print(new_data)

if __name__ == '__main__':
    main()