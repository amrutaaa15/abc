import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

function Slots(props) {
  const [slotData, setSlotData] = useState([]);
  const [id, setId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [slotNumber, setSlotNumber] = useState()
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
    //                   slots[index - 1].color = "red";
    //                 }
    //               })
    //             }
    //             else{
    //               console.log("no")
    //               slots.forEach(function (arrayItem, index) {
    //                slots[index].color="green"
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
    if (count > 1) {
      setTimeout(() => {
        dispatch({ type: "EmptySlot", payload: "green", index: i })
      }, 100);
    }

  }


  return <div>
    <h1>Slots</h1>
    <Container fluid>
      <Row xs={6}>
        {sessionStorage.getItem("slots") != undefined &&
          slotData.map((e, i) =>
            <Col key={i} className="slots mx-3 mb-3" onClick={() => (selectSlot(i))} style={{ backgroundColor: slotData[i].color }}>Slot {i + 1}</Col>
          )}
      </Row>
      <Button variant="warning" ><Link to="/payment" state= {{location:props.location ,date:props.date ,fromTime:props.fromTime,toTime:props.toTime, vehicle:props.vehicle, id:id, bookings:slotNumber}}>Confirm this Slot</Link></Button>
    </Container>
  </div>;
}

export default Slots;
