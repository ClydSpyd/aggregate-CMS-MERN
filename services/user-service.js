const bcrypt = require("bcrypt")
const AdminUser = require("../schema/admin-user")
const jwt = require('jsonwebtoken');
const { TOKEN_LIFESPAN } = require("../constants");

// create new user
const createNewUser = async ({ username, email, password, role, avatarUrl }) => {
  try {
    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const newUser = new AdminUser({
      username,
      email,
      password: hashedPassword,
      role,
      avatarUrl,
    })

    // save user
    await newUser.save()

    return { newUser }
  } catch (error) {
    return { error }
  }
}

const getUsers = async () => {
  return await AdminUser.find()
}
const getUserById = async (userId) => {
  return await AdminUser.findOne({ _id: userId })
}

const findUserByUsername = async (username) => {
  return await AdminUser.findOne({ username: username })
}
const findUserByEmail = async (email) => {
  return await AdminUser.findOne({ email: email })
}

const findUserByEmailWithPassword = async (user) => {
  return await AdminUser.findOne({ email: user.email }).select("+password")
}

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: TOKEN_LIFESPAN }
  );
};

const isValidEmail = (value) => {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
  return regex.test(value)
}

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  findUserByUsername,
  findUserByEmail,
  findUserByEmailWithPassword,
  isValidEmail,
  generateAccessToken,
}
