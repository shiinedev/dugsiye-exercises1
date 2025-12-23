# AI Course Exercise 6 - Multi-modal AI Assistant

This exercise demonstrates how to create a comprehensive multi-modal AI assistant that combines multiple OpenAI capabilities to generate educational content in different formats.

## What This Exercise Covers

- **Text Generation**: Creates educational content using GPT-4
- **Image Generation**: Generates illustrations using DALL-E 3
- **Audio Generation**: Converts text to speech using OpenAI's TTS model
- **File Management**: Organizes and saves generated content systematically

## Features

🎯 **Multi-modal Content Creation**: Combines text, image, and audio generation for a complete learning experience

📝 **Educational Focus**: Generates structured, informative content suitable for learning

🎨 **Visual Illustrations**: Creates relevant images to support the educational content

🎵 **Audio Narration**: Converts written content to natural-sounding speech

📁 **Organized Output**: Saves all generated content in structured folders with metadata

## How to Run

1. Make sure you have your OpenAI API key in a `.env` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the exercise:
   ```bash
   npm run dev
   ```

## Output Structure

The exercise creates an organized folder structure:
```
output/
└── multimodal_[topic]_[timestamp]/
    ├── content.txt          # Generated educational text
    ├── image_url.txt        # URL to generated image
    ├── narration.mp3        # Audio narration
    └── summary.json         # Metadata and summary
```

## Educational Value

This exercise teaches:
- Integration of multiple AI modalities
- Systematic content organization
- Error handling in AI applications  
- File system operations with Node.js
- Asynchronous programming patterns

## Customization

You can modify the `topic` variable in `index.js` to generate content about any subject you're interested in learning about.