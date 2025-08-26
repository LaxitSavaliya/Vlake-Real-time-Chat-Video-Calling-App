import { upsertStreamUser } from '../Lib/Stream.js';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists, please use a diffrent one or go for login.' });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullname,
            password,
            profilePic: randomAvatar,
        });

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullname,
                image: newUser.profilePic || '',
            });
            console.log(`Stream user created for ${newUser.fullname}`);
        } catch (error) {
            console.error("Error creating Stream user:", error.message);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(201).json({ success: true, user: newUser.toObject({ getters: true, virtuals: true }) });

    } catch (error) {
        console.error("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server Error." });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password." });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ success: true, user: user.toObject({ getters: true, virtuals: true }) });

    } catch (error) {
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const { fullname, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullname || !bio || !nativeLanguage || !learningLanguage || !location) {

            const missingFields = [];
            if (!fullname) missingFields.push('fullname');
            if (!bio) missingFields.push('bio');
            if (!nativeLanguage) missingFields.push('nativeLanguage');
            if (!learningLanguage) missingFields.push('learningLanguage');
            if (!location) missingFields.push('location');

            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    ...missingFields
                ],
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullname,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullname}`);
        } catch (streamError) {
            console.error("Error updating Stream user during onboarding:", streamError.message);
        }

        res.status(200).json({ success: true, user: updatedUser.toObject({ getters: true, virtuals: true }) });

    } catch (error) {
        console.error("Onboarding error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}