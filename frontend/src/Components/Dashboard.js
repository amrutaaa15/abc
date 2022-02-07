import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { dash } from '../API/apiCalls';
import Navbars from './Navbars';
import '../CSS/navdash.css'
import { Button, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'

function Dashboard() {
  const [data, setData] = useState('')
  useEffect(() => {
    dash().then((res) => {
      console.log(res.data)
    })
    if (localStorage.getItem("_token")) {
      let token = localStorage.getItem('_token');
      let decode = jwtDecode(token);
      setData(decode.photo)
    }
  }, []);

  return <div>
    <Navbars/>
    <div className='mainImage'>
   <h1 className='text-white'>Welcome to Parking Stars</h1>
   <Card className="mx-auto mt-5"style={{ width: '25rem',background:"none" }}>
  <Card.Body>
    <Card.Subtitle className="mb-4 text-white display-4 fw-bold">Book a Slot</Card.Subtitle>
    <Card.Text className='text-white fw-bold h5 mb-5'>
    We know you face issues everyday while parking so book your parking slot earlier and be free !
    </Card.Text>
    <Link to="/book"><Button variant='warning' className="fw-bold">Book a Slot</Button></Link>
    <p className='text-white h5 mt-3'>Fill the form and get your booking ready!</p>
  </Card.Body>
</Card>
    </div>
    
  </div>;
}

export default Dashboard;
