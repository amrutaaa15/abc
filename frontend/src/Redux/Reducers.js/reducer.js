import { getSlots } from "../../API/apiCalls"

export const changeColor = (state = [{ color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }, { color: "green" }], action) => {
    // console.log(state)
    switch (action.type) {
        case "SelectSlot": if (sessionStorage.getItem("slots")) {
            let slots = JSON.parse(sessionStorage.getItem("slots"))
            if (slots[action.index].color != "red") {
                slots[action.index].color = action.payload
            }
            console.log(slots)
            sessionStorage.setItem("slots", JSON.stringify(slots))
            return slots
        }
        case "EmptySlot": if (sessionStorage.getItem("slots")) {
            let slots = JSON.parse(sessionStorage.getItem("slots"))

            slots.forEach(function (arrayItem, i) {
                if (slots[i].color != "red") {
                    slots[i].color = action.payload
                }

            });
            slots[action.index].color = "yellow";
            sessionStorage.setItem("slots", JSON.stringify(slots))
            return slots
        }
        case "slots": getSlots().then((res) => {
            let arr=[]
            if (sessionStorage.getItem("slots")) {
              let slots = JSON.parse(sessionStorage.getItem("slots"))
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].locationName == action.location) {
                  console.log("hey")
                  for (let j = 0; j < res.data[i].bookedSlots.length; j++) {
                    let dbDate = new Date(res.data[i].bookedSlots[j].date).getDate();
                    let myDate = new Date(action.date).getDate();
                    console.log(myDate,dbDate)
                    if (myDate == dbDate) {
                      console.log("date same")
                      let dbTime = new Date(new Date().toDateString() + ' ' + res.data[i].bookedSlots[j].fromTime).getHours()
                      let myTime = new Date(new Date().toDateString() + ' ' + action.fromTime).getHours()
                      if (dbTime == myTime)  {
                        console.log("yes")
                        arr.push(res.data[i].bookedSlots[j].slots)
                        console.log(arr)
                        slots.forEach(function (arrayItem, index) {
                          if (arr.includes(index)) {
                            slots[index - 1].color = "red";
                          }
                        })
                      }
                      else{
                        console.log("no")
                        slots.forEach(function (arrayItem, index) {
                         slots[index].color="green"
                        })
                      }
                    }
                  
                  }
                }
              }
              console.log(slots)
              sessionStorage.setItem("slots", JSON.stringify(slots))
              return slots
            }
          })
        default: 
            if (sessionStorage.getItem("slots")) {
                if (JSON.parse(sessionStorage.getItem("slots")).length > 1) {
                    return JSON.parse(sessionStorage.getItem("slots"))
                }
            }
            else {
                sessionStorage.setItem("slots", JSON.stringify(state));
            }

    }

}


