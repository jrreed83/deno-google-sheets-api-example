import { google } from "googleapis";
import { Buffer } from 'node:buffer';
import "jsr:@std/dotenv/load";

const jwt_base64  = Deno.env.get("GOOGLE_CREDENTIALS_BASE64");
const credentials = JSON.parse(
  Buffer.from(jwt_base64, "base64").toString("utf8")
);

console.log(credentials);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

const client = await auth.getClient();

console.log(`Auth OK: ${client}`);

