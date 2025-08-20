const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// デフォルトの天気予報XMLのURL（京都府）
const DEFAULT_WEATHER_URL = "https://www.drk7.jp/weather/xml/26.xml";

// ルート
app.get("/", (req, res) => {
  res.send("Weather XML Proxy API is running! Try /weather");
});

// プロキシエンドポイント
// ?url=別のXMLのURL で可変
app.get("/weather", async (req, res) => {
  try {
    // URL引数で取得、未指定ならデフォルト
    const xmlUrl = req.query.url || DEFAULT_WEATHER_URL;

    const response = await axios.get(xmlUrl, {
      responseType: "text", // XMLをそのまま文字列で取得
    });

    // CORS ヘッダ追加（ブラウザJSからのAjaxアクセス用）
    res.set("Access-Control-Allow-Origin", "*");
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

/*
# 修正したfileをステージング
git add index.js
# コミット
git commit -m "Fix index.js format"
# GitHub に push
git push origin main
*/