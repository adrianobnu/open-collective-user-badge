const axios = require("axios");

export default async function handler(req, res) {
  const { query } = req;
  const response = await axios
    .get(`https://screenshotapi.net/api/v1/screenshot`, {
      params: {
        token: process.env.SCREENSHOT_API_KEY,
        url: `${process.env.APP_URL}?${new URLSearchParams(query)}`,
        full_page: true,
        output: "image",
        width: 500,
        height: 120 + query.collectives.split(";").length * 10,
      },
      responseEncoding: 'binary'
    })
    .then(response => response.data);

    res.setHeader('Cache-Control',`s-maxage=${process.env.CACHE_LIFETIME_SECONDS}, stale-while-revalidate`);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(response,'binary');
}
