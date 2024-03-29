import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getError } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const HomeCategories = () => {
  
    const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data }= await axios.get(`/api/products/categories`);
        console.log(data);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []); 
     const navigate=useNavigate()




    
      useEffect(() => {
        // Sélectionnez le conteneur et le contenu
        const container = document.querySelector('.horizontal-scroll-container');
        const content = document.querySelector('.content');
    
        // Définissez la vitesse de défilement (en pixels par seconde)
        const scrollSpeed = 50;
    
        // Fonction pour faire défiler horizontalement
        const scrollHorizontally = () => {
          if (container.scrollLeft < content.scrollWidth - container.clientWidth) {
            container.scrollLeft += 1;
          } else {
            container.scrollLeft = 0; // Revenez au début une fois à la fin
          }
        };
    
        // Démarrez le défilement automatique
        const scrollInterval = setInterval(scrollHorizontally, 1000 / scrollSpeed);
    
        // Arrêtez le défilement automatique lorsque le composant est démonté
        return () => {
          clearInterval(scrollInterval);
        };
      }, []);



      
 
  return (
    <div style={{marginTop:'200px',display:'flex',justifyContent:'center',flexWrap:'wrap', gap:'20px'}}>
        {categories.map((category) => (
          <Link className='lien' style={{textDecoration:'none'}} to={{pathname:"/search", search: `category=${category.name}`}}>
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={category.url} />
              
              <Card.Body>
                <Card.Title style={{display:'flex',justifyContent:'center'}}>{category.name}</Card.Title>
              </Card.Body>
            </Card> 
            </Link>
          )
        )}

               <div className="horizontal-scroll-container">
                <div className="content">
                <img style={{width:'400px'}} src='poissonbleue.png'></img>
            <img style={{width:'400px'}} src='fruitdemer.png'></img>
            <img style={{width:'400px'}} src='poissiontranche.png'></img>
            <img style={{width:'400px'}} src='poissonblanc.png'></img>
                </div>
           
                </div>  
    </div>
  )
}

export default HomeCategories
