require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMessage(to, link) {
    const mailOptions = {
      from: "devtesting1203@gmail.com",
      to: to,
      subject: `Activation of email on ${process.env.SITE_URL}`,
      text: "",
      html: `
        <table
        style="
          width: 100%;
          background-color: #1c1c1c;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        "
      >
        <tbody>
          <tr>
            <td
              style="
                height: 15vh;
                background: linear-gradient(
                  45deg,
                  #098b53 40%,
                  #767676 60%,
                  #1c1c1c 95%
                );
                padding-left: 20px;
              "
            >
              <h1
                style="
                  font-size: 36px;
                  font-weight: 700;
                  color: white;
                  text-shadow: 0 0 5px #000000;
                "
              >
                Todo<span
                  style="
                    font-size: 36px;
                    font-weight: 700;
                    color: #1c1c1c;
                    text-shadow: 0 0 5px #ffffffba;
                  "
                  >List</span
                >
              </h1>
            </td>
          </tr>
          <tr style="color: #767676;">
            <td style="padding-left: 30px; padding-right: 15px; padding-bottom: 150px">
              <h2 style="color: #b8b8b8">Activation of email address.</h2>
              <h4 style="color: #767676;">Welcome to our community!</h4>
              <h4 style="color: #767676;">
                We created an account for you. Please confirm your email address and
                get ready to start using our services.
              </h4>
              <a
              style="
                font-size: 24px;
                font-weight: 600;
                display: inline-block;
                color: #e2e2e2;
                padding-left: 16px;
                padding-right: 16px;
                padding-top: 10px;
                padding-bottom: 10px;
                background-color: #098b53;
                border-radius: 5px;
                text-decoration: none;
              "
              href="${link}"
              >Confirm email</a
            >
            </td>
          </tr>
          <tr >
            <td><span style="display: block; text-align: center; color: #767676; ">
              This email message was automatically sent by ${process.env.SITE_URL}
              because someone attempted to create an account on TodoList website
              using this email address.
            </span></td>
            
          </tr>
          <tr>
            <td ><span style="display: block; text-align: center; color: #767676; "  >
              Please, write in a reply letter to this email if it have been done
              by you
            </span></td>
          </tr>
        </tbody>
      </table>
        `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error sending message: " + err);
      } else {
        console.log("Activation message succesfully send.");
      }
    });
  }
  async sendResetMessage(to, link) {
    const mailOptions = {
      from: "devtesting1203@gmail.com",
      to: to,
      subject: `Password Recovery on ${process.env.SITE_URL}`,
      text: "",
      html: `
          <table
          style="
            width: 100%;
            background-color: #1c1c1c;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          "
        >
          <tbody>
            <tr>
              <td
                style="
                  height: 15vh;
                  background: linear-gradient(
                    45deg,
                    #098b53 40%,
                    #767676 60%,
                    #1c1c1c 95%
                  );
                  padding-left: 20px;
                "
              >
                <h1
                  style="
                    font-size: 36px;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 0 5px #000000;
                  "
                >
                  Todo<span
                    style="
                      font-size: 36px;
                      font-weight: 700;
                      color: #1c1c1c;
                      text-shadow: 0 0 5px #ffffffba;
                    "
                    >List</span
                  >
                </h1>
              </td>
            </tr>
            <tr style="color: #767676;">
              <td style="padding-left: 30px; padding-right: 15px; padding-bottom: 150px">
                <h2 style="color: #b8b8b8">Password recovery</h2>
                <h4 style="color: #767676;">Hi there,</h4>
                <h4 style="color: #767676;">
                A new password was requested for your <span style="
                font-size: 18px;
                font-weight: 700;
                color: #ffffff;
                text-shadow: 0 0 5px #000000;
              ">Todo</span>
              <span
                style="
                  font-size: 18px;
                  font-weight: 700;
                  color: #1c1c1c;
                  text-shadow: 0 0 5px #ffffffba;
                ">List</span> account. Click below to reset your password
                </h4>
                <a
                style="
                  font-size: 24px;
                  font-weight: 600;
                  display: inline-block;
                  color: #e2e2e2;
                  padding-left: 16px;
                  padding-right: 16px;
                  padding-top: 10px;
                  padding-bottom: 10px;
                  background-color: #098b53;
                  border-radius: 5px;
                  text-decoration: none;
                "
                href="${link}"
                >Reset password</a
              >
              </td>
            </tr>
            <tr>
              <td><span style="display: block; text-align: center; color: #767676;">
                This email message was sent by ${process.env.SITE_URL}
                because someone request to recover password on TodoList website using this email address.
              </span></td>
              
            </tr>
            <tr >
              <td ><span style="display: block; text-align: center; color: #767676; "  >
                Please, write in a reply letter to this email if it have been done
                by you
              </span></td>
            </tr>
          </tbody>
        </table>
          `,
    };
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error sending message: " + err);
      } else {
        console.log("Recovery message succesfully send");
      }
    });
  }
}
module.exports = new mailService();
