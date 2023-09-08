import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SearchBox from './SearchBox';
import Badge from 'react-bootstrap/esm/Badge';
import { Link } from 'react-router-dom';
import { Store } from '../Store'

const NavBar = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  return (
    <div style={{marginTop:'150px'}}>
       <Navbar expand="lg" className="bg-body-tertiary " style={{backgroundColor:'#0D6EFD'}}>
      <Container style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{width:'50%',height:'50%'}}>
        <Navbar.Brand href="/">
            
            <img style={{width:'60%'}} src='houita_logo.png'alt='logo'></img>
            
             </Navbar.Brand>
             </div>
            
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"><SearchBox/></Nav.Link>
            <Nav.Link href="#link">
            <Navbar.Toggle aria-controls="basic-navbar-nav"> 
          <Link to="/cart" className="nav-link">
              &#128722;
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Navbar.Toggle> 
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto  w-100  justify-content-end">
            <Link to="/cart" className="nav-link">
                  &#128722;
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
              </Nav>
              </Navbar.Collapse>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
