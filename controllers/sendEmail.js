const nodemailer = require("nodemailer");

const sendEmail = async (email, downloadUrl) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: "authomail.in",
      pass: "cpPd",
    },
  });
  const info = await transporter.sendMail({
    from: "auth.nail.in",
    to: email,
    subject: "Download your file",
    text: `click to download the file : ${downloadUrl}`,
  });
  console.log(`Message has been sent to ${info.messageId}`);
  //send the email
  await transporter.sendMail(info);
};
module.exports = sendEmail;
