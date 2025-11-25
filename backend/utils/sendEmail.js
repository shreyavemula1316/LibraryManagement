import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text, html = null) => {
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html: html || text,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', to);
    }catch(error){
        console.log('Error sending email to', to, error.message);
    }
};