export const appointmentHtml = (
  professionalName: string,
  date: string,
  type: string,
  location?: string,
  meetingLink?: string,
  html?: string
) => `
  <div style="font-family: Arial, sans-serif; background: #f4f4f7; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background: #4f46e5; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Planora</h1>
        <p style="margin: 5px 0 0;">Your appointment is confirmed 🎉</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">
          You successfully booked an appointment with 
          <strong>${professionalName}</strong>.
        </p>

        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>📅 Date & Time:</strong> ${date}</p>
          <p><strong>👨‍⚕️ Professional:</strong> ${professionalName}</p>
          <p><strong>📍 Type:</strong> ${type}</p>
          ${
            type === "in-person"
              ? `<p><strong>📍 Location:</strong> ${location}</p>`
              : `<p><strong>🔗 Meeting Link:</strong> <a href="${meetingLink}" style="color:#4f46e5; text-decoration:none;">Join Meeting</a></p>`
          }
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://planora.app/dashboard" 
             style="background:#4f46e5; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600; display:inline-block;">
            View My Appointment
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; text-align: center; padding: 15px; font-size: 12px; color: #888;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Planora. All rights reserved.</p>
      </div>
    </div>
  </div>
`;

// lib/emailTemplates/professionalNotification.ts

export function professionalNotificationHtml(
  professionalName: string,
  clientName: string,
  service: string,
  date: string,
  type: "in-person" | "online",
  location?: string,
  meetingLink?: string
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Appointment Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: #2563eb;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          line-height: 1.6;
        }
        .footer {
          background: #f1f1f1;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .btn {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #2563eb;
          color: #fff !important;
          text-decoration: none;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2> New Appointment Booked</h2>
        </div>
        <div class="content">
          <p>Hi <strong>${clientName}</strong>,</p>
          <p>
            A new appointment has been booked with you by <strong>${professionalName}</strong>.
          </p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date & Time:</strong> ${date}</p>
          <p><strong>Type:</strong> ${
            type === "online" ? "Online" : "In-Person"
          }</p>
          ${
            type === "in-person"
              ? `<p><strong>Location:</strong> ${
                  location || "To be discussed"
                }</p>`
              : `<p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>`
          }
          <a href="https://localhost3000/Dashboard/appointment" class="btn">View Appointment</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from Planora.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}
