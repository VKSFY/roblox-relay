const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1408204227138031741/0IAfWM-xD22zt-KniCyineE58uDk3LvGo_GTLkaBBrhQfUJYC26mqhqP-T6oHPvw9XtW";

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { player, timestamp } = req.body;

  console.log("Webhook received:", req.body);

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `🎮 **${player}** just joined the game at ${timestamp}`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook failed:", response.status, errorText);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }

  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
