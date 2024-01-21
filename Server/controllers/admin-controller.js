import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No Users Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ message: "No Contacts Found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export default { getAllUsers, getContact };
