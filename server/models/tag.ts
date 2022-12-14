import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
})

export default mongoose.model('Tag', TagSchema)
