import { Schema, model, mongoose } from "mongoose";

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = new model("contact", contactSchema);
export default Contact;
