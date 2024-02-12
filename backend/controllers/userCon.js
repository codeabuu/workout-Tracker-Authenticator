const User = require('../models/userMod')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}
//login user
const LoginUser = async(req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  }
  catch (error) {
    res.status(404).json({error: error.message})
  }
}

//signup user
const SignupUser = async(req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.signup(email, password)
    //create token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  }
  catch (error) {
    res.status(404).json({error: error.message})
  }

}
module.exports = {LoginUser, SignupUser}
