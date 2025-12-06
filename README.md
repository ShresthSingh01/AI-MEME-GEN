
🤖 AI Meme Generator

A fun & intelligent AI-powered Meme Generator built using OpenAI API + JavaScript + HTML + CSS.
Users can enter a topic, and the AI generates meme text and creates a meme layout dynamically. Supports downloadable meme images and adjustable templates.

🚀 Project Overview

This project uses the OpenAI API (text generation / text-to-image depending on mode) to automatically generate witty meme captions and optionally create meme visuals. The UI is simple, responsive, and beginner-friendly using vanilla HTML, CSS & JavaScript.

🧠 Key Features

Generate meme text using OpenAI

Auto-place text on a meme template

Choose from default templates or upload your own image

Download generated memes as images

Fully responsive front-end UI

Lightweight & fast (no extra frameworks)

🛠 Tech Stack
Technology	Purpose
HTML	UI Structure
CSS	Styling (responsive layout)
JavaScript	Logic & API handling
OpenAI API	AI text generation
Canvas	Render & download meme image

📁 Project Folder Structure
AI-Meme-Generator/
│── index.html
│── style.css
│── script.js
│── assets/
│   └── meme-templates/
└── README.md

🔑 Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/your-repo/ai-meme-gen.git
cd ai-meme-gen

2️⃣ Install Dependencies

No external dependencies required.

3️⃣ Add OpenAI API Key

Create a .env file or directly place inside script.js (not recommended in production):

const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

🧾 How It Works

User enters a meme topic or situation

JavaScript sends input to OpenAI API

AI returns a meme-style caption

Caption is placed on selected meme template using HTML Canvas

User downloads final meme as an image

📚 Example Prompt

“Generate a funny meme line about programmers debugging code at 3am”

Output example:

"When you finally fix the bug but have no idea how." 😭🔥

📸 Screenshots

(Add screenshots here later)

🧪 Future Enhancements

AI image generation (DALL·E style memes)

Meme template marketplace

Voice input meme ideas

Social sharing button (Instagram / WhatsApp / X)

🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first to discuss what you would like to change.


💡 Author

Shresth Singh
Project for AI Internship | AI Integration Using APIs

⭐ If you like this project, don’t forget to star the repo!

