import React, { useEffect, useState } from 'react'
import { ActiveLink } from './ActiveLink'
import Styles from '@/styles/NavAdmin.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faMailBulk, faMailForward } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookF, faLinkedin, faMailchimp, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { getAccessToken, removeAccessToken } from '@/utils/accessToken'
import { ActiveLinkAdmin } from './ActiveLinkAdmin'
import { useRouter } from 'next/router'

const navLinks = [
    {
        page:'Inicio',
        href:'/'
    },
    {
        page:'Productos',
        href:'/admin/dashboard'
    },
    {
      page:'Categorias',
      href:'/admin/categories'
    }
]

export const NavAdmin = () => {
  const [categories, setCategories] = useState([]);
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
 
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  const [btnMenu, setbtnMenu] = useState(false)
  const handleMenu = () =>{
    setbtnMenu(() => !btnMenu)
  }
  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.aside_header}>
            <div className={Styles.img_admin}>
                <Image
                src={'/images/profile_default.png'}
                fill
                alt='profile_admin'
                />
            </div>
            <p>Admin</p>
        </div>
        <div className={Styles.nav_header}>
          <div className={Styles.container}>
            
            <nav className={btnMenu ? Styles.navbar_active : Styles.navbar_hide}>
              <div className={Styles.nav}>
                <div className={Styles.brand}>
                <p>Sampler Company</p>
                </div>
                {
                  navLinks.map(({href, page})=>(
                    typeof href !== typeof []
                    ? <ActiveLinkAdmin href={href} text={page} key={page}/>
                    :<li class="dropdown" key={page}>
                        <a href="#">
                          {page}
                          <svg class="icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"/></svg>
                        </a>
                        <ul class="dropdown-nav">
                          <li>{href[0]}</li>
                          <li>{href[1]}</li>
                          <li>{href[2]}</li>
                        </ul>
                      </li>
                  ))
                }
                <div className={Styles.btn_logout}>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              </div>
            </nav>
           
            <button className={Styles.btn_menu} onClick={handleMenu}><FontAwesomeIcon icon={faBars}/></button>
          </div>
        </div>

      </header>
    </>
  )
}