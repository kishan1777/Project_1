const nodemailer = require('nodemailer');

async function sendOtp(){
    //let testAcount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'mail2krkishan@gmail.com',
            pass: 'vgqfaepiheluiaqw'
        }
    });

    let info = await transporter.sendMail({
        from: 'mail2krkishan@gmail.com',
        to: 'dd065906@gmail.com',
        subject: 'OTP for signup',
        text: 'hello'
    })

    console.log("Message sent: %s", info.messageId);
}
sendOtp();