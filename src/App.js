import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { CheckoutProvider } from './contexts/Checkout'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Nav from './components/Nav'

const client = new ApolloClient({
  uri: 'https://konexioshop.myshopify.com/api/2021-10/graphql.json',
  headers: {
    'X-Shopify-Storefront-Access-Token': 'd2ba085250ad6bf97c3dbc7ccd0ebdf2'
  },
  cache: new InMemoryCache()
});

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 50px 0px;
`

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CheckoutProvider client={client}>
        <BrowserRouter>
          <Nav />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              {/*
              <Route path="/collections" element={<Collection />} />
              <Route path="/collections/:id" element={<Collection />} />
              <Route path="/panier" element={<Panier />} />
              */}
            </Routes>
          </Container>
        </BrowserRouter>
      </CheckoutProvider>
    </ApolloProvider>
  )
}

export default App