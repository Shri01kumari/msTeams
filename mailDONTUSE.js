const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

// Mail sending script
let smtpTrans;
smtpTrans = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: "msteams.outlook.111@gmail.com",
      pass: "Microsoft11@teams",
    },
  })
);

const output = `
  <p>You have a new meeting url</p>
  <h3>Credentials for the new meeting</h3>
  <h3>Message</h3>`;

const sendMail = (receiveremail, cb) => {
  //Mail options
  const mailOpts = {
    from: "msteams.outlook.111@gmail.com",
    to: receiveremail,
    subject: "Meeting Credentials for the new meeting is here yeeeee",
    html: output, // html body
  };
  smtpTrans.sendMail(mailOpts, function (err, data) {
    debugger;
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

// Exporting the sendmail
module.exports = sendMail;
