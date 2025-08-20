const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// デフォルトの天気予報XML
const DEFAULT_WEATHER_URL = "https://www.drk7.jp/weather/xml/26.xml";

// ルート
app.get("/", (req, res) => {
  res.send("Weather XML Proxy API is running! Try /weather?url=26.xml");
});

// プロキシエンドポイント
app.get("/weather", async (req, res) => {
  try {
    // URL 引数 ?url=xx.xml があればそれを使い、無ければデフォルト
    const urlParam = req.query.url || "26.xml";
    const WEATHER_URL = `https://www.drk7.jp/weather/xml/${urlParam}`;

    const response = await axios.get(WEATHER_URL, { responseType: "text" });

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
