import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
////

const updateCartHandler = async (item, quantity) => {
  const { data } = await axios.get(`/api/products/${item._id}`);
  if (data.countInStock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
  ctxDispatch({
    type: 'CART_ADD_ITEM',
    payload: { ...item, quantity },
  });
};
  return (
 <div  style={{display:'flex',justifyContent:'center',flexWrap:'wrap', gap:'20px'}} >
    <Card style={{ width: '18rem' }} >
      <Link to={`/product/${product.slug}`}>
      <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={product.image} />
        {/* <img  src={product.image} className="card-img-top" alt={product.name} /> */}
      </Link>
      <Card.Body style={{textAlign:'center'}} >
        <Link style={{textDecoration:'none'}} to={`/product/${product.slug}`}>
          <Card.Title ><h2>{product.name}</h2></Card.Title>
        </Link>
        {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
        <Card.Text><h3>{product.price.toFixed(3)} </h3></Card.Text>
        
          <Card.Text>{product?.description}</Card.Text>
        
        {(product.disponible===false)? (
          <Button variant="light" disabled>
            N'EST PAS DISPONIBLE
          </Button>
        ) : (
           <Button variant="primary" bg='primary' onClick={() => addToCartHandler(product)}>
            Ajouter au panier
           </Button> 
           
        ) 
  
        }
      </Card.Body>
    </Card>
    </div>
    
  );
}
export default Product;
