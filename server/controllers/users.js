const { users } = require("../models");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { send_magic_link } = require("./emails.js");
const { Op } = require("sequelize");

const register = async (email) => {
  try {
    const newUser = {
      email: email,
      magicLink: crypto.randomBytes(64).toString("hex"),
      // ever activated if not remove later with cron
    };

    let user = await users.create(newUser);
    // send magic link to email
    let sendEmail = send_magic_link(email, user.magicLink, "signup");
    console.log("sendEmail", sendEmail);

    return { ok: true, message: "User created" };
  } catch (error) {
    return { ok: false, error };
  }
};

const login = async (req, res) => {
  const { email, magicLink } = req.body;

  if (!email)
    return res.json({ ok: false, message: "All fields are required" });
  if (!validator.isEmail(email))
    return res.json({ ok: false, message: "Invalid email provided" });

  try {
    let user = await users.findOne({ where: { email: email } });
    if (!user) {
      let reg = await register(email);
      res.send({
        ok: true,
        message:
          "Your account has been created. Click the link in the email to sign in",
      });
    } else if (!magicLink) {
      try {
        user = await user.update({
          magicLink: crypto.randomBytes(64).toString("hex"),
          magicLinkExpired: false,
        });
        // send email with magic link
        send_magic_link(email, user.magicLink);
        res.send({
          ok: true,
          message: "Click the link in the email to sign in",
        });
      } catch {}
    } else if (user.magicLink === magicLink && !user.magicLinkExpired) {
      console.log("user", user.toJSON());

      const token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: "1h" }); //{expiresIn:'365d'}

      await user.update({ magicLinkExpired: true });
      res.json({ ok: true, message: "Welcome back", token, email });
    } else {
      return res.json({
        ok: false,
        message: "Magic link expired or incorrect",
      });
    }
  } catch (error) {
    res.json({ ok: false, error });
  }
};

const verify_token = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Something went wrong" })
      : res.json({ ok: true, succ });
  });
};

module.exports = { login, verify_token };
