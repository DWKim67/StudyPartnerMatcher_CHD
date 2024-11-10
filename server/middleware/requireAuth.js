const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {

  // Verify authentication
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const authorizationSplitString = authorization.split(' ');

  // console.log("auth split string: ", authorizationSplitString[0]);
  const token = authorizationSplitString[1];


  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id');
    next();
    
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' })
  }

}

module.exports = requireAuth;