import { Layout } from '@/components/Layout'
import Image from 'next/image'
import React from 'react'
import styles from '@/styles/About.module.css'

const about = () => {
  return (
    <Layout>
      <div className={styles.about_container_1}>
        <div className='container'>
          <div className={styles.about_1}>
            <div className={styles.texts}>
              <h1>Nosotros</h1>
              <p>¡Bienvenidos a nuestra tienda en línea de productos tecnológicos! Somos un equipo de apasionados por la tecnología, dedicados a ofrecer la mejor selección de productos de alta calidad a precios competitivos.</p>
            </div>
            <div className={styles.img_about}>
              <Image
              src={'/images/about1_bg.jpg'}
              fill
              alt='about_img_1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.valores_container}>
        <div className='container'>
          <div className={styles.valores}>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_1'
              />
              <h4>Responsabilidad</h4>
            </div>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_2'
              />
              <h4>Responsabilidad</h4>
            </div>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_3'
              />
              <h4>Responsabilidad</h4>
            </div>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_4'
              />
              <h4>Responsabilidad</h4>
            </div>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_5'
              />
              <h4>Responsabilidad</h4>
            </div>
            <div className={styles.valor}>
              <Image
              src={'/pngs/puntualidad.png'}
              width={100}
              height={100}
              alt='icon_6'
              />
              <h4>Responsabilidad</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default about