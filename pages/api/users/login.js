import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
dbConnect();

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }
        return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
    } else {
      return res.status(405).json({ success: false, message: "Método no permitido" });
    }
  }