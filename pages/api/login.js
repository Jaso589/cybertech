
import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST requests allowed" });
  }

  const { email, password } = req.body;

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Buscar el usuario por email en la base de datos
    const user = await User.findOne({ email });

    // Si el usuario no existe, enviar error
    if (!user) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Si el password no coincide, enviar error
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Si todo está correcto, enviar respuesta exitosa
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    // Si hay un error, enviar error
    return res.status(500).json({ message: "Internal server error" });
  }
}