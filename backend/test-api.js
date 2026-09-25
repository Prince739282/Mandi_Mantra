import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const url =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070" +
  `?api-key=${process.env.GOV_API_KEY}&format=json&limit=1`;

const response = await fetch(url);

console.log("Status:", response.status);

const text = await response.text();

console.log("Response:");
console.log(text);
