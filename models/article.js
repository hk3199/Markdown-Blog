const mongoose= require('mongoose')
const marked= require('marked')
const slugify= require('slugify')
const createDomPurifier = require('dompurifier')
const {JSDOM}= require ('jsdom')
const dompurify= createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        type:String
    },
    markdown: {
        type: String,
        required:true
    },
    createdate:{
        type:Date,
        default:Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
      }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
  
  
    next()
  })
  
module.exports= mongoose.model('Article', articleSchema)