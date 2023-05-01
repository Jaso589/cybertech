import { useState } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import styles from "@/styles/Admin.module.css";

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users', {
        name,
        email,
        password,
        role
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="role">Role:</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>     
    </Layout>
  );
};

export default SignIn;