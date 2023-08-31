const nodemailer = require("nodemailer");
const env = require("dotenv");

const sendEmail = async (email, downloadUrl) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
<<<<<<< HEAD
      user: process.env.email_id,
      pass: process.env.email_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.email_id,
=======
      user: "authomail.in",
      pass: "cpPd",
    },
  });
  const info = await transporter.sendMail({
    from: "auth.nail.in",
>>>>>>> 72776554817f0301e542eb190f06495a3f114956
    to: email,
    subject: "Download your file",
    text: `click to download the file : ${downloadUrl}`,
  });
  console.log(`Message has been sent to ${info.messageId}`);
  //send the email
  await transporter.sendMail(info);
};
module.exports = sendEmail;
