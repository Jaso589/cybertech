import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Layout } from '@/components/Layout'
import Slider from '@/components/Slider'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })
const images = [
  {
    src: "/images/slide_1.jpg",
    alt: "Kitten 1",
    title:"Descubre la última tecnología en nuestra tienda en línea, con los productos más innovadores y vanguardistas del mercado."
  },
  {
    src: "/images/slide_2.jpg",
    alt: "Kitten 2",
    title: "Haz que la tecnología trabaje para ti con nuestros productos de calidad premium, diseñados para facilitar tu vida cotidiana."
  },
  {
    src: "/images/slide_3.jpg",
    alt: "Kitten 3",
    title: "Encuentra el dispositivo tecnológico perfecto para ti en nuestro sitio web, con una amplia selección de productos y precios competitivos."
  },
];

export default function Home({categories}) {
  return (
    <>
      <Layout>
        <section className={styles.home}>
          <div className={styles.home_content}>
            
            <div className='container_slide'>
              <Slider slides={images}/>
            </div>
          </div>
        </section>
        <div className={styles.category_container}>
          <div className='container'>
            <h1>Categorías</h1>
            <ul className={styles.list_category}>
              {categories.map(category => (
                <li key={category._id} className={styles.list}>
                  <Link href={`/categories/${category.name}`}>
                    <div className={styles.img_category}>
                      <Image
                        src={category.imageURL}
                        fill
                        alt={category.name}
                      />
                    </div>
                    <div className={styles.btn_category}>
                      <p>{category.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
     
    </>
  )
}

export async function getServerSideProps() {
  // Hacer una solicitud HTTP GET a la API REST para obtener las categorías
  const res = await axios.get(`${process.env.API_URL}api/categories`);

  // Extraer los datos de la respuesta de la API
  const categories = res.data;

  // Devolver los datos como props para el componente
  return {
    props: {
      categories
    }
  };
}