const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { User, HttpError } = require("../../models");

const verify = async (email) => {
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }
  const verificationToken = nanoid();
  user.verificationToken = verificationToken;

  await user.save();
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`,
  };
  await sendEmail(mail);
};

module.exports = verify;
