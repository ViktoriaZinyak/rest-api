const { HttpError } = require("../../models");
const { verify } = require("../../controllers");

const verifyEmailController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new HttpError(400, "missing required field email"));
  }

  await verify(email);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = verifyEmailController;
