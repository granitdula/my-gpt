import express, { Request } from "express";
import cors from "cors";

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

app.use(express.json());
app.use(cors());

app.post(
  "/llm/prompt",
  (req: Request<undefined, PromptResponseBody, PromptRequestBody>, res) => {
    console.log(req.body.data.prompt);
    res.json({
      data: {
        answer: "hardcoded ai response",
      },
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
