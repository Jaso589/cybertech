import Product from '@/models/Product'; // Importa el modelo de Producto
import { dbConnect } from '@/utils/mongoose';
dbConnect()

export default async function handler(req, res) {
    const {
        query: { id },
        method,
      } = req;
    
      switch (method) {
        case 'GET':
          try {
            const product = await Product.findById(id);
            if (!product) {
              return res.status(404).json({ success: false });
            }
            res.status(200).json({ success: true, data: product });
          } catch (error) {
            res.status(400).json({ success: false });
          }
          break;
        default:
          res.status(400).json({ success: false });
          break;
      }
    }