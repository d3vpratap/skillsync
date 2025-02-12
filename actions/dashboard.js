"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
export const generateIndustryAIInsights = async (industry) => {
  try{
const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;
const result = await model.generateContent(prompt);
const response = result.response;
const text = response.text();
const cleanText = text.replace(/```(?:json)?\n?/g, "").trim();
// console.log(JSON.parse(cleanText));
console.log("Generated insights");
return JSON.parse(cleanText);
  }
  catch(error){
console.log("not generated")
  }
  
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsights: true,
    },
  });

  if (!user) throw new Error("User not found");

  if (!user.industryInsights) {
    try {
      const insights = await generateIndustryAIInsights(user.industry);
      const industryInsight = await db.industryInsights.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
      console.log(industryInsight);
      return industryInsight;
    } catch (error) {
      console.log("error generating insights",error);
    }
  }
  return user.industryInsights;
}
