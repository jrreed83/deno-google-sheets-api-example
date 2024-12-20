# Description

This is a simple program that shows how to read and write a few "random" cells from a Google Sheet 
using [Deno](https://deno.com/).


# Setup

1. Start a new Google Cloud Platform project in the [Google Cloud Console](https://console.cloud.google.com).
2. Enable the Google Sheets API.
3. Set it up as a Service Account in the Credentials Section.  This will enable JSON Web Token (JWT) authorization.
4. Download the JWT.
5. Share the Google Sheet with the email address automatically generated when setting up the Service Account.
6. Base64 encode the JWT.  This is in preparation of uploading it as a credential in a service lke [Trigger.dev](https://trigger.dev/) or [Digital Ocean](https://www.digitalocean.com/)
   ```
   base64 -i <YOUR JWT FILE NAME>.json -w 0
   ```
   The `-w 0` eliminates line wrapping.
7. Create a `.env` file in the project and add the encoded JWT and your spreadsheet ID.  The file should look like this: 
   ```
   SHEET_ID=xxxxxxxxxxxxxxx
   GOOGLE_CREDENTIALS_BASE64=xxxxxxxxxxxxxxxxxxx
   ```

# Run 

To run the script, give it permission to read from the file system.  Passing `--env` instructs the script to 
read variables in your `.env` file.

```
deno run --allow-all --env-file main.ts
```

# Remarks and Gotchas

* You can read the contents of the Google Sheet with an API KEY, but it won't let you update the sheet.  
* The authorization scope must be set to  
  `"https://www.googleapis.com/auth/spreadsheets"`, otherwise you'll get a 401 authorization error.
