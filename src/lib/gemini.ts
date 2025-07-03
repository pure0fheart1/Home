import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateText(prompt: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
}

export async function transcribeAudio(audioData: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // For now, we'll use a text-based prompt since audio transcription
    // would require additional setup with the Gemini API
    const prompt = `This is a placeholder for audio transcription. 
    In a real implementation, you would process the audio data: ${audioData.substring(0, 100)}...`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}

export async function textToSpeech(text: string): Promise<string> {
  // For text-to-speech, we'll use the Web Speech API on the client side
  // This function serves as a placeholder for server-side TTS if needed
  if (!text) {
    throw new Error('No text provided for speech synthesis');
  }

  // In a real implementation, you might use Google Cloud Text-to-Speech
  // or another service. For now, we'll handle this on the client side.
  return text;
}