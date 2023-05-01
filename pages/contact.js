import { useState } from "react";
import styles from "@/styles/Contact.module.css";
import axios from "axios";
import { Layout } from "@/components/Layout";
import Image from "next/image";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contacto", {
        nombre,
        email,
        mensaje,
      });
      console.log(response.data);
      alert("Correo enviado con éxito");
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (error) {
      console.log(error);
      alert("Error al enviar el correo");
    }
  };

  return (
    <Layout>
      <div className={styles.contact_container}>
        <div className="container">
            <div className={styles.img_bg}>
              {/* <Image/> */}
              <h1>Contacto</h1>
            </div>
          <div className={styles.data_contact}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Mensaje:
                <textarea
                  name="mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                ></textarea>
              </label>
              <button type="submit">Enviar</button>
            </form>
            <div className={styles.data_map}>
              <div className={styles.map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d32129.927272971247!2d-77.03601270193789!3d-12.049964000830975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1682538670917!5m2!1ses-419!2spe" width="100%" height="100%" allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}