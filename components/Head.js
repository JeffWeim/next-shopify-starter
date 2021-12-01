import React from 'react'
import Head from 'next/head'

import GlobalStylesheet from './GlobalStylesheet'

const CustomHead = function() {
  return (
    <div className="Head">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css?family=Barlow:400,500,600,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/fav/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/fav/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/fav/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/fav/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <GlobalStylesheet />
    </div>
  )
}

export default CustomHead
