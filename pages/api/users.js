import User from '@/models/User';
import { dbConnect } from '@/utils/dbConnect';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";

dbConnect();

const jwtSecret = "mysecret"; // Modifica esto con tu propia clave secreta JWT
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // Tiempo de vida de 5 minutos para el caché

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case "POST":
        try {
          const { name, img, email, password, role } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          
          const filter = { email: email };
          const update = {
            name: name,
            img: img,
            email: email,
            password: hashedPassword,
            role: role
          };
          const options = { upsert: true, new: true };
          
          const user = await User.findOneAndUpdate(filter, update, options);
      
          // Generar token JWT y guardarlo en caché
          const token = jwt.sign({ userId: user._id }, jwtSecret);
          cache.set(token, user._id);
      
          res.status(201).json({ success: true, data: user, token });
          
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(req.query.id);
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.query.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}