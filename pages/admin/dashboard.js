import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Product from '@/models/Product';
import { dbConnect } from '@/utils/dbConnect';
import { getAccessToken, removeAccessToken } from "@/utils/accessToken";
import Category from '@/models/Category';
import { LayoutAdmin } from '@/components/LayoutAdmin';
import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image';




const Dashboard = ({ products: initialProducts, categories: initialCategories }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    image: null,
    stock: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, categoryName, image, stock } = formData;
  
    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", image);
    formDataCloudinary.append("upload_preset", "my_upload_js");
  
    try {
      const resCloudinary = await axios.post(
        `https://api.cloudinary.com/v1_1/drwz7mk4a/image/upload`,
        formDataCloudinary
      );
  
      const { data } = await axios.post("/api/products", {
        name,
        description,
        price,
        categoryName,
        image: resCloudinary.data.public_id,
        imageURL: resCloudinary.data.secure_url,
        stock,
      });
  
      setSuccessMessage("Product added successfully!");
      setProducts([...products, data]);
      setFormData({
        name: "",
        description: "",
        price: "",
        categoryName: "",
        image: null,
        stock: "",
      });
      document.getElementById("categoryName").selectedIndex = 0;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/products?id=${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      // router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (productId) => {
    router.push(`/admin/${productId}`);
  };
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  //category filter
  function generateProductTable(products, handleDelete) {
   
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.categoryName}</td>
              <td>
                <div className={styles.img_product}>
                  <Image src={product.imageURL} fill alt={product.name} />
                </div>
              </td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.btn_table} onClick={() => handleEdit(product._id)}>Edit</button>
                  <button className={styles.btn_table} onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProducts();
  }, [router]);

  // Filtrar los productos por categoría
  function filterProducts(selectedCategory) {
    if (selectedCategory === 'all') {
      // Si se selecciona "All categories", mostrar todos los productos
      return productos;
    } else {
      // De lo contrario, mostrar solo los productos de la categoría seleccionada
      return productos.filter(product => product.categoryName === selectedCategory);
    }
  }

  // Manejar el evento de cambio en el selector de categorías
  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;
    const filteredProducts = filterProducts(selectedCategory);
    setProducts(filteredProducts);
    console.log(products)
  }

  return (
    <LayoutAdmin>
      <div className={styles.dashboard_container}>
        <h1>Aqui puedes agregar nuevos productos</h1>
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
                <label htmlFor="price">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="categoryName">Category Name</label>
                  <select id="categoryName" name="categoryName" onChange={handleInputChange} required>
                  <option  defaultValue={"Elige una categoria"}>Elige una categoria</option>
                    {
                      categories.map((category)=>(
                        <option key={category.description} value={`${category.name}`}>{category.name}</option>  
                      ))
                    }
                  </select>
                
                {/* <input type="text" name="categoryName" value={formData.categoryName} onChange={handleInputChange} required /> */}
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input type="file" name="image" onChange={handleImageChange} required />
              </div>
              <div>
                <label htmlFor="stock">Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
                <div>
                <button type="submit">Add Product</button>
                </div>
              </div>
            </form>
            <section>
              <h2>Products</h2>
              <label htmlFor="category-select">Filter by category:</label>
              <select name="category-select" id="category-select" onChange={handleCategoryChange}>
                <option value={'all'}>All categories</option>
                  {
                    categories.map((category)=>(
                      <option key={category.name} value={`${category.name}`}>{category.name}</option>  
                    ))
                  }
              </select>
            </section>      
            <div id='product-table'>
            {generateProductTable(products, handleDelete)}
            </div>
          </div>
    </LayoutAdmin>
    
  )
}

export async function getServerSideProps() {
  dbConnect();

  const products = await Product.find({});
  const categories = await Category.find({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories))
    }
  };
}

export default Dashboard;