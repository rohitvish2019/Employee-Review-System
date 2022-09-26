const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port : 587,
    secure :false,
    auth:{
        user : 'suneelvish288@gmail.com',
        pass : 'JXDpj3MyaBbQfUYc'
        
    }
});

let renderedTemplate = (data, relativePath) => {
    let mailHTML;
    console.log("rel= "+relativePath)
    ejs.renderFile(
        path.join(__dirname, '../views/templates', relativePath),
        data,
        function(err, template){
            if(err){console.log("Error in redering file "+err); return}
            mailHTML = template;
        }
    )

    return mailHTML;
    
}

module.exports = {
    transporter : transporter,
    renderedTemplate : renderedTemplate
}