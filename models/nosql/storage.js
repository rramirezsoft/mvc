const mongoose = require('mongoose')
//const mongooseDelete = require('mongoose-delete')

const storageSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    url: {
        type: String
    }
},
    {
        timestamps: true, 
        versionKey: false
    }
)

//storageSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = mongoose.model('storage', storageSchema)
    
