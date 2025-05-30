import { text } from "express";
import nodemailer from "nodemailer"

export const sendEmail=async(options)=>{
   //create teansport
   const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:true,
    auth:({
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    })
   });
   // deffine mail option
   const mailOption={
    from:"Inventory Management System",
    to:options.email,
    subject:options.subject,
    text:options.message
   }
   //send email
   await transporter.sendMail(mailOption)
}