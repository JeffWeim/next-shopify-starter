// import Head from 'next/head'
// import Link from 'next/link'
// import { getPrismic, Predicates } from 'lib/prismic'
import React from 'react'
import styled from 'styled-components'

const HomePage = () => {
  return (
    <Section>
      <p>Homepage</p>
    </Section>
  )
}

const Section = styled.section`
  text-align: center;
`

// HomePage.getInitialProps = async ({ req }) => {
//   const api = await getPrismic(req)
//   const { results } = await api.query(
//     Predicates.at('document.type', 'blog_post'),
//     {
//       pageSize: 30,
//       orderings: '[my.blog_post.post_date desc]',
//     },
//   )
//   return { highlight: results[0] }
// }

export default HomePage
