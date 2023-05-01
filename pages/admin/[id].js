import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '@/models/Product';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAccessToken, removeAccessToken } from '@/utils/accessToken';
import { LayoutAdmin } from '@/components/LayoutAdmin';
import styles from "@/styles/Admin.module.css"
import Category from '@/models/Category';

export default function AdminProductEdit({ product: initialProducts, categories: initialCategories}) {
  const [form, setForm] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories)
  const [image, setImage] = useState(null);
  const router = useRouter();

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let imageUrl = form.image;
    if (image) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", image);
      formDataCloudinary.append("upload_preset", "my_upload_js");
      const resCloudinary = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.MONGODB_URI}/image/upload`,
        formDataCloudinary
      );
      imageUrl = resCloudinary.data.secure_url;
    }
    let updatedForm = {...form, image: imageUrl};
    const formData = new FormData();
    formData.append('data', JSON.stringify(updatedForm));
    const res = await axios.put(`/api/products?id=${product._id}`, form, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/products?id=${product._id}`);
      console.log(res.data);
      router.push(`/admin/dashboard`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutAdmin>
      <div className={styles.page_product}>
        <h1>Edit product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={form.price} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="categoryName">Category Name</label>
              <select name="categoryName" onChange={handleChange} required>
                  {
                    categories.map((category)=>(
                        <option key={category.name} value={`${category.name}`}>{category.name}</option>
                    ))
                  }
              </select>
          </div>
          <div>
            <label htmlFor="categoryName">stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />
          </div> */}
          <button type="submit">Update</button>
        </form>
        <button onClick={handleDelete} className={styles.btn_delete}>Delete</button>
        <br />
      </div>
    </LayoutAdmin>
    
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const product = await Product.findById(id);
  const categories = await Category.find({});

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: JSON.parse(JSON.stringify(categories))
    },
  };
}