import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

export const generateCertificate = async (data) => {
  try {
    const { userId, participantName, eventName, eventId } = data;

    // Generate a unique identifier using uuid
    const certificateId = uuidv4();

    // Create a directory for the user if it doesn't exist
    const userDirectory = `public/assets/certificates/${userId}`;
    if (!fs.existsSync(userDirectory)) {
      fs.mkdirSync(userDirectory, { recursive: true });
    }

    // Load images as base64 encoded data URIs
    const logoPath = path.resolve('public/assets/foalogo.png');
    const logoData = fs.readFileSync(logoPath, 'base64');
    const logoBase64 = `data:image/png;base64,${logoData}`;

    const trophyPath = path.resolve('public/assets/Trophy.png');
    const trophyData = fs.readFileSync(trophyPath, 'base64');
    const trophyBase64 = `data:image/png;base64,${trophyData}`;

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Define the HTML content with placeholders
    const htmlContent = `
    <!DOCTYPE html>
<html>

<head>
  <style type='text/css'>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      text-align: center;
      background-color: #f8f8f8;
      position: relative;
    }

    .certificate {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      margin: auto;
      margin-top: 2rem;
      width: 80%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      border: 1px solid #264027; /* Added border */
    }

    .logo {
      margin-bottom: 20px;
      max-width: 100%;
      max-height: 100px; /* Adjust the max-height as needed */
      height: auto;
    }

    h1, h2, p {
      color: #333;
    }

    .trophy {
      max-width: 100%;
      max-height: 100px; /* Adjust the max-height as needed */
      height: auto;
      margin-bottom: 20px;
    }

    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .signature {
      display: inline-block;
      margin-right: 50px;
    }

    .footer {
      position: absolute;
      top: 20px;
      left: 20px;
      text-align: left;
      color: #333;
    }

    .footer p {
      margin: 5px 0; /* Add some vertical margin */
    }

    .uuid, .date {
      font-size: 5px;
      margin-right: 10px; /* Add some horizontal margin */
    }
  </style>
</head>

<body>
  <div class="certificate">
    <div class="footer">
      <p class="uuid">${certificateId}</p>
      <p class="date">${currentDate}</p>
    </div>

    <img src='${logoBase64}' alt='Logo' class='logo'>
    <h1 style='color: #4caf50;'>Congratulations!</h1>
    <h2><strong>${participantName}</strong></h2>
    <p>This is to certify that <strong>${participantName} </strong>has actively participated in the Event
      <strong>${eventName}</strong> Your dedication and enthusiasm have contributed
      significantly to the success of our event</p>

    <img src='${trophyBase64}' alt='Trophy' class='trophy'>
    <div class="signatures">
      <div class="signature">
        <p>____________________________</p>
        <p style='color: #4caf50;'> Signature</p>
      </div>
      <div class="signature">
        <p>____________________________</p>
        <p style='color: #4caf50;'>Signature</p>
      </div>
    </div>
  </div>
</body>

</html>

    `;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content on the page
    await page.setContent(htmlContent);

    // Generate a new PDF using Puppeteer
    const pdfBuffer = await page.pdf();

    // Close the Puppeteer browser
    await browser.close();

    // Save the Puppeteer-generated PDF to a new file
    const outputFileName = `${eventId}_${userId}.pdf`;
    const outputPath = path.join(userDirectory, outputFileName);

    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(outputPath);

    console.log({ success: true, message: 'Certificate generated and saved successfully.' });
  } catch (error) {
    console.error(error);
    console.log({ success: false, message: 'Error generating certificate.' });
  }
};
