import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;