import User from '../models/user.js'
import Jwt from 'jsonwebtoken'

const createToken = _id => {
  return Jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create token
    const token = createToken(user._id)
    

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup user
export const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    // create token
    const token = createToken(user._id)

    // save token to session
    req.session.set(user._id, token)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// verify user
export const verifyUser = async (req, res, next) => {
  const token = req.session.authorization; // Assuming the token is sent in the "Authorization" header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  // Here, you would implement your token verification logic, such as using JWT (JSON Web Tokens)
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.user = decodedToken; // Store the decoded token in the request for further use
    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Access denied. Invalid token.' });
  }
}
