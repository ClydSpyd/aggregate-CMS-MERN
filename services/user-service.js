const bcrypt = require("bcrypt")
const AdminUser = require("../schema/user-admin")
const ClientUser = require("../schema/user-client")
const jwt = require('jsonwebtoken');
const { TOKEN_LIFESPAN } = require("../constants");
const userAuthor = require("../schema/user-author");

// create new admin user
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

// create new client user
const createNewClientUser = async ({ username, email, password, role, avatarUrl }) => {
  try {
    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const newUser = new ClientUser({
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

// create new author user
const createNewAuthor = async ({ name, location, avatarUrl }) => {
  try {

    // create user
    const newUser = new userAuthor({
      name,
      location,
      avatarUrl,
    })

    // save user
    await newUser.save()

    return { newUser }
  } catch (error) {
    return { error }
  }
}

const getUsers = async (client) => {
  return client ? await ClientUser.find() : await AdminUser.find();
};

const getAuthors = async (client) => {
  return await userAuthor.find();
};

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
  createNewClientUser,
  createNewAuthor,
  getUsers,
  getUserById,
  getAuthors,
  findUserByUsername,
  findUserByEmail,
  findUserByEmailWithPassword,
  isValidEmail,
  generateAccessToken,
};
