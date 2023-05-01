import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const style = {
  fontWeight: 600,
  color: "black"
  // background:'#F7A607',
}

export const ActiveLink = ({text, href}) => {

  const { asPath } = useRouter();
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if(typeof href == typeof []){setMyData(href);}
    // console.log(myData)
  }, []);
  
  
  return (
    <Link key={href} href={href} style={asPath === href ? style : null}>
    {
      typeof href !== typeof []
      ? text
      : null
    }

    </Link>
  )
}




