import nodemailer from'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

export const sendParticipationMail = (data) => {
    const message = {
        from: process.env.EMAIL, // Sender's email address
        to: data.email, // Recipient's email address
        subject: 'Confirmation of Participation',
        html: `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            h3 {
              color: #0066cc;
            }
            b {
              color: #009933;
            }
          </style>
        </head>
        <body>
          <p>
            Hey <strong>${data.name}</strong>,
            <br><br>
            Thank you for participating in the event "<strong>${data.event}</strong>"!
            <br><br>
            <strong>Description of the event:</strong>
            <br>
            ${data.description}
            <br><br>
            <strong>Start Date:</strong> <span style="color: #009933;">${data.startdate}</span>
            <br>
            <strong>End Date:</strong> <span style="color: #009933;">${data.enddate}</span>
            <br><br>
            Regards,<br>
            Team Friends of Animal
          </p>
        </body>
      </html>
      
         `
    };


    transporter.sendMail(message, (err) => {
        if (err) {
            console.log("Error in sending the verification mail", err);
        }
        else {
            console.log("Participation Mail has been Send");
        }
    })
};

export const sendVerificationEmail = (name,email, otp) => {
  //console.log(email);
  const message = {
      from: process.env.EMAIL, // Sender's email address
      to: email, // Recipient's email address
      subject: 'Welcome to Friends of Animal: OTP Verification',
      html: `<p> 

      Dear ${name},<br>
      
      Thank you for registering with Friends of Animal. We're thrilled to have you join our community dedicated to the welfare of animals.<br>
      
      To ensure the security of your account, please use the following one-time password (OTP) for verification:<br>
      
      OTP: <b>${otp}</b><br><br>
      
      If you did not initiate this registration or require any assistance, please contact our support team immediately.<br><br>
      
      Warm regards,<br>
      
      Team Friends of Animal
       </p>
       `
  };


  transporter.sendMail(message, (err) => {
      if (err) {
          console.log("Error in sending the verification mail", err);
      }
      else {
          console.log("Verification Mail has been Send");
      }
  })
};




