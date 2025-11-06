import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

interface PromptResponseBody {
  data: {
    answer: string;
  };
}

interface PromptRequestBody {
  data: {
    prompt: string;
  };
}

const app = express();
const port = 3000;

const hf = new InferenceClient(process.env.HUGGINGFACEHUB_API_KEY);

app.use(express.json());
app.use(cors());

app.post(
  "/llm/prompt",
  async (
    req: Request<undefined, PromptResponseBody, PromptRequestBody>,
    res
  ) => {
    const out = await hf.chatCompletion({
      model: "HuggingFaceTB/SmolLM3-3B",
      messages: [{ role: "user", content: req.body.data.prompt }],
      max_tokens: 128,
    });

    res.json({
      data: {
        answer: out.choices[0].message.content ?? "",
      },
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
