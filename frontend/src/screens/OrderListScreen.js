import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'delivred_request':
      return { ...state, loadingdelivred: true, successdelivred: false };
    case 'delivred_success':
      return { ...state, loadingdelivred: false, successdelivred: true };

    case 'delivred_fail':
      return { ...state, loadingdelivred: false}  
    
    default:
      return state;
  }
};
export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, loadingDelete, successDelete,loadingdelivred,successdelivred }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const HandleDeliver= async (order) =>{
    try {
      dispatch({ type: 'delivred_request' });
        await axios.put(`/api/orders/${order._id}/deliver`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('LIVRER');
        dispatch({ type: 'delivred_success' });
        setTimeout(()=>{
          window.location.reload()},1500)
    } catch (error) {
      toast.error(getError(error));
      dispatch({
        type: 'delivred_fail',
      });
    }
  }

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  
  return (
    <div style={{marginTop:'100px'}}>
      <Helmet>
        <title>Commandes</title>
      </Helmet>
      <h1>Commandes</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              
              <th>DATE</th>
              <th>TOTAL</th>
           
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                
                <td>{order.createdAt.substring(0, 19)}</td>
                
                <td>{order.totalPrice.toFixed(2)}</td>
                

             
                <td style={{display:'flex'}}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(order)}
                  >
                    Supprimer
                  </Button>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => HandleDeliver(order)}
                  >
    
                    Delivrer
                  </Button>
                  {order.isDelivered?`✔ ${order.deliveredAt.substring(0, 19)}`:'❌'}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
