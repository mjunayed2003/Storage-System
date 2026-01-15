import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const SendMail = async (
  sender_mail: string,
  subject: string,
  body: string
) => {
  return await transporter
    .sendMail({
      from: "shamimranaprofessional@gmail.com",
      to: sender_mail,
      subject: subject,
      html: body,
    })
    .then((info: any) => {
      ////("Message sent: %s", info.messageId);
      ////("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log(sender_mail);
      return info.messageId;
    })
    .catch((err: any) => {
      ////(err);
      return err.message;
    });
};
