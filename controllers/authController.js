const authService = require("../services/authService");
const jwt = require("jsonwebtoken");

//###################################User Registration API#################################
exports.register = async (req, res, next) => {
  try {
    const userData = req.body;
    const existingUser = await authService.findUserByEmail(userData.email);
    if (existingUser) {
      return res.json({ message: "user already regsitred" });
    }
    const user = await authService.registerUser(userData);
    res.status(200).json({ message: "User registred successfully", user });
  } catch (error) {
    next(error);
  }
};

//####################################---------Login API----------- #########################//
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.json({ message: "Email is not registred" });
    }
    const passMatch = await authService.verifyPassword(password, user.password);
    if (!passMatch) {
      return res.json({ message: "Invalid Password" });
    }
    //Generate the JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "asdfghjkl",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Loggedin success", token });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = (req, res, next) => {
  
  console.log(" i am king");
  res.json({ message: "This is a protected route" });
};
