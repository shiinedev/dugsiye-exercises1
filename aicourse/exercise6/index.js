import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multi-modal AI Assistant that combines text, image, and audio generation
const createMultimodalContent = async (topic) => {
  try {
    console.log(`🚀 Creating multimodal content for topic: "${topic}"`);
    
    // Step 1: Generate educational content
    console.log("\n📝 Generating educational content...");
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an educational content creator. Create concise, engaging educational content with clear explanations and practical examples.",
        },
        {
          role: "user",
          content: `Create a brief educational explanation about "${topic}" that is informative and easy to understand. Keep it under 300 words.`,
        },
      ],
      max_completion_tokens: 400,
      temperature: 0.7,
    });

    const educationalContent = textResponse.choices[0].message.content;
    console.log("✅ Educational content generated");
    
    // Step 2: Generate an illustration
    console.log("\n🎨 Generating visual illustration...");
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a clean, educational illustration about "${topic}". Make it informative, visually appealing, and suitable for learning materials. Use a modern, professional style with clear visual elements.`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    console.log("✅ Image generated");

    // Step 3: Generate audio narration
    console.log("\n🎵 Generating audio narration...");
    const audioResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: educationalContent,
      speed: 1.0,
    });

    console.log("✅ Audio generated");

    // Step 4: Save all generated content
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const folderName = `multimodal_${topic.replace(/\s+/g, '_').toLowerCase()}_${timestamp}`;
    
    // Create output directory
    if (!fs.existsSync("output")) {
      fs.mkdirSync("output");
    }
    
    const outputPath = `output/${folderName}`;
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    // Save text content
    fs.writeFileSync(`${outputPath}/content.txt`, educationalContent);
    console.log(`💾 Text content saved to ${outputPath}/content.txt`);

    // Save image (download from URL and convert to buffer)
    const imageUrl = imageResponse.data[0].url;
    console.log(`🔗 Image URL: ${imageUrl}`);
    // Note: In a real implementation, you'd download and save the image
    fs.writeFileSync(`${outputPath}/image_url.txt`, imageUrl);
    console.log(`💾 Image URL saved to ${outputPath}/image_url.txt`);

    // Save audio
    const audioBuffer = Buffer.from(await audioResponse.arrayBuffer());
    fs.writeFileSync(`${outputPath}/narration.mp3`, audioBuffer);
    console.log(`💾 Audio narration saved to ${outputPath}/narration.mp3`);

    // Create a summary file
    const summary = {
      topic: topic,
      timestamp: new Date().toISOString(),
      files_generated: {
        text: "content.txt",
        image_url: "image_url.txt",
        audio: "narration.mp3"
      },
      content_preview: educationalContent.substring(0, 150) + "..."
    };

    fs.writeFileSync(`${outputPath}/summary.json`, JSON.stringify(summary, null, 2));
    console.log(`💾 Summary saved to ${outputPath}/summary.json`);

    console.log(`\n🎉 Multimodal content creation completed!`);
    console.log(`📁 All files saved in: ${outputPath}`);
    
    return {
      success: true,
      outputPath: outputPath,
      files: summary.files_generated
    };

  } catch (error) {
    console.error("❌ Error creating multimodal content:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Example usage
const topic = "Machine Learning Basics";
const result = await createMultimodalContent(topic);

if (result.success) {
  console.log(`\n✨ Success! Check the ${result.outputPath} folder for all generated content.`);
} else {
  console.log(`\n❌ Failed to create content: ${result.error}`);
}