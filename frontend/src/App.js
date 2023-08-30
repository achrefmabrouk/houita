import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

import Button from 'react-bootstrap/Button';

import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { getError } from './utils';
import axios from 'axios';

import ProfileScreen from './screens/ProfileScreen';


import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

import UserEditScreen from './screens/UserEditScreen';


import Modal from 'react-bootstrap/Modal';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/admin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []); 

  window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 0) {
      header.classList.add('fixed');
    } 
  });
  

  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(false);
    }, 10000); 

    return () => {
      clearTimeout(popupTimer);
    };
  }, []);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
        {showPopup && (
        <h3 style={{textAlign:'center'}}>Fraîcheur et qualité sont nos devises !</h3> )}
        <div 
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        > 
            
          <Nav className="flex-column text-white w-100 p-2 " style={{marginTop:'50px'}}>
            <Nav.Item style={{color:'black', marginTop:'30px'}}>
              <strong ><h1 style={{color:'black',backgroundColor:'white'}}>Categories</h1></strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category} >
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link >{category}</Nav.Link>
                  
                </LinkContainer>
                
              </Nav.Item>
              
            ))}
             <Nav.Item style={{color:'black', marginTop:'30px'}}>
             <div>
       <Button variant="primary" onClick={handleShow}>
        QUI SOMMES NOUS ?
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>QUI SOMMES NOUS ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Nous sommes un site de vente  en ligne  des produits de Mer frais  🐟🎣 . <br></br>

Nous mettons à votre service une équipe de professionnels forte de plus que 20 ans d’expérience pouvant répondre à toute vos exigences .<br></br>

Avec nos sauvages journaliers de poissons , crustacés , coquillages et fruits de mer nous pouvons vous proposer une grande diversité de produits .
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
            </Nav.Item>
            
          </Nav>
        </div>
        {userInfo && userInfo.isAdmin ?(
          <Navbar bg="primary" variant="dark" expand="lg" position='fixed-top' >
            <Container>
          <LinkContainer to="/">
                <Navbar.Brand> HOUITA  | حويته </Navbar.Brand>
              </LinkContainer>
             
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              
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
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                     
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                    
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Produits</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Commandes</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Utilisateur</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ):(<Navbar bg="primary" variant="dark" expand="lg" position='fixed-top'>
          
        <Container>
        
        
<LinkContainer to="/">
            <Navbar.Brand>
              <div style={{display:'flex',justifyContent:'space-between'}}> 
              <Button style={{display:'flex',justifyContent:'flex-start', backgroundColor:'#0D6EFD', borderColor:'#0D6EFD'}}
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              {/* HOUITA  | حويته  */}
              
              <img style={{width:'30%'}} src='houita_logo.png'alt='logo'></img>
              
               
                  
                   
              </div>
            </Navbar.Brand>
          </LinkContainer> 

          
              </Container>
              <div style={{textAlign:'end'}}>
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
                  </div>
          </Navbar>
          
          )}
        
        </header>
      
        <main class="main-content">
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/admin" element={<SigninScreen />} />
              

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
  
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
          
      
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
            
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;