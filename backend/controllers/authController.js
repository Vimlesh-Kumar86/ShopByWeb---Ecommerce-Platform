// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const sendEmail = require('../utils/sendEmail');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, password: hashedPassword });
//     if (user) {
      
//       // Generate a mock OTP
//       const otp = Math.floor(100000 + Math.random() * 900000);
      
//       // Send Welcome / OTP Email
//       const message = `
//         <h2>Welcome to ShopNest, ${name}!</h2>
//         <p>Thank you for registering on our platform.</p>
//         <p>Your one-time verification/discount OTP is: <strong>${otp}</strong></p>
//       `;

//       await sendEmail({
//         email: user.email,
//         subject: 'Welcome to ShopNest - Your OTP',
//         message
//       });

//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select('-password');
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { registerUser, loginUser, getUsers };



























const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token before sending the response
    const token = generateToken(user._id);

    // Generate welcome email
    const otp = Math.floor(100000 + Math.random() * 900000);

    const message = `
      <h2>Welcome to ShopByWeb, ${name}!</h2>
      <p>Thank you for registering on our platform.</p>
      <p>Your welcome code is:
        <strong>${otp}</strong>
      </p>
    `;

    // Respond immediately; do not wait for SMTP
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      message: 'Registration successful',
    });

    // Attempt to send the email after the response
    sendEmail({
      email: user.email,
      subject: 'Welcome to ShopByWeb',
      message,
    }).catch((emailError) => {
      console.error(
        'Welcome email failed:',
        emailError.message
      );
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Registration failed. Please try again.',
      });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    return res.json(users);
  } catch (error) {
    console.error('Get users error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch users',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
