import { model, Schema } from "mongoose"
import { genSalt, hash, compare } from "bcrypt"
import validator from "validator"

const Schema1 = Schema

const userSchema = new Schema1({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
  
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled in')
  }
  if(!validator.isEmail(email)){
    throw Error('Please enter a valid email')
  }
  if(!validator.isStrongPassword(password)){
    throw Error('Please enter a stronger password')
  }
  
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already exists')
  }

  const salt = await genSalt(10)
  const ash = await hash(password, salt)

  const user = await this.create({ email, password: ash })

  return user
}

// static login method
userSchema.statics.login = async function( email, password ) {
  if(!email || !password) {
    throw Error('All fields must be filled in')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await compare(password, user.password)

  if (!match ) {
    throw Error('Invalid password')
  }

  return user
}

// Create the model for Students
const User = model('User', userSchema)

export default User