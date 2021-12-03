import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CheckoutContext } from '../contexts/Checkout'

const Box = styled.div`
  width: 30%;
  border: 1px solid #aaa;
  border-radius: 5px;
  margin-bottom: 20px;
`

const ProductContainer = styled.div`
  padding: 15px;
`

const Image = styled.div`
  width: 100%;
  height: 250px;
  background: url('${props => props.background}');
  background-size: cover;
  background-position: center;
`

const Product = ({ product }) => {
  const { addToCheckout } = useContext(CheckoutContext)
  
  return (
    <Box>
      <ProductContainer>
        <Image background={product.node.images.edges[0].node.src} />
        <h2>{product.node.title}</h2>
        <p>{product.node.description}</p>
        <h3>Price: {product.node.priceRange.maxVariantPrice.amount}$</h3>
        <Link to={`/products/${product.node.id}`}>
          <p>Voir le détail</p>
        </Link>
        <button onClick={() => addToCheckout(product)}>Ajouter au panier</button>
      </ProductContainer>
    </Box>
  );
};

export default Product