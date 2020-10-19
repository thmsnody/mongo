const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

const itemSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Item = model('item', itemSchema)

try {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  console.log('MongoDB Connected...')
} catch (err) {
  console.error(err)
}

app.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort('-updatedAt')
    res.json(items)
  } catch (err) {
    res.json('fail')
  }
})

app.listen(3000, () => {
  console.log('Server on 3000')
})
