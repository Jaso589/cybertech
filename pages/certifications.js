import { Layout } from '@/components/Layout'
import React from 'react'
import styles from '@/styles/About.module.css'
import Image from 'next/image'

const certi = [
  {
    src: "/images/certification_default.png",
    alt: "certification1"
  },
  {
    src: "/images/certification_default.png",
    alt: "certification2"
  },
  {
    src: "/images/certification_default.png",
    alt: "certification3"
  },
  {
    src: "/images/certification_default.png",
    alt: "certification4"
  }
]

const certifications = () => {
  return (
    <Layout>
      <div className={styles.about_container_1}>
        <div className='container'>
          <div className={styles.img_bg}>
            {/* <Image/> */}
            <h1>Certificaciones</h1>
          </div>
          <div className={styles.certifications}>
            <h2>Certificaciones</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, accusamus quisquam. Sit totam nostrum consequuntur atque odit autem natus, quas
            </p>
            <div className={styles.content}>
              {
                certi.map(({src, alt}) => (
                  <div key={alt} className={styles.img_cert}>
                    <Image
                      src={src}
                      alt={alt}
                      fill
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default certifications