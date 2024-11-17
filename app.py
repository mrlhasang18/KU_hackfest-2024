# from flask import Flask, jsonify

# app = Flask(__name__)

# @app.route('/get-text', methods=['GET'])


# def get_text():
#     # Define the text string you want to return
#     return jsonify({"message": "Hello from ESP32-connected"})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

from flask import Flask, jsonify
import requests
import os
from google.generativeai import configure, GenerativeModel
import PIL.Image
import time

app = Flask(__name__)

# Configure Google Generative AI with your API key
configure(api_key='AIzaSyCHXKfxeg6N45xIyiGHxCF_Af4VaBhULAI')

# Initialize the model
model = GenerativeModel('gemini-1.5-flash')

def download_image(url):
    """Download image from the given URL and save it as 'image.jpg'"""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open('image.jpg', 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"Error downloading image: {e}")
        return False

def classify_waste(image_path):
    """Classify waste image using Google's Generative AI"""
    try:
        # Load the image
        img = PIL.Image.open(image_path)
        
        # Prompt for waste classification
        prompt = """Analyze this image and classify the waste shown into one of these categories:
        1. Recyclable
        2. Non-recyclable
        3. Organic
        4. Electronic waste
        
        Return ONLY ONE of these exact words: 'recyclable', 'non-recyclable', 'organic', 'electronic'"""
        
        # Generate response
        response = model.generate_content([prompt, img])
        
        # Extract the classification
        result = response.text.strip().lower()
        
        # Validate response
        valid_categories = {'recyclable', 'non-recyclable', 'organic', 'electronic'}
        if result in valid_categories:
            return result
        else:
            return "unclassified"
            
    except Exception as e:
        print(f"Error classifying image: {e}")
        return "error"

@app.route('/get-text', methods=['GET'])
def get_text():
    try:
        # URL for the captured image
        capture_url = "http://192.168.204.91/capture"  # Replace XXX with your ESP32's IP
        
        # Download the image
        if download_image(capture_url):
            # Wait briefly to ensure image is saved
            time.sleep(1)
            
            # Classify the image
            waste_type = classify_waste('image.jpg')
            
            # Return the classification result
            return jsonify({"message": waste_type})
        else:
            return jsonify({"message": "error_downloading_image"})
            
    except Exception as e:
        print(f"Error in get_text: {e}")
        return jsonify({"message": "error_processing_request"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)