import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1️⃣ Get user details from frontend
    const { fullName, email, username, password } = req.body;

    // 2️⃣ Validation - not empty
    if (
        !fullName ||
        !email ||
        !username ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // 3️⃣ Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        return res.status(409).json({
            message: "User already exists with this email or username"
        });
    }

    // 4️⃣ Create user object & save to DB
    const user = await User.create({
        fullName,
        email,
        username,
        password
    });

    // 5️⃣ Check if user creation failed
    if (!user) {
        return res.status(500).json({
            message: "User registration failed"
        });
    }

    // 6️⃣ Remove sensitive fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 7️⃣ Return response
    return res.status(201).json({
        message: "User registered successfully",
        user: createdUser
    });
});

export { registerUser };
