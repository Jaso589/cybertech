import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Almacenarás la public_id de Cloudinary
    default: 'no-image.png', // Si no se sube ninguna imagen, se usará una imagen por defecto
  },
  imageURL: {
    type: String,
    default: 'no-image.png', // Almacenarás la URL de la imagen de Cloudinary
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;