const { UserModel } = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({ msg: "User not found" });
      return;
    }
    bcrypt.compare(password, user?.password, (err, result) => {
      if (!result) {
        res.status(401).send({ msg: "Wrong Credentials" });
        return;
      }
      const token = jwt.sign(
        { email, id: user._id },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).send({ msg: "Login Successful", token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message || error });
  }
};

const register = (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hashedPass) => {
      if (hashedPass) {
        const user = new UserModel({ email, password: hashedPass });
        await user.save();
        res.status(201).send({ msg: "User Registered", data: user });
      } else {
        res.status(500).send(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message || error });
  }
};

const editUser = async (req, res) => {
  const id = req?.body?.user_id;
  try {
    if(!req.body.password){
      await UserModel.findByIdAndUpdate(id, req.body);
      res.status(202).send({ msg: "User updated" });
      return;
    }
    bcrypt.hash(req.body.password, 3, async (err, hashedPass) => {
      if (hashedPass) {
        await UserModel.findByIdAndUpdate(id, {...req.body, password: hashedPass});
        res.status(202).send({ msg: "User Updated"});
      } else {
        res.status(500).send(err);
      }
    });
   
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message || error });
  }
};

const getDetails = async (req, res) => {
  const id = req?.body?.user_id;
  try {
    const user = await UserModel.findById(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message || error });
  }
};

module.exports = { login, register, editUser, getDetails };
