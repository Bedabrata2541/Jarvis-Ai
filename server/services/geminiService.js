import { GoogleGenAI } from "@google/genai";

export const askGemini = async (message) => {

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: message

    });

    return response.text;

};