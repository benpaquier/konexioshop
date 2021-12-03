import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"

const GET_PRODUCTS = gql`
  query GetProducts($id: ID) {
    product(id: $id) {
      title
      description
      images(first: 10) {
        edges {
          node {
            src
          }
        }
      }
    }
  }
`

const Product = () => {
  const { id } = useParams()

  const { loading, data, errors } = useQuery(GET_PRODUCTS, {
    variables: {
      id
    }
  })

  if (loading) {
    return (
      <p>Chargement...</p>
    )
  }

  return (
    <div>
      <button>Ajouter au panier</button>
      <br />
      <img src={data.product.images.edges[0].node.src} />
      <h1>{data.product.title}</h1>
      <p>{data.product.description}</p>
    </div>
  )
}

export default Product