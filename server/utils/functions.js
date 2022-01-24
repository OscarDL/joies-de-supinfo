const nodemailer = require('nodemailer');


exports.capitalize = (string) => (
  string[0].toUpperCase() + string.substring(1)
);


exports.getDomain = () => {
  if (process.env.NODE_ENV === 'production') return 'https://joies-de-supinfo.herokuapp.com';
  return 'https://localhost:3000';
};


exports.sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    secure: false,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      ciphers:'SSLv3'
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    html: options.content
  };

  transporter.sendMail(mailOptions, function(err, info) {
    console.log(err || info);
  });
};
