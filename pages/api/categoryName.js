
import Product from '@/models/Product';
import { dbConnect } from '@/utils/dbConnect';
dbConnect()

export default async function handler(req, res) {
  const { categoryName } = req.query;

  try {
   
    const products = await Product.find({ categoryName });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}