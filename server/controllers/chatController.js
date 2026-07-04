import { askOllama } from "../services/ollamaService.js";
import { askGemini } from "../services/geminiService.js";
import { askSarvam } from "../services/sarvamService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, model } = req.body;

    let reply;

    switch (model) {

      case "qwen2.5:1.5b":
        reply = await askOllama(message, model);
        break;

      case "gemini":
        reply = await askGemini(message);
        break;

      case "sarvam":
        reply = await askSarvam(message);
        break;

      default:
        return res.status(400).json({
          message: "Invalid model selected"
        });
    }

    res.json({
      reply
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI Error"
    });

  }
};