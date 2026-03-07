import fetch from "node-fetch";

export async function handler(event, context) {
  const { chartData } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional forex trader. Analyze the chart image and return trend, signal (BUY/SELL/NO TRADE), entry, stop loss, take profit, and reason."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this chart:" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${chartData}` } }
          ]
        }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}