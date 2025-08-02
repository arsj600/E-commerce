import productModel from "../models/productModel.js";
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROK_API_KEY });

const userPrompt =async (req,res)=>{
    try {
        const { prompt } = req.body;
       const products = await productModel
      .find({})
      .select("name description price category subCategory size bestSeller image")
      .lean();

    // ✅ Create prompt for Groq with products and user input
    const messages = [
      {
        role: "system",
        content: `You are an e-commerce product filter. 
        When given a list of products and a user prompt, only return the products that exactly match the user's intent.
    STRICTLY RETURN ONLY A VALID JSON ARRAY OF PRODUCTS THAT MATCH THE USER'S QUERY.
    DO NOT INCLUDE ANY EXTRA TEXT, JUST JSON. Example: [{"name":"...", ...}]`,
      },
      {
        role: "user",
        content: `Prompt: ${prompt}\nProducts: ${JSON.stringify(products)}\nReturn filtered products only as a JSON array.`,
      },
    ];

    // ✅ Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-70b-8192",
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    // ✅ Convert Groq response to JSON
    const filteredProducts = JSON.parse(aiResponse);

    // ✅ Send response
    res.json(filteredProducts);
  } catch (error) {
    console.error("AI search error:", error.message);
    res.status(500).json({ error: "AI-based search failed." });
  }
};

export {userPrompt}