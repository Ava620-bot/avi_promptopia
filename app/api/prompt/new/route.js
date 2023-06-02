import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, tag, prompt } = await req.json();
  try {
    await connectToDB();
    const newPrompt = await Prompt({ creator: userId, tag: tag, prompt: prompt });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    });
  } catch (error) {
    return new Response('Failed to create a new prompt', {
      status: 500
    })
  }
};
