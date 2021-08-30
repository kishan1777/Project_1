const nodemailer = require('nodemailer');

async function sendOtp(){
    //let testAcount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'',//sender email.
            pass: 'vgq'//sender password.
        }
    });

    let info = await transporter.sendMail({
        from: ' ',// sender email.
        to: ' ',// user email
        subject: 'OTP for signup',
        text: 'hello'
    })

    console.log("Message sent: %s", info.messageId);
}
sendOtp();