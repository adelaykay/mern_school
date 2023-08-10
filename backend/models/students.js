import { Schema, model } from 'mongoose'


// Define the schema for Students
const StudentSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'First Name is required'],
  },
  middlename: {
    type: String,
  },
  surname: { type: String, required: [true, 'Surname is required']},
  sex: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported'
    },
    required: [true, 'sex is required']
  },
  date_of_birth: {
    type: Date,
    required: [true, 'date of birth is required']
  },
  address: {
    type: String,
  },
  state_of_origin: {
    type: String,
    required: [true, 'state of origin is required']
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course'}],
})


// Create the model for Students
const Student = model('Student', StudentSchema)

export default Student