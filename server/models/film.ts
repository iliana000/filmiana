import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FilmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // title: String,
  url: String,
  image: String,
  watched: Boolean,
  description: String,
  tags: [String],
})

export default mongoose.model('Film', FilmSchema)
