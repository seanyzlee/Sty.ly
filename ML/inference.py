from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import ollama
from langchain.prompts import ChatPromptTemplate
from venv_auto1111sdk import stable_diffusion

PROMPT_TEMPLATE = """
Based on the following weather data, please annotate the data to create a new dataset by providing an outfit recommendation.

Unformatted input data: {weather_data}

Return the response with the following structure:

{{
    "output": ""
}}

Do not use markdown, '\', or any other formatting in your response. The "outfit" should be appropriate for the weather conditions and should be a concise string of items like "Sunglasses, Hat, T-shirt". Provide only the string of items with no additional text. If you are unsure about the outfit, you can leave the "output" field empty. Only return the string of items, not the entire JSON structure or any other information. DO NOT return a response like this: {{'Humidity': 0.89, 'Precipitation Type': None, 'Summary': 'Clear', 'Temperature': 7.6}} or a blank response.
"""

app = Flask(__name__)
CORS(app)
MODEL = "ignition"

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.get_json()
    print(data)
    response_data = {
        'received': data,
        'message': 'Got Data'
    }
    response_data = jsonify(response_data)
    print(response_data)
    return ollama_func(response_data)

def ollama_func(weather_data):
    return ollama.chat(
        model=MODEL,
        messages=[{'role': 'user', 'content': ChatPromptTemplate.from_template(PROMPT_TEMPLATE).format(weather_data=weather_data)}],
        stream=False,
        format='json'
    )['message']['content']

@app.route('/api/generateImage', methods=['GET'])
def generate_outfit_image():
    response = requests.get("http://localhost:5050/askModelOutfits")
    response_json = response.json()
    return stable_diffusion.generate_image(response_json['output'])
    
if __name__ == '__main__':
    app.run(port=5025, debug=True)