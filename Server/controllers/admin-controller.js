import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";

const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

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

const getContactUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Contact.findOne({ _id: id });
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const deleteContactUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedContact = await Contact.deleteOne({ _id: id });

    if (!deletedContact.deletedCount) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    next();
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updateData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  getAllUsers,
  getContact,
  deleteUserById,
  getUserById,
  updateUserById,
  getContactUser,
  deleteContactUser,
};
