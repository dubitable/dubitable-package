import { promises as fs } from "fs";
import { FigResponseSchema } from "./schemas/fig";

const api = "http://ai-env.eba-mmjcvt3f.us-west-2.elasticbeanstalk.com";

export const predict = async (base64: string) => {
  const result = await fetch(`${api}/figdetector/`, {
    method: "POST",
    body: JSON.stringify({ image: base64 }),
  });

  if (!result.ok) throw Error(`Failed HTTP Request (code ${result.status})`);

  const json = await result.json();
  const parsed = FigResponseSchema.safeParse(json);

  if (!parsed.success) throw parsed.error;
  return parsed.data;
};

export const predictFile = async (filename: string) => {
  const image = await fs.readFile(filename, "base64");
  return await predict(image);
};
