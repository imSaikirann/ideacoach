
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
 console.log("hi")
}




export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
console.log("Received prompt:", prompt);

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", 
      { inputs: [prompt] },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}