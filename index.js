const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// 天気予報XMLのURL（京都府例）
const WEATHER_URL = "https://www.drk7.jp/weather/xml/26.xml";

// ルート
app.get("/", (req, res) => {
  res.send("Weather XML Proxy API is running! Try /weather");
});

// プロキシエンドポイント
app.get("/weather", async (req, res) => {
  try {
    const response = await axios.get(WEATHER_URL, {
      responseType: "text", // XML をそのまま文字列として取得
    });

    res.set("Content-Type", "application/xml; charset=UTF-8");
    res.send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching weather XML");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
