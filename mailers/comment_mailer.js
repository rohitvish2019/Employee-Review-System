const nodemailer = require("../configs/nodemailer")
// Sends mail with the help of transporter
exports.newUser = (user, otp) =>{
    console.log("email is "+user.email);
    console.log(otp);
    let htmlfile = nodemailer.renderedTemplate({user:user,otp:otp},'otp.ejs');
    nodemailer.transporter.sendMail({
        from : 'suneelvish288@gmail.com',
        to: user.email,
        subject : 'Verify your identity :: Employee Review system',
        html: htmlfile
    }, (err, info) => {
        if(err){console.log("Error sending email "+err); return;}
        console.log("message sent successfully" + info);
    })    
}