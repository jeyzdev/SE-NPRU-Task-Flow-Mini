const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const node_mode = process.env.NODE_MODE;

// ✅ แก้ไข signUp ให้ส่งข้อมูล User กลับไปด้วย
const signUp = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already used." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: profilePic || "",
    });

    if (newUser) {
      // สร้าง Token
      const token = jwt.sign({ email, id: newUser._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      // ส่ง Cookie
      res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: node_mode === "production",
      });

      // 🔥 หัวใจสำคัญ: ส่งข้อมูล User กลับไปเพื่อให้ Frontend เก็บเข้า Store ทันที
      return res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User registered successfully.",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: e.message || "Error occurred during registration",
    });
  }
};

// ✅ แก้ไข signIn ให้ส่งฟิลด์ครบตาม Schema (fullName, profilePic)
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).send({ message: "User not found." });
    }

    const isPasswordMatched = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ email, id: userDoc._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: node_mode === "production",
    });

    // 🔥 ส่ง fullName และ profilePic กลับไปด้วย
    return res.send({
      _id: userDoc._id,
      fullName: userDoc.fullName,
      email: userDoc.email,
      profilePic: userDoc.profilePic || "",
      message: "Logged in successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// ✅ แก้ไข logout ให้ระบุ options ให้ครบเพื่อให้คุกกี้ถูกลบจริง
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: node_mode === "production",
    });
    res.status(200).json({ message: "Logged out Successfully." });
  } catch (e) {
    res.status(500).send({ message: "Error during logout" });
  }
};

const checkAuth = async (req, res) => {
  try {
    // ข้อมูล req.user ต้องถูกดึงมาจาก Middleware ตรวจสอบ Token
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ message: "Error checking auth." });
  }
};

const AuthController = { signUp, signIn, logout, checkAuth };
module.exports = AuthController;
