

import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port:  587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});
console.log("USER:", process.env.MAILTRAP_USERNAME); // your Mailtrap user
console.log("PASS:", process.env.MAILTRAP_PASSWORD); 
const sendMail = async (option) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen", //yahan kuch bhi name de sakte hai
      link: "https://mailgen.js/", //yahan apni app ki link daal sakte he yeh jo footer me dikhta hai jo ki baki mail bhi aisa hi hota h
    },
  });
  let text = mailGenerator.generatePlaintext(option.generatecontent)
   let html = mailGenerator.generate(option.generatecontent)
   await transporter.sendMail({
    from: "maddison53@ethereal.email",
    to: option.to,           // recipient email
    subject: option.subject, // subject line
    html,
    text,
  });


};

export {sendMail}
  


