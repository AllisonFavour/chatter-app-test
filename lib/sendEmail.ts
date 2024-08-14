import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const sendEmail = async (to: string) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject: "Welcome To Chatter App",
    text: "Thank you for becoming a new member of the chatter family, start expressing your thoughts.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email.", error);
  }
};

export default sendEmail;
