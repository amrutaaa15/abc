import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Slots(props) {
  const [slotData, setSlotData] = useState([]);
  const [id, setId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [slotNumber, setSlotNumber] = useState()
  const [btn, setBtn] = useState(0)
  const color = useSelector((state) => state.changeColor);
  // console.log(color)
  const dispatch = useDispatch()
  let ha = JSON.parse(sessionStorage.getItem("slots"))
  useEffect(() => {
    setSlotData(props.slotData)
    // getSlots().then((res) => {
    //   if (sessionStorage.getItem("slots")) {
    //     let slots = JSON.parse(sessionStorage.getItem("slots"))
    //     for (let i = 0; i < res.data.length; i++) {
    //       if (res.data[i].locationName == props.location) {
    //         console.log("hey")
    //         for (let j = 0; j < res.data[i].bookedSlots.length; j++) {
    //           let dbDate = new Date(res.data[i].bookedSlots[j].date).getDate();
    //           let myDate = new Date(props.date).getDate();
    //           console.log(myDate,dbDate)
    //           if (myDate == dbDate) {
    //             console.log("date same")
    //             let dbTime = new Date(new Date().toDateString() + ' ' + res.data[i].bookedSlots[j].fromTime).getHours()
    //             let myTime = new Date(new Date().toDateString() + ' ' + props.fromTime).getHours()
    //             if (dbTime == myTime)  {
    //               console.log("yes")
    //               arr.push(res.data[i].bookedSlots[j].slots)
    //               slots.forEach(function (arrayItem, index) {
    //                 if (arr.includes(index)) {
    //                   slots[index - 1].color = "#FF3131";
    //                 }
    //               })
    //             }
    //             else{
    //               console.log("no")
    //               slots.forEach(function (arrayItem, index) {
    //                slots[index].color="#22DD22"
    //                setSlotData(slots)
    //               })
    //             }
    //           }

    //         }
    //       }
    //     }
    //     // console.log(slots)
    //     sessionStorage.setItem("slots", JSON.stringify(slots))
    //     setSlotData(slots)
    //   }
    // })
    console.log(props.slotData)

    let token = localStorage.getItem('_token');
    let decode = jwt_decode(token);
    setId(decode.id)
  }, [props.slotData]);

  const selectSlot = (i) => {
    setSlotNumber(i + 1)
    dispatch({ type: "SelectSlot", payload: "yellow", index: i })
    let slots = JSON.parse(sessionStorage.getItem("slots"));
    let count = 0;
    slots.forEach(function (arrayItem, i) {
      if (slots[i].color == "yellow") {
        count++
      }
    });
    if (count >= 1) {
      setBtn(1)
      setTimeout(() => {
        dispatch({ type: "EmptySlot", payload: "#22DD22", index: i })
      }, 100);
    }
    
  }

const cancelSlot=()=>{
  setBtn(0);
  dispatch({type:"cancelSlot",index:slotNumber-1})
}
  return <div>
    <h1>Slots</h1>
    <Row style={{width:"50%"}} className="mx-auto mb-3 mt-3">
    <Col className='slots mx-3' style={{backgroundColor:"#22DD22"}}>Available Slots</Col>
      <Col className='slots mx-3'  style={{backgroundColor:"#FF3131"}}>Occupied Slots</Col>
      <Col className='slots mx-3' style={{backgroundColor:"yellow"}}>Selected Slot</Col>
      { btn == 1 && 
        <Row>
          <Col>
       <Button variant="info"className="mt-3 py-3" ><Link to="/payment" className='text-decoration-none text-black h4' state={{ location: props.location, date: props.date, fromTime: props.fromTime, toTime: props.toTime, vehicle: props.vehicle, id: id, bookings: slotNumber }}>Confirm the slot</Link></Button>
        </Col>

        <Col><Button variant="info" className="mt-3 py-3 fw-bold " style={{fontSize:"21px"}} onClick={cancelSlot}>Cancel Selected Slot</Button></Col>
        </Row>
      }
    </Row>
    <Container fluid>
      <Row xs={6}>
        {sessionStorage.getItem("slots") != undefined &&
          slotData.map((e, i) =>
            <Col key={i} className="slots mx-3 mb-3" onClick={() => (selectSlot(i))} style={{ backgroundColor: slotData[i].color }}>Slot {i + 1}</Col>
          )}
      </Row>
     

    </Container>
  </div>;
}

export default Slots;
