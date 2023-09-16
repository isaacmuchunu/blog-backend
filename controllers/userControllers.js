import User from "../models/User"; // Import User with an uppercase 'U'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User has already registered" });
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });

    // Return the user data in the response
    return res.status(201).json({
      _id: newUser._id,
      avatar: newUser.avatar, // Correct the property name to 'avatar'
      name: newUser.name,
      email: newUser.email,
      verified: newUser.verified,
      admin: newUser.admin,
      token: await newUser.generateJWT(),
    });
  } catch (error) {
    console.error("Error:", error.message); // Log the error message
    console.error("Stack Trace:", error.stack); // Log the error stack trace

    return res
      .status(500)
      .json({ message: "Oops! Something went horribly wrong..." });
  }
};
export { registerUser };
