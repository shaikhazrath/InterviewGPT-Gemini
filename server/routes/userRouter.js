import express from "express";
const router = express.Router();
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_OAUT);
import verifyToken from "../middleware/authMiddleware.js";

router.post("/", async (req, res) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken,
      audience:process.env.GOOGLE_OAUT
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email});
      await user.save();
      console.log(user)
    }
    const token = jwt.sign({ id: user._id },process.env.JWT_SEC, { expiresIn: "24h" });
    const responseData = {
      token,
      name,
      message: user.isNew ? 'New user created' : 'User found',
    };
    res.status(201).json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/checkauth",verifyToken,(req,res)=>{
  try {
    const message = "user authenticated"
    res.status(200).json({message});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

export default router
