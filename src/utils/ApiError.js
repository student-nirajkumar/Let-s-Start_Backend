import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1️⃣ get user details
    const { fullName, email, username, password } = req.body;

    // 2️⃣ validation
    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // 3️⃣ check if user already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists with this email or username");
    }

    // 4️⃣ get file paths from multer
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // 5️⃣ upload to cloudinary
    const avatar = await uploadToCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadToCloudinary(coverImageLocalPath)
        : null;

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // 6️⃣ create user
    const user = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }

    // 7️⃣ remove sensitive fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 8️⃣ response
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: createdUser
    });
});

export { registerUser };
