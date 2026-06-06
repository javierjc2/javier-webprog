const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// ── GET /api/users ────────────────────────────────────────────────────────────
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── POST /api/users ───────────────────────────────────────────────────────────
const createUser = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const exists = await User.findOne({
            $or: [
                { email:    req.body.email?.toLowerCase() },
                { username: req.body.username?.toLowerCase() },
            ],
        });
        if (exists) {
            const field = exists.email === req.body.email?.toLowerCase() ? 'Email' : 'Username';
            return res.status(400).json({ message: `${field} already exists` });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });

        // Return without password
        const { password: _pw, ...userOut } = user.toObject();
        res.status(201).json(userOut);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── PUT /api/users/:id ────────────────────────────────────────────────────────
const updateUser = async (req, res) => {
    try {
        const update = { ...req.body };

        // Only hash the password if it was actually provided and non-empty
        if (update.password && update.password.trim()) {
            update.password = await bcrypt.hash(update.password, 10);
        } else {
            delete update.password; // keep existing hash
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── DELETE /api/users/:id ─────────────────────────────────────────────────────
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ── POST /api/users/login ─────────────────────────────────────────────────────
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email?.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'No account found with that email address.' });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: 'Your account is inactive. Please contact an administrator.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password. Please try again.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            message:   'Login successful',
            token,
            type:      user.role,
            firstName: user.firstName,
            userId:    user._id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ── PATCH /api/users/:id/toggle ───────────────────────────────────────────────
const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isActive = !user.isActive;
        await user.save();

        const { password: _pw, ...userOut } = user.toObject();
        res.json(userOut);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser, toggleUserStatus };