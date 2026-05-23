import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required fields." },
        { status: 400 }
      );
    }

    // Configure the SMTP transport using Gmail and App Password from env
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options for sending to the site owner
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sent from the authenticated account
      to: process.env.EMAIL_USER, // Delivered to the site owner
      replyTo: email, // If owner clicks "Reply", it goes to the user who filled the form
      subject: `New Contact Form Submission: ${subject || "No Subject"}`,
      text: `
You have received a new message from the Anantorix Contact Form.

Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}

Message:
${message}
      `,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #030b1a; color: #ffffff; padding: 40px 20px; min-height: 100vh;">
          <div style="max-w: 600px; margin: 0 auto; background-color: #07152D; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="background-color: #187BDD; padding: 30px 40px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ANANTORIX</h2>
              <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">New Contact Request</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 40px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0; color: #A6C8FF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Sender Name</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 18px; font-weight: bold;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0; color: #A6C8FF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email Address</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px;">
                      <a href="mailto:${email}" style="color: #187BDD; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0; color: #A6C8FF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px;">${subject || "No Subject provided"}</p>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px;">
                <p style="margin: 0 0 10px 0; color: #A6C8FF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message Content</p>
                <div style="background-color: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;">
                  <p style="margin: 0; color: #C1C6D5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #187BDD; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: rgba(0,0,0,0.3); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">This message was sent from the Anantorix Contact Form.</p>
            </div>
            
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
