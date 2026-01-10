import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const api = axios.create({
  baseURL: "https://localhost:7090",
  httpsAgent: agent,
});
