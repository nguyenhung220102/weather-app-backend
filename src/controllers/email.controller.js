const Email = require("../models/email.model");
const crypto = require("crypto");
const sendConfirmationEmail = require("../services/email.service").sendConfirmationEmail;

exports.confirmEmail = async (req, res) => {
    const { code } = req.params;
    try {
        let existingEmail = await Email.findOne({ confirmationCode: code });
        if (!existingEmail) {
            return res.status(400).send("Email confirmation code is not valid");
        }
        if (existingEmail.isRegistered == true) {
            return res.status(400).send("Email is already registered");
        }

        existingEmail.isRegistered = true;
        await existingEmail.save();

        res.status(200).send("Email subscription confirmed successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error confirming email subscription");
    }
};

exports.subscribeEmail = async (req, res) => {
    const { email, city } = req.body;

    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        let existingEmail = await Email.findOne({ email: email });
        if (existingEmail) {
            return res.status(200).send("Email already exists");
        }

        const confirmationCode = crypto.randomBytes(16).toString("hex");
        let newEmail = new Email({
            email: email,
            isRegistered: false,
            confirmationCode: confirmationCode,
            city: city,
        });
        await newEmail.save();
        await sendConfirmationEmail(email, confirmationCode);
        res.status(200).send("Subscribe successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error subscribing email");
    }
};
