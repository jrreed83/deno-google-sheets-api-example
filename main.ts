import { google } from "googleapis";
import { Buffer } from 'node:buffer';
import "jsr:@std/dotenv/load";


// Load the credentials from the environment variable and convert to a JSON object
const jwt_base64  = Deno.env.get("GOOGLE_CREDENTIALS_BASE64");
const credentials = JSON.parse(
  Buffer.from(jwt_base64, "base64").toString("utf8")
);


const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = await auth.getClient();

console.log(`Auth OK: ${client}`);


const sheets = google.sheets({version: "v4", auth: client});
const sheet_id = Deno.env.get("SHEET_ID");

const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheet_id,
    range: "Sheet1!A2:D4"
});

console.log(result.data);

await sheets.spreadsheets.values.update({
    spreadsheetId: sheet_id,
    auth: client,
    range: "Sheet1!E3",
    resource: { 
      values: [["hello from m"]]
    },
    valueInputOption: "USER_ENTERED"
})
