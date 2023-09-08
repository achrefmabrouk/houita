import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String,/*  required: true */unique: true },
    slug: { type: String,/*  required: true */ unique: true },
    image: { type: String,/*  required: true */ },
    images: [String],
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    price: { type: Number,/*  required: true */ },
    countInStock: { type: Number},
    rating: { type: Number},
    numReviews: { type: Number},
    reviews: [reviewSchema],
    disponible:{ type: Boolean, default: false},
    imagecategory:{type:String},
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
