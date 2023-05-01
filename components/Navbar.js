import React, { useEffect, useState } from 'react'
import { ActiveLink } from './ActiveLink'
import Styles from '@/styles/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faEnvelope, faMailBulk, faMailForward } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookF, faLinkedin, faMailchimp, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { getCart } from '@/utils/storageNext'
import { addItemToCart } from '@/utils/cartStorage'
import SearchBar from './SearchProduct'

export const navLinks = [
    {
        page:'Inicio',
        href:'/'
    },
    {
        page:'Nosotros',
        href:'/about'
    },
    // {
    //   page:'Products',
    //   href:'/products'
    // },
    // {
    //   page:'Certificaciones',
    //   href:'/certifications'
    // },
    {
        page:'Contacto',
        href:'/contact'
    }
]

const fixed = {
  position:'fixed',
  width: '100vw'
}
const heightNull = {
  height: 0
}

export const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [navbar, setNavbar] = useState(false);

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const cartItems = getCart();
    setCartItemsCount(cartItems.length);
  }, [getCart()]);
  
  const changedBg = () =>{
    // console.log(window.scrollY)

    if(window.scrollY >= 170){
      setNavbar(true)
    }else{
      setNavbar(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changedBg)
  }, [])
 
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
        <div style={navbar ? heightNull : null} className={Styles.aside_header}>
          <div className='container'>
            <div className={Styles.aside_container}>
              <p><FontAwesomeIcon width={20} icon={faEnvelope}/>ventas@example.com</p>
              <div className={Styles.aside_links}>
                <a>
                  <FontAwesomeIcon width={20} height={20} icon={faFacebookF}/> Facebook
                </a>
                <a>
                  <FontAwesomeIcon width={20} icon={faWhatsapp}/> Facebook
                </a>
                <a>
                  <FontAwesomeIcon height={20} icon={faYoutube}/> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={navbar ? fixed : null} className={Styles.nav_header}>
          <div className={Styles.container}>
            <div className={Styles.brand}>
              <p>Sampler Company</p>
            </div>
            <nav className={btnMenu ? Styles.navbar_active : Styles.navbar_hide}>
              <div className={Styles.nav}>
                {
                  navLinks.map(({href, page})=>(
                    typeof href !== typeof []
                    ? <ActiveLink href={href} text={page} key={page}/>
                    :<li className="dropdown" key={page}>
                        <a href="#">
                          {page}
                          <svg className="icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"/></svg>
                        </a>
                        <ul className="dropdown-nav">
                          <li>{href[0]}</li>
                          <li>{href[1]}</li>
                          <li>{href[2]}</li>
                        </ul>
                      </li>
                  ))
                }
              </div>
              <div className={Styles.socials_header}>
              <a href=''>
                <FontAwesomeIcon style={{height:'35px'}} icon={faFacebook}/>
              </a>
              <a href=''>
                <FontAwesomeIcon style={{height:'35px'}} icon={faYoutube}/>
              </a>
              <a href=''>
                <FontAwesomeIcon style={{height:'35px'}} icon={faLinkedin}/>
              </a>
              </div>
            </nav>
            <div className={Styles.log_cart}>
              <div className={Styles.cart_icon}>
                <Link href={'/cart'}>
                <span>{cartItemsCount}</span>
                  <FontAwesomeIcon width={20} height={20} icon={faCartShopping}/>
                </Link>
              </div>
              <div className={Styles.btn_login}>
                <Link href='/admin'><FontAwesomeIcon width={20} height={20} icon={faUser}/> <span>Ingresar</span> </Link>
              </div>
            </div>
            <button className={Styles.btn_menu} onClick={handleMenu}><FontAwesomeIcon icon={faBars}/></button>
          </div>
        </div>
        <div style={navbar ? heightNull : null} className={Styles.search_header}>
          <div className='container'>
            <div className={Styles.nav_filter}>
              <li className="dropdown">
                
                <FontAwesomeIcon icon={faBars} height={20} width={20}/>
                <p>
                  Categorías
                    <svg className="icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"/></svg>
                </p>
                <ul className="dropdown-nav">
                  {categories.map(category => (
                    <li key={category._id}>
                      <Link href={`/categories/${category.name}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <SearchBar/>
            </div>
          </div>
         
        </div>
      </header>
    </>
  )
}