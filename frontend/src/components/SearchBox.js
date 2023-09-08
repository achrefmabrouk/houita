import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <div >
{/*     <Form  className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup >
        <FormControl 
          
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher les produits..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button   type="submit" id="button-search">
          <i  className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form> */}
     <Form className="d-flex" onSubmit={submitHandler}>
                  <Form.Control
                    type="search"
                    placeholder="Chercher les produits..."
                    className="me-2"
                    aria-label="Search"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit" id="button-search"><i  className="fas fa-search"></i></Button>
                </Form>
    </div>
  );
}
