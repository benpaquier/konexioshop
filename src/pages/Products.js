import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from "@apollo/client"

import Product from '../components/Product'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`


const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          images(first: 10) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

const Products = () => {
  const { loading, data } = useQuery(GET_PRODUCTS)

  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <Container>
      {data.products.edges.map(product => (
        <Product product={product} />
      ))}
    </Container>
  )
}

export default Products