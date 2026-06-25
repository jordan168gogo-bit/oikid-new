import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, schemaProperties } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const systemPrompt = "你是一個專業的兒童美語老師與英漢字典助手。請務必只回傳純 JSON 格式的資料，絕對不要包含 ```json 等 Markdown 標籤或其他說明文字。";

    // Convert schemaProperties to Gemini's responseSchema format
    const responseSchema = {
      type: "OBJECT",
      properties: schemaProperties,
      required: Object.keys(schemaProperties),
    };

    const model = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // 撞到 429（速率限制）或 5xx（伺服器暫時錯誤）時自動重試，
    // 指數退避 + 隨機抖動，吃掉短暫的速率尖峰。4xx（如 400/403）不重試。
    const maxRetries = 3;
    let response: Response;
    for (let attempt = 0; ; attempt++) {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      if (response.ok) break;
      const retryable = response.status === 429 || response.status >= 500;
      if (retryable && attempt < maxRetries) {
        const waitMs = 600 * Math.pow(2, attempt) + Math.random() * 300; // ~0.6s, 1.2s, 2.4s
        console.warn(`Gemini ${response.status}, retry ${attempt + 1}/${maxRetries} after ${Math.round(waitMs)}ms`);
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }
      break;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);

      const status = response.status;
      let errorMsg = "AI 服務暫時無法使用，請稍後再試。";
      if (status === 429) {
        errorMsg = "AI 請求過於頻繁，請稍後再試。";
      } else if (status === 403) {
        errorMsg = "AI 金鑰無效或額度已用完。";
      } else if (status === 400) {
        errorMsg = "AI 請求格式錯誤。";
      }

      return new Response(JSON.stringify({ error: errorMsg }), {
        status: status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("Gemini response received:", JSON.stringify(data).substring(0, 500));

    // Extract JSON text from Gemini response
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (content) {
      const cleaned = content.replace(/```json\n?/gi, "").replace(/```/g, "").trim();
      try {
        const result = JSON.parse(cleaned);
        return new Response(JSON.stringify({ result }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (_e) {
        console.error("Failed to parse Gemini content:", cleaned);
        return new Response(JSON.stringify({ error: "AI 回傳格式異常" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ error: "AI 沒有回傳內容" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-vocab error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
