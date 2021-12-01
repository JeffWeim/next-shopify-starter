import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const MainMenu = function() {
  return (
    <Nav>
      <Title>Menu</Title>
      <Items>
        <ListItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/store" as="/store">
            <a>Store</a>
          </Link>
        </ListItem>
      </Items>
    </Nav>
  )
}

const ListItem = styled.li`
  list-style: none;
  line-height: 2em;
  font-weight: 600;
  font-size: 1em;
`

const Items = styled.ul`
  padding: 0;
`

const Nav = styled.nav`
  padding: 0.5rem 1rem;
`

const Title = styled.h2`
  color: #000;
`

export default MainMenu
