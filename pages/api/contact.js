import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${name} <${email}>`, // sender address
      to: process.env.CONTACT_EMAIL, // list of receivers
      subject: "New message from your website", // Subject line
      text: message, // plain text body
      html: `<p>${message}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: "Message sent successfully." });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}