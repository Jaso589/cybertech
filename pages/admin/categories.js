import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Category from '@/models/Category';
import { dbConnect } from '@/utils/dbConnect';
import { getAccessToken, removeAccessToken } from "@/utils/accessToken";
import Link from 'next/link';
import { LayoutAdmin } from '@/components/LayoutAdmin';
import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image';

const Categoria = ({ categories: initialCategories }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState(initialCategories );

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.push("/admin");
    }
  }, []);
  const handleLogout = () => {
    removeAccessToken();
    router.push("/admin");
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, image } = formData;

    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", image);
    formDataCloudinary.append("upload_preset", "my_upload_js");

    try {
      const resCloudinary = await axios.post(
        "https://api.cloudinary.com/v1_1/drwz7mk4a/image/upload",
        formDataCloudinary
      );

      const { data } = await axios.post("/api/categories", {
        name,
        description,
        image: resCloudinary.data.public_id,
        imageURL: resCloudinary.data.secure_url
      });

      setSuccessMessage("category added successfully!");
      setCategories([...categories, data]);
      setFormData({
        name: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(`/api/categories?id=${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId));
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (categoryId) => {
    router.push(`/admin/categories/${categoryId}`);
  };
  return (
    <LayoutAdmin>
      <div className={styles.dashboard_container}>
        <h1>Aqui puedes agregar o eliminar nuevas categorias</h1>
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" onChange={handleImageChange} required />
          </div>
          <div>
            <div>
            <button type="submit">Add category</button>
            </div>
          </div>
        </form>
        {/* <button onClick={handleLogout}>Cerrar sesión</button>
        <button><Link href={'/admin/dashboard'}>Regresar al dashboard</Link></button> */}
        <section>
          <h2>categories</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div className={styles.img_product}>
                      <Image
                      src={category.imageURL} fill alt={category.name} 
                      />
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btn_table} onClick={() => handleEdit(category._id)}>Edit</button>
                      <button className={styles.btn_table} onClick={() => handleDelete(category._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </LayoutAdmin>
    
  )
}

export async function getServerSideProps() {
  dbConnect();

  const categories = await Category.find({});

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  };
}

export default Categoria;