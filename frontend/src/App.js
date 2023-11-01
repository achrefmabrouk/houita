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
import HomeCategories from './screens/HomeCategories'
import Button from 'react-bootstrap/Button';

import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { getError } from './utils';
import axios from 'axios';

import Card from 'react-bootstrap/Card';

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
import NavBar from './components/NavBar';
import SearchBox from './components/SearchBox';
import { Helmet } from 'react-helmet';


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
        <Helmet>
       
        <meta name="description" content="Nous sommes un site de vente  en ligne  des produits de Mer frais.Nous mettons à votre service une équipe de professionnels forte de plus que 20 ans d’expérience pouvant répondre à toute vos exigences.
Avec nos sauvages journaliers de poissons , crustacés , coquillages et fruits de mer nous pouvons vous proposer une grande diversité de produits ." />
       <meta name="keywords" content="houita,poisson, ventre poisson en ligne"></meta>
      </Helmet>
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
            
          <Nav className="flex-column text-white w-100 p-2 "  style={{marginTop:'50px'}}>
            <Nav.Item style={{color:'black', marginTop:'30px'}}>
              <strong ><h1 style={{color:'black',backgroundColor:'white'}}>Categories</h1></strong>
            </Nav.Item>
             {categories.map((category) => (
              <Nav.Item key={category.name} >
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category.name}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link >{category.name}</Nav.Link>
                  
                </LinkContainer>
                
              </Nav.Item>
              
              
            ))} 
            <Nav.Link to='homescreen' >Tous les produits</Nav.Link>
{/*               <Nav.Item >
              
                  <Nav.Link as={Link} to="/HomeCategories" >POISSONS EN TRANCHE</Nav.Link>
                  <Nav.Link as={Link} to="/HomeCategories" >FRUITS DE MER</Nav.Link>
                  <Nav.Link as={Link} to="/HomeCategories" >POISSONS BLEUS</Nav.Link>
                  <Nav.Link as={Link} to="/HomeCategories" >POISSONS BLANCS</Nav.Link>
                  <Nav.Link as={Link} to="/homescreen" >Tous nos produits</Nav.Link>
                  
                  
               
                
              </Nav.Item> */}
             <Nav.Item style={{color:'black', marginTop:'30px'}}>
             
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
        
        
{/* <LinkContainer to="/"> */}
            <Navbar.Brand style={{ width: '100%' }}>
              <div style={{width: '100%', display:'flex',justifyContent:'space-between'}}> 
            

            
              <div className='SideBar'  style={{display:'flex',alignContent:'center'}}> 
              <Button style={{display:'flex',justifyContent:'flex-start', backgroundColor:'#0D6EFD', borderColor:'#0D6EFD'}}
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              
              {/* HOUITA  | حويته  */}
              <Link to="/homescreen">
              <img style={{height:'50px'}} src='houita_logo.png'alt='logo'></img>
              </Link>
              </div>
              
              
              <Navbar.Toggle aria-controls="basic-navbar-nav"> 
              
          {/* <Link to="/cart" className="nav-link"> */}
            <i class="fas fa-bars"></i>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              {/* </Link> */}
              
            </Navbar.Toggle> 
            
            <Navbar.Collapse id="basic-navbar-nav">
              
            <Nav className="me-auto  w-100  justify-content-end"><SearchBox />
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
                  
            </Navbar.Brand>
            
          {/* </LinkContainer> 
           */}
          
              </Container>
              
         
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
              <Route path="/homescreen" element={<HomeScreen />} />
              <Route path="/navbar" element={<NavBar/>} />
              
              

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
              <Route path="/" element={<HomeCategories/>} />
              
            </Routes>
          </Container>
        </main>
        <footer >
          <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
          <div>
          <Card style={{ width: '18rem',gap:'20px',marginTop:'10px',marginLeft:'10px' }}>
      
      <Card.Body>
        <Card.Title>QUI SOMMES NOUS ?</Card.Title>
        <Card.Text>
   
        Nous sommes un site de vente  en ligne  des produits de Mer frais  🐟🎣 . <br></br>

Nous mettons à votre service une équipe de professionnels forte de plus que 20 ans d’expérience pouvant répondre à toute vos exigences .<br></br>

Avec nos sauvages journaliers de poissons , crustacés , coquillages et fruits de mer nous pouvons vous proposer une grande diversité de produits .
<br/>

        </Card.Text>
       
      </Card.Body>
    </Card>
          </div>
          <div>
          <Card style={{ width: '18rem',gap:'15px',marginTop:'10px',marginLeft:'10px' }}>
      
      <Card.Body>
        <Card.Title>CONTACTEZ-NOUS</Card.Title>
        <Card.Text>
          <ul >
            <img src='phone_logo.png'></img>
            <p>+216 21660662 </p>
           <img src='mail_logo.png'></img>
           <p>houita.pro@gmail.com </p>
           <img src='facebook_logo.png'></img>
           <p>HOUITA  | حويته </p>
           <img src='insta_logo.png'></img>
           <p>HOUITA  | حويته </p>
          </ul>
        
       
        </Card.Text>
       
      </Card.Body>
    </Card>
          </div>
          <div>
          <Card style={{ width: '18rem',gap:'15px',marginTop:'10px',marginLeft:'10px' }}>
      
      <Card.Body>
        <Card.Title>
          <img src='livraison.png'></img>
          <p>LIVRAISON À DOMICILE (le jour même)</p>
        </Card.Title>
        <Card.Title>
          <img src='Qualite.png'></img>
          <p>QUALITÉ GARANTIE</p>
        </Card.Title>
        <Card.Title>
          <img src='Service.png'></img>
          <p>SERVICE CLIENT 6/7 (sauf les lundis)</p>
        </Card.Title>
       
       
      </Card.Body>
    </Card>
          </div>
          </div>
         
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;