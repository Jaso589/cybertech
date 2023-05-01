import { useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/utils/accessToken";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Admin.module.css";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      setAccessToken(data.accessToken); // Almacena el JWT en el almacenamiento local del navegador
      router.push("/admin/dashboard");
    } else {
      console.log("Usuario no encontrado");
    }
  };

  return (
    <Layout>
      <div className={styles.admin_container}>
        <div className="container">
          <div className={styles.admin_form}>
            <h1>Inicio de sesión de administrador</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
    
  );
}