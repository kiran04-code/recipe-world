import gradio as gr
from huggingface_hub import InferenceClient
import os
import ssl

# Ensure SSL module is available
ssl._create_default_https_context = ssl._create_unverified_context

# Load Hugging Face API Token from Environment Variables
HF_TOKEN = os.getenv("HF_TOKEN")

# Initialize Mistral-7B Model
client = InferenceClient("mistralai/Mistral-7B-Instruct-v0.1", token=HF_TOKEN)

# Function to handle chat
def respond(message, history):
    messages = []
    
    for user_msg, bot_msg in history:
        if user_msg:
            messages.append({"role": "user", "content": user_msg})
        if bot_msg:
            messages.append({"role": "assistant", "content": bot_msg})

    messages.append({"role": "user", "content": message})

    response = ""
    chat_response = client.chat_completion(
        messages,
        max_tokens=512,  # Default max tokens
        stream=False,  # Change to True if streaming works
        temperature=0.7,  # Default temperature
        top_p=0.95,  # Default top-p value
    )
    
    if hasattr(chat_response, "choices") and chat_response.choices:
        response = chat_response.choices[0].message.content
    
    return response

# Custom Styling for Dark Mode
custom_css = """
body {
    background-color: #121212;
    color: white;
    font-family: 'Arial', sans-serif;
}
.gradio-container {
    max-width: 700px;
    margin: auto;
    padding: 20px;
    background: #1E1E1E;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    color: #00ccff;
}
h2 {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
}
.watermark {
    text-align: center;
    font-size: 14px;
    color: gray;
    margin-top: 20px;
}
"""

# Gradio Chat Interface
with gr.Blocks(css=custom_css) as demo:
    gr.Markdown("<h1>Mistral AI Chatbot</h1>")  # Top left title
    gr.Markdown("<h2>How can I help you?</h2>")  # Center title

    chatbot = gr.ChatInterface(respond)
    
    gr.Markdown('<div class="watermark">Created by Rajma</div>')

if _name_ == "_main_":
    demo.launch()