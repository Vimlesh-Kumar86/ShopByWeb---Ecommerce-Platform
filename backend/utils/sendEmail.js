// const nodemailer = require('nodemailer');

// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // App Password mapping
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:',error);
//   }
// };

// module.exports = sendEmail;





// const nodemailer = require('nodemailer');

// const sendEmail = async ({ email, subject, message }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS, // App Password mapping
//       },
//     });

//     const mailOptions = {
//       from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
//       to: email,
//       subject: subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email successfully sent to ${email}`);
//   } catch (error) {
//     console.error(`Failed to send email to ${email}: ${error.message}`);
//   }
// };

// module.exports = sendEmail;








const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },

  // Prevent email operations from waiting too long
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

const sendEmail = async ({ email, subject, message }) => {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      throw new Error(
        'GMAIL_USER or GMAIL_PASS is missing in environment variables'
      );
    }

    const mailOptions = {
      from: `"ShopByWeb Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Email successfully sent to ${email}`);

    return info;
  } catch (error) {
    console.error(
      `Failed to send email to ${email}:`,
      error.message
    );

    // Allow the calling controller to handle the failure
    throw error;
  }
};

module.exports = sendEmail;
