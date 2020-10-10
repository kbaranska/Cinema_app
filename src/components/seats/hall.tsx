import React, { useState } from "react";
import './hall.css'
import { useHistory } from "react-router-dom";
import useEffectAsync from "../service/useEffectAsync";
import Alert from "react-bootstrap/esm/Alert";
export default function Hall_1(props) {
    const [dataChanged, setDataChanged] = useState(false);
    const [arrayOfSeats, setArrayOfSeats] = useState([])
    const tickets = localStorage.getItem('ticket_amount');
    const [ticketAmount, setTicketAmount] = useState(localStorage.getItem('ticket_amount'))
    const [show, setShow] = useState(false);
    const [chosenSeatsArr, setChosenSeatsArr] = useState([]);
    const history = useHistory();

    function displayForm() {
        let divs = [];
        for (let i = 1; i <= props.available_seats; i++) {
            divs.push(<button className="hall_1_btn" key={i} id={"seat_" + props.available_seats + "_" + i.toString()}>{i}</button>)
        }

        return divs;
    }
    const load = () => {

        let seats = [];
        for (let i = 1; i <= props.available_seats; i++) {
            if (props.bookedSeats.includes(i)) {
                seats.push({ s_number: i, reserved: true });

            } else {
                seats.push({ s_number: i, reserved: false });
            }
            setArrayOfSeats(seats);

        }

    }
    useEffectAsync(async () => {
        load();
    }, [dataChanged])
    const onSeatClick = (s_number) => {
        if (!props.bookedSeats.includes(s_number)) {
            if (parseInt(ticketAmount) > 0) {

                if (document.getElementById("seat_" + props.available_seats + "_" + s_number.toString()).style.backgroundColor == 'rgb(27, 143, 47)') {
                    document.getElementById("seat_" + props.available_seats + "_" + s_number.toString()).style.backgroundColor = "#b3903b";
                    setTicketAmount((parseInt(ticketAmount) - 1).toString());
                    setChosenSeatsArr(chosenSeatsArr.concat(s_number))
                } else {
                    document.getElementById("seat_" + props.available_seats + "_" + s_number.toString()).style.backgroundColor = "rgb(27, 143, 47)";
                    setTicketAmount((parseInt(ticketAmount) + 1).toString());
                    setChosenSeatsArr(chosenSeatsArr.filter(it => it !== s_number))
                }
            }
            else {
                if (document.getElementById("seat_" + props.available_seats + "_" + s_number.toString()).style.backgroundColor !== 'rgb(27, 143, 47)') {
                    document.getElementById("seat_" + props.available_seats + "_" + s_number.toString()).style.backgroundColor = "rgb(27, 143, 47)";
                    setTicketAmount((parseInt(ticketAmount) + 1).toString());
                    setChosenSeatsArr(chosenSeatsArr.filter(it => it !== s_number))

                }
            }
        }
    }
    const onNextClick = () => {
        if (chosenSeatsArr.length < parseInt(tickets)) {
            setShow(true);
            setTimeout(function () {
                setShow(false)
            }, 3000)
        }
        else {        
            localStorage.setItem('booked_seats', JSON.stringify(chosenSeatsArr))
            history.push('/summary')
        }
    }
    return (<div>
        <div className="hall_1" id={"hall" + props.hallNumber}>
            <button id={"screen" + props.hallNumber}>Screen</button>
            {/* {displayForm()} */}
            {arrayOfSeats.map(m => {
                return <button className="hall_1_btn" onClick={() => onSeatClick(m.s_number)} style={{ backgroundColor: m.reserved ? "#cf3434" : "#1b8f2f" }} key={m.s_number} id={"seat_" + props.available_seats + "_" + m.s_number.toString()}>{m.s_number}</button>
            })}
        </div>
        <br/>
        <Alert show={show} variant="success">
            <p>
                Please select the same amount of seats as the tickets
            </p>

        </Alert>
        <button className="next_btn" onClick={() => onNextClick()}> NEXT</button>

    

    </div>)
}