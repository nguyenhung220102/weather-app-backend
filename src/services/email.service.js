var nodemailer = require("nodemailer");
var nodecron = require("node-cron");
const axios = require("axios");
const Email = require("../models/email.model");

const generateMailTransporter = async () => {
    let transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    return transport;
};

const sendDailyEmails = async () => {
    try {
        const customers = await Email.find({ isRegistered: true });
        customers.forEach(async (customer) => {
            const recipient = customer.email;
            await sendDailyWeather(recipient, customer.city, customer.confirmationCode);
        });
        console.log(
            `Daily emails sent successfully to ${customers.length} customers.`
        );
    } catch (error) {
        console.error("Error sending daily emails:", error);
    }
};

// Daily sending email to customers at 9AM (Vietnamese Timezone)
nodecron.schedule(
    "0 9 * * *",
    async () => {
        console.log("Sending daily emails...");
        await sendDailyEmails();
    },
    { timezone: "Asia/Ho_Chi_Minh" }
);

const sendConfirmationEmail = async (recipient, code) => {
    try {
        let mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: "DAILY WEATHER SUBSCRIPTION CONFIRMATION",
            html: `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                <tbody>
                  <tr>
                    <td align="left" style="font-size:0px;padding:15px;word-break:break-word;">
                      <div style="font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                        <p>Dear ${recipient},</p>
                        <p>&nbsp;</p>
                        <p>Thank you for choosing our weather service! To confirm your subscription and start receiving daily weather updates, please click the confirmation button below.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
                        <tbody>
                          <tr>
                            <td align="center" bgcolor="#4361E5" role="presentation" style="border:0px #000000 solid;border-radius:8px;cursor:auto;font-style:normal;mso-padding-alt:9px 20px 10px 20px;background:#4361E5;" valign="middle">
                              <a href="${process.env.BACKEND_URL}emails/${code}" style="display:inline-block;background:#4361E5;color:#ffffff;font-size:13px;font-style:normal;font-weight:normal;line-height:100%;margin:0;text-decoration:none;text-transform:none;padding:9px 20px 10px 20px;mso-padding-alt:0px;border-radius:8px;" target="_blank">
                                <strong>SUBSCRIBE</strong>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:15px;word-break:break-word;">
                      <div style="font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                        <p>We appreciate your trust in our service and look forward to keeping you informed about the latest weather conditions.</p>
                        <p>&nbsp;</p>
                        <p>Best regards,</p>
                        <p>Weather Forecast Service.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              `,
        };
        let transporter = await generateMailTransporter();
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const sendDailyWeather = async (recipient, city, code) => {
    try {
        const response = await axios.get(process.env.WEATHER_DAILY_API_URL, {
            params: {
                key: process.env.WEATHER_API_KEY,
                q: city,
            },
        });
        const weatherData = response.data;
        const { location, current } = weatherData;
        const { name, localtime } = location;
        const { temp_c, temp_f, condition, wind_kph, humidity } = current;

        let mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: recipient,
            subject: `DAILY WEATHER UPDATE FOR ${name}`,
            html: `
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                <tbody>
                  <tr>
                    <td align="left" style="font-size:0px;padding:15px;word-break:break-word;">
                      <div style="font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                        <p>Dear ${recipient},</p>
                        <p>&nbsp;</p>
                        <p>Here is your daily weather update for ${name}:</p>
                        <p>Local Time: ${localtime}</p>
                        <p>Temperature: ${temp_c}°C / ${temp_f}°F</p>
                        <p>Condition: ${condition.text}</p>
                        <p>Wind Speed: ${wind_kph} km/h</p>
                        <p>Humidity: ${humidity}%</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;word-break:break-word;">
                      <div style="font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                        <p>To unsubscribe from this service, you can click the button below.</p>
                        <p>&nbsp;</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" vertical-align="middle" style="font-size:0px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
                        <tbody>
                          <tr>
                            <td align="center" bgcolor="#FF5733" role="presentation" style="border:0px #000000 solid;border-radius:8px;cursor:auto;font-style:normal;mso-padding-alt:9px 20px 10px 20px;background:#FF5733;" valign="middle">
                              <a href="${process.env.BACKEND_URL}emails/unsubscribe/${code}" style="display:inline-block;background:#FF5733;color:#ffffff;font-size:13px;font-style:normal;font-weight:normal;line-height:100%;margin:0;text-decoration:none;padding:10px 20px 10px 20px;border-radius:8px;" target="_blank">
                                <strong>UNSUBSCRIBE</strong>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px;word-break:break-word;">
                      <div style="font-size:13px;line-height:1.5;text-align:left;color:#000000;">
                        <p>We appreciate your trust in our service and hope this information helps you plan your day accordingly.</p>
                        <p>&nbsp;</p>
                        <p>Best regards,</p>
                        <p>Weather Forecast Service.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            `,
        };
        let transporter = await generateMailTransporter();
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = {
    sendConfirmationEmail,
    sendDailyEmails,
    sendDailyWeather,
};
