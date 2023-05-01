import cloudinary from 'cloudinary';
import { dbConnect } from '@/utils/dbConnect';
import Product from '@/models/Product';
dbConnect();

// Configurar Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;

    case 'POST':
      try {
        const { name, description, price, categoryName, image, imageURL, stock } = req.body;

        // Subir la imagen a Cloudinary
        // const result = await cloudinary.v2.uploader.upload(req.body.image, { folder: 'products' });
        // Crear el producto en la base de datos
        const product = new Product({
          name,
          description,
          price,
          categoryName,
          image,
          imageURL,
          stock,
        });
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      break;

      case 'PUT':
        try {
          const { id } = req.query;
          const { name, description, price, category, image, imageURL, stock } = req.body;
  
          // // Si hay una nueva imagen, subirla a Cloudinary y eliminar la imagen anterior
          // let imageURL = image;
          // let imagePublicId = null;
          // if (req.body.newImage) {
          //   // Subir la nueva imagen a Cloudinary
          //   const result = await cloudinary.v2.uploader.upload(req.body.newImage, { folder: 'my_upload_js' });
          //   imageURL = result.secure_url;
          //   imagePublicId = result.public_id;
  
          //   // Obtener el public_id de la imagen anterior
          //   const product = await Product.findById(id);
          //   const imagePublicIdToDelete = product.image;
  
          //   // Eliminar la imagen anterior de Cloudinary usando el token
          //   await cloudinary.v2.uploader.destroy(imagePublicIdToDelete, { invalidate: true, resource_type: 'image', type: 'authenticated' });
          // }
  
          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, image, imageURL, stock },
            { new: true }
          );
  
          res.status(200).json(updatedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
        break;
  

    case 'DELETE':
      try {
        const { id } = req.query;

        // Eliminar la imagen de Cloudinary
        const product = await Product.findById(id);
        await cloudinary.v2.uploader.destroy(product.image, { invalidate: true });

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}