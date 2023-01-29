const { User, HttpError } = require("../../models");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
