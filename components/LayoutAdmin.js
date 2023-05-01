import Head from 'next/head'
import React from 'react'
import { Navbar } from './Navbar'
import { NavAdmin } from './NavAdmin'

export const LayoutAdmin = ({children}) => {
    return (
        <>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className='main_admin'>
          <NavAdmin/>
          <main className='main_content'>
            {children}
          </main>
          </div>
        </>
      )
}