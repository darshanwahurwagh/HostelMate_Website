// const nodemailer = require("nodemailer");

// const sendEmail = async (
//   to,
//   subject,
//   text
// ) => {
//   try {
//     const transporter =
//       nodemailer.createTransport({
//         service: "gmail",

//         auth: {
//           user:
//             process.env.EMAIL_USER,

//           pass:
//             process.env.EMAIL_PASS,
//         },
//       });

//     await transporter.sendMail({
//       from:
//         process.env.EMAIL_USER,

//       to,

//       subject,

//       text,
//     });

//     console.log(
//       "Email Sent Successfully"
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = sendEmail;


// -----------------------------------------------------------------------------------------

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">HostelMate</h2>
            <p style="margin: 5px 0 0;">Stay | Connect | Explore</p>
          </div>

          <div style="padding: 25px; color: #333;">
            <h3>${subject}</h3>
            <p style="font-size: 16px; line-height: 1.6;">
              ${message}
            </p>

            <br />

            <p style="font-size: 14px; color: #555;">
              Regards,<br/>
              <strong>HostelMate Admin Team</strong>
            </p>
          </div>

          <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            © 2026 HostelMate. All rights reserved.
          </div>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"HostelMate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlTemplate,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.error("Email Error:", error.message);
  }
};

module.exports = sendEmail;








// ------------------------------------------------------------------------------------------------------









// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const htmlTemplate = `
//       <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
//         <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
//           <div style="background: #2563eb; color: white; padding: 22px; text-align: center;">
//             <h2 style="margin: 0;">HostelMate</h2>
//             <p style="margin: 5px 0 0;">Hostel Management System</p>
//           </div>

//           <div style="padding: 28px; color: #333;">
//             <p style="font-size: 16px;">Dear Student,</p>

//             <p style="font-size: 16px; line-height: 1.6;">
//               This is a friendly reminder that your hostel fee payment is currently pending.
//             </p>

//             <h3 style="color: #2563eb; margin-top: 25px;">Payment Details:</h3>

//             <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
//               <li><strong>Amount:</strong> ₹5000</li>
//               <li><strong>Month:</strong> June 2026</li>
              
//             </ul>

//             <p style="font-size: 16px; line-height: 1.6;">
//               Please complete your payment before the due date to avoid any inconvenience.
//             </p>

//             <p style="font-size: 15px; color: #555;">
//               If you have already made the payment, kindly ignore this email.
//             </p>

//             <p style="font-size: 15px; margin-top: 25px;">
//               Regards,<br/>
//               <strong>HostelMate Admin Team</strong>
//             </p>

//             <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

//             <p style="text-align: center; font-size: 13px; color: #64748b;">
//               © 2026 HostelMate, All Rights Reserved.
//             </p>
//           </div>

//         </div>
//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"HostelMate" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html: htmlTemplate,
//     });

//     console.log("Email Sent Successfully");
//   } catch (error) {
//     console.error("Email Error:", error.message);
//   }
// };

// module.exports = sendEmail;








// ----------------------------------------------------------------------------------------------









// const nodemailer = require("nodemailer");

// const sendEmail = async (
//   to,
//   studentName,
//   amount,
//   month,
//   year
// ) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const htmlTemplate = `
//       <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
//         <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

//           <div style="background: #2563eb; color: white; padding: 22px; text-align: center;">
//             <h2 style="margin: 0;">HostelMate</h2>
//             <p style="margin: 5px 0 0;">Stay | Connect | Explore</p>
//           </div>

//           <div style="padding: 28px; color: #333;">

//             <p style="font-size: 16px;">
//               Dear <strong>${studentName}</strong>,
//             </p>

//             <p style="font-size: 16px; line-height: 1.6;">
//               This is a friendly reminder that your hostel fee payment is currently pending.
//             </p>

//             <div style="
//               background:#f8fafc;
//               border-left:4px solid #2563eb;
//               padding:15px;
//               margin:20px 0;
//               border-radius:6px;
//             ">
//               <h3 style="margin-top:0;color:#2563eb;">
//                 Payment Details
//               </h3>

//               <p>
//                 <strong>Amount:</strong> ₹${amount}
//               </p>

//               <p>
//                 <strong>Month:</strong> ${month} ${year}
//               </p>
//             </div>

//             <p style="font-size: 16px; line-height: 1.6;">
//               Please complete your payment before the due date to avoid any inconvenience.
//             </p>

//             <p style="font-size: 15px; color: #555;">
//               If you have already made the payment, kindly ignore this email.
//             </p>

//             <p style="font-size: 15px; margin-top: 25px;">
//               Regards,<br/>
//               <strong>HostelMate Admin Team</strong>
//             </p>

//             <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

//             <p style="text-align: center; font-size: 13px; color: #64748b;">
//               © 2026 HostelMate, All Rights Reserved.
//             </p>

//           </div>

//         </div>
//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"HostelMate" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: "Hostel Fee Payment Reminder",
//       html: htmlTemplate,
//     });

//     console.log("Email Sent Successfully");
//   } catch (error) {
//     console.error("Email Error:", error.message);
//   }
// };

// module.exports = sendEmail;