import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generateGeminiResponse(prompt: string, model = 'gemini-pro') {
  try {
    const modelInstance = genAI.getGenerativeModel({ model });
    const result = await modelInstance.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate response from Gemini AI');
  }
}

export async function analyzeDocument(text: string, analysisType: 'resume' | 'code' | 'content') {
  let prompt = '';
  
  switch (analysisType) {
    case 'resume':
      prompt = `
        Analyze this resume/CV and provide detailed feedback:
        
        ${text}
        
        Please provide:
        1. Overall assessment (score out of 10 and brief summary)
        2. Strengths (what's working well)
        3. Areas for improvement (specific suggestions)
        4. Keyword optimization suggestions
        5. Format and structure recommendations
        6. Missing sections or content suggestions
        
        Format your response in clear sections with actionable advice.
      `;
      break;
      
    case 'code':
      prompt = `
        Review this code and provide detailed analysis:
        
        ${text}
        
        Please provide:
        1. Code quality assessment (score out of 10)
        2. Security vulnerabilities or concerns
        3. Performance optimization suggestions
        4. Best practices violations
        5. Refactoring recommendations
        6. Documentation improvements
        7. Testing suggestions
        
        Be specific and provide examples where possible.
      `;
      break;
      
    case 'content':
      prompt = `
        Analyze this content for improvement:
        
        ${text}
        
        Please provide:
        1. Content quality assessment
        2. Tone and style analysis
        3. SEO optimization suggestions
        4. Readability improvements
        5. Engagement enhancement ideas
        6. Structure and formatting recommendations
      `;
      break;
  }
  
  return generateGeminiResponse(prompt);
}

export async function generateContent(type: 'blog' | 'social' | 'description', topic: string, additionalContext?: string) {
  let prompt = '';
  
  switch (type) {
    case 'blog':
      prompt = `
        Write a comprehensive blog post about: ${topic}
        ${additionalContext ? `Additional context: ${additionalContext}` : ''}
        
        Include:
        - Engaging title
        - Introduction hook
        - Main content with subheadings
        - Practical examples or tips
        - Conclusion with call-to-action
        - Meta description for SEO
        
        Make it engaging, informative, and SEO-friendly.
      `;
      break;
      
    case 'social':
      prompt = `
        Create social media content about: ${topic}
        ${additionalContext ? `Context: ${additionalContext}` : ''}
        
        Provide:
        - Twitter/X post (under 280 characters)
        - LinkedIn post (professional tone)
        - Instagram caption with hashtags
        - Facebook post
        
        Make each platform-appropriate and engaging.
      `;
      break;
      
    case 'description':
      prompt = `
        Write a compelling project description for: ${topic}
        ${additionalContext ? `Details: ${additionalContext}` : ''}
        
        Include:
        - Brief overview
        - Key features
        - Technologies used
        - Problem it solves
        - Target audience
        
        Keep it concise but informative.
      `;
      break;
  }
  
  return generateGeminiResponse(prompt);
}