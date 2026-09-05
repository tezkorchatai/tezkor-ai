export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Xabar bo‘sh"
      });
    }

    const apiKey = process.env.gemini_api_key;

    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key topilmadi"
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/model:gemini-3.7-flash"
      :generateContent?key=" + apiKey,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini xatosi"
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Javob topilmadi.";

    return res.status(200).json({
      reply: reply
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message || "Server xatosi"
    });

  }
}
