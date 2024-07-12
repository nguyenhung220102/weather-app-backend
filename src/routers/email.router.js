let express = require("express");
let router = express.Router();
let EmailController = require("../controllers/email.controller");

router.route("/emails").post(EmailController.subscribeEmail);
router.route("/emails/:code").get(EmailController.confirmEmail);
router.route("/emails/unsubscribe/:code").get(EmailController.unsubscribeEmail);

exports.emailRouter = router;
