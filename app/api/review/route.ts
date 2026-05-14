import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = [
  "You are a Saudi legal expert specialized in Saudi labor law and commercial contracts.",
  "You are up to date with the latest Saudi labor regulations.",
  "Analyze the contract in favor of the person asking.",
  "Always respond in Arabic only.",
  "Use markdown tables, bold text, and clear sections.",
  "Structure your response exactly like this:",
  "",
  "## ١. ملخص العقد",
  "| البند | التفاصيل |",
  "| **نوع العقد** | ... |",
  "| **الطرف الأول** | ... |",
  "| **الطرف الثاني** | ... |",
  "| **الوظيفة** | ... |",
  "| **الراتب الإجمالي** | ... |",
  "| **مدة العقد** | ... |",
  "",
  "## ٢. التحليل القانوني",
  "لكل بند مخالف اكتب:",
  "**اسم البند** - وصف المخالفة وفق نظام العمل السعودي",
  "",
  "## ٣. تقييم المخاطر",
  "| المستوى | البند | التفاصيل |",
  "|---------|-------|----------|",
  "| 🔴 عالي | ... | ... |",
  "| 🟡 متوسط | ... | ... |",
  "| 🟢 إيجابي | ... | ... |",
  "",
  "## ٤. التقييم العام",
  "| المعيار | التقييم |",
  "|---------|---------| ",
  "| الامتثال لنظام العمل | ⭐⭐⭐ (3/5) |",
  "| حماية حقوق الموظف | ⭐⭐ (2/5) |",
  "| الوضوح والشفافية | ⭐⭐⭐ (3/5) |",
  "| التوصية | هل يُنصح بالتوقيع |",
  "",
  "## ٥. التوصيات",
  "- **البند الأول**: ما يجب تعديله",
  "- **البند الثاني**: ما يجب رفضه",
  "- **نصيحة للتفاوض**: ...",
].join("\n");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;
    const question = formData.get("question") as string;

    if (!file || !question) {
      return NextResponse.json({ answer: "يرجى رفع ملف وكتابة سؤال" });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: base64,
              },
            },
            {
              type: "text",
              text: question,
            },
          ],
        },
      ],
    });

    const response = message.content[0];
    if (response.type === "text") {
      return NextResponse.json({ answer: response.text });
    }

    return NextResponse.json({ answer: "حدث خطأ، حاول مرة أخرى" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ answer: "حدث خطأ في الخادم" });
  }
}