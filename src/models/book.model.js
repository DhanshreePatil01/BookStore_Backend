import { Schema,model } from 'mongoose';

const bookSchema = new Schema ({
    description: {
        type: String,
        require: true
    },
    discountPrice: {
        type: Number,
    },
    bookImage: {
        type: String,
        default: ''
    },
    admin_user_id: {
        type: String
    },
    bookName: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
 },
  {
    timestamps : true
  }
)

export default model('Book',bookSchema);