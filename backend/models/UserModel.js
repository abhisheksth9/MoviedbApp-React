import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    maxlength: 60
  },
  email: {
    type: String,
    required: [true, "Email Address is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8
  }
});

const User = mongoose.model("User", UserSchema);
export default User;