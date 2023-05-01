
import Category from "@/models/Category";
import { dbConnect } from "@/utils/dbConnect";
dbConnect()

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await Category.find();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      break;
      case 'POST': {
        try {
          const { name, description, image, imageURL } = req.body;
  
          const newProduct = new Category({
            name,
            description,
            image,
            imageURL
          });
  
          await newProduct.save();
  
          res.status(200).json(newProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Hubo un problema al crear el producto' });
        }
        break;
      }
    case "PUT":
      try {
        const { id } = req.query;
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        await Category.findByIdAndRemove(id);
        res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}