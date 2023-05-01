import { Layout } from '@/components/Layout';
import axios from 'axios';
import styles from "@/styles/CategoryProducts.module.css"
import Link from 'next/link';
import Image from 'next/image';
import { dbConnect } from '@/utils/dbConnect';

const CategoryPage = ({ products, name }) => {
  // console.log(products)

  return (
    <Layout>
      <div className={styles.categoryp_container}>
        <div className='container'>
          <h1>Productos en la categoría : { products.length == 0 ? name : products[0].categoryName }</h1>
          {
            products.length != 0 
            ? null
            : <p>No hay productos</p>
          }
          <ul className={styles.categoryp_ul}>
            {products.map((product) => (
              <li key={product._id} >
                <div className={styles.list}>
                  <Link href={`/products/${product._id}`}>
                    <div className={styles.img}>
                      <Image
                        src={product.imageURL}
                        fill
                        alt={product.name} 
                      />
                    </div>
                    <div className={styles.data_text}>
                      <h2>{product.name}</h2>
                      <p>Precio: S/.{product.price}</p>
                    </div>
                  </Link>
                  <button><Link href={`/products/${product._id}`}  className={styles.btn_ver}>Ver más</Link></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
    
  );
};

export async function getServerSideProps(context) {
  dbConnect()
  const { name } = context.query;
  try {
    const response = await axios.get(`${process.env.API_URL}/api/categoryName?categoryName=${name}`);
    const products = response.data.data;
    return {
      props: { products, name },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { products: [] },
    };
  }
}

export default CategoryPage;