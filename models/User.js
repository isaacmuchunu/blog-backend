import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
    }
    next();
  } catch (error) {
    // Log the error here
    console.error("Error hashing password:", error);
    next(error); // Pass the error to the next middleware
  }
});

UserSchema.methods.generateJWT = async function () {
  try {
    return await sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {
    // Log the error here
    console.error("Error generating JWT:", error);
    throw error; // Throw the error so that it can be handled elsewhere
  }
};

const user = model("User", UserSchema);

export default user;
