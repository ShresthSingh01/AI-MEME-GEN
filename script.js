// ---------- Configuration ----------
// Replace this with your OpenAI API key
const OPENAI_API_KEY = "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";

// Arrays of image templates for memes and posters
const memeTemplates = [
  "assets/meme1.jpg",
  "assets/meme2.jpg",
  "assets/meme3.jpg",
  "assets/meme4.jpg"
];
const posterTemplates = [
  "assets/poster1.jpg",
  "assets/poster2.jpg",
  "assets/poster3.jpg",
  "assets/poster4.jpg",
  "assets/poster5.jpg"
];

// ---------- DOM Elements ----------
// Get references to HTML elements
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const randomBtn = document.getElementById("randomBtn");
const topicInput = document.getElementById("topic");
const modeSelect = document.getElementById("mode");
const canvas = document.getElementById("memeCanvas");
const loader = document.getElementById("loader");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
let currentTemplate = "";
canvas.width = 380;
canvas.height = 380;

// ---------- Functions ----------

// Select a random template based on the selected mode (meme or poster)
function getRandomTemplate() {
  const mode = modeSelect.value; // Get the selected mode
  const templates = mode === "meme" ? memeTemplates : posterTemplates; // Choose the correct template array
  return templates[Math.floor(Math.random() * templates.length)]; // Pick a random template
}

// Detect the mood of the topic (funny or serious) based on keywords
function detectMood(text) {
  const funnyWords = ["fun", "joke", "laugh", "stress", "college", "exam"];
  // Check if the topic contains any funny words
  return funnyWords.some(word => text.toLowerCase().includes(word)) ? "funny" : "serious";
}

// Generate an AI caption using OpenAI's API
async function generateAICaption(topic, mode) {
  loader.style.display = "block"; // Show the loader while waiting for the response
  try {
    const mood = detectMood(topic); // Detect the mood of the topic
    const prompt = mode === "meme"
      ? `Write a short, funny meme caption about ${topic}. It should be ${mood} and under 12 words.`
      : `Write an inspiring poster tagline about ${topic}. It should be ${mood} and under 12 words.`;

    // Make a request to the OpenAI API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorBody = await response.text(); // Get the error message
      console.error("API Error:", response.status, response.statusText, errorBody);
      return "Error: Unable to generate caption.";
    }

    // Parse the response and extract the caption
    const data = await response.json();
    console.log("API Response:", data); // Log the response for debugging
    return data.choices?.[0]?.message?.content?.trim() || "AI Caption Failed 😅";
  } catch (err) {
    console.error("Fetch Error:", err); // Log any network errors
    return "Error generating caption.";
  } finally {
    loader.style.display = "none"; // Hide the loader
  }
}

// Draw the final meme or poster on the canvas
async function generateMeme() {
  const topic = topicInput.value.trim(); // Get the topic from the input
  const mode = modeSelect.value; // Get the selected mode
  if (!topic) {
    alert("Please enter a topic!"); // Show an alert if the topic is empty
    return;
  }

  const caption = await generateAICaption(topic, mode); // Generate the caption
  currentTemplate = getRandomTemplate(); // Get a random template

  const img = new Image(); // Create a new image object
  img.src = currentTemplate; // Set the image source
  img.crossOrigin = "anonymous"; // Allow cross-origin access

  // Draw the image and caption on the canvas when the image loads
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the template image

    // Set text styles
    ctx.font = mode === "meme" ? "bold 20px Impact" : "bold 22px Poppins";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";

    // Draw the caption text
    const lines = wrapText(ctx, caption, canvas.width - 20); // Wrap the text
    let y = mode === "meme" ? canvas.height - 60 : canvas.height - 80; // Set the starting Y position
    lines.forEach(line => {
      ctx.strokeText(line, canvas.width / 2, y); // Draw the text outline
      ctx.fillText(line, canvas.width / 2, y); // Fill the text
      y += 25; // Move to the next line
    });
  };
}

// Helper function to wrap text into multiple lines
function wrapText(context, text, maxWidth) {
  const words = text.split(" "); // Split the text into words
  const lines = [];
  let line = "";

  // Loop through the words and create lines that fit within the maxWidth
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line); // Add the current line to the lines array
      line = words[i] + " "; // Start a new line
    } else {
      line = testLine; // Add the word to the current line
    }
  }
  lines.push(line); // Add the last line
  return lines;
}

// Download the generated image
function downloadImage() {
  const link = document.createElement("a"); // Create a download link
  link.download = "ai_meme_poster.png"; // Set the file name
  link.href = canvas.toDataURL("image/png"); // Get the image data URL
  link.click(); // Trigger the download
}

// ---------- Event Listeners ----------
// Add event listeners for button clicks
generateBtn.addEventListener("click", generateMeme);
randomBtn.addEventListener("click", () => {
  currentTemplate = getRandomTemplate(); // Get a new random template
  generateMeme(); // Generate the meme/poster
});
downloadBtn.addEventListener("click", downloadImage);
