const { User, HttpError } = require("../../models");

const verifyEmailController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new HttpError(400, "missing required field email"));
  }

  const { verify } = await User.findOne({ email });
  if (verify) {
    return next(400, "Verification has already been passed");
  }
};

module.exports = verifyEmailController;
