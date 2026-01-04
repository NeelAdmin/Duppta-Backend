import UserModel from "../Model/User.model.js";
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error("Something went wrong while generating tokens");
    }
};
const registerUser = async (req, res) => {
    const { name, mobile, password, address } = req.body;
    if (!name || !mobile || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = await UserModel.create({ name, mobile, password, address });
    const createdUser = await UserModel.findById(user._id.toString()).select("-password -refreshToken");
    return res.status(201).json({ success: true, message: "User created successfully", user: createdUser });
};
const loginUser = async (req, res) => {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ mobile });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    const loggedInUser = await UserModel.findById(user._id.toString()).select("-password -refreshToken");
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id.toString());
    return res.status(200).json({ success: true, message: "User logged in successfully", accessToken, refreshToken, user: loggedInUser });
};
export { registerUser, loginUser };
