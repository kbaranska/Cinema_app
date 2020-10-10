import React, { useState, useEffect } from "react";
import "./tickets.css"
import useEffectAsync from "../service/useEffectAsync";
import Spinner from "../common/spinner";
export default function Tickets() {
    const [movie_data, setMovieData] = useState(null);
    const [ticketList, setTicketList] = useState([{ type: "Adult", id: "1", price: "6", quantity: 0, subtotal: 0 }, { type: "Child", id: "2", price: "3", quantity: 0, subtotal: 0 }, { type: "Senior", id: "3", price: "4", quantity: 0, subtotal: 0 }, { type: "Student", id: "4", price: "3.5", quantity: 0, subtotal: 0 }])
    const [totalCost, setTotalCost] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const options = [];
    for (let i = 0; i <= 10; i++) {
        options.push(<option value={i}>{i}</option>);
    }
    const changeSubtotal = (amount: string, ticketID) => {
        setTicketList(ticketList.map(ticket =>
            ticket.id == ticketID ? { ...ticket, quantity: parseInt(amount), subtotal: parseInt(amount) * parseFloat(ticket.price) } : ticket))
        setTotalCost(0)
        let tempPrice = 0
        ticketList.map(ticket => ticket.id !== ticketID ? tempPrice += parseFloat(ticket.price) * ticket.quantity : tempPrice += parseFloat(ticket.price) * parseInt(amount));
        setTotalCost(tempPrice)
    }
    const saveTicket = () => {
        let arr = [];
        let ticketamount = 0;
        ticketList.map(t => t.quantity > 0 ? arr.push({ type: t.type, quantity: t.quantity, price: t.price, subtotal: t.subtotal }) : t)
        arr.map(a => ticketamount += a.quantity)
        console.log(arr)
        localStorage.setItem('ticket_amount',ticketamount.toString())
        localStorage.setItem('ticket_info',JSON.stringify(arr))

    }
    useEffectAsync(async () => {
        let m_data = localStorage.getItem('chosen_movie');
        setMovieData(JSON.parse(m_data));
    }, [false])
    return (<div className="tickets_div">
        <div>
            {isLoading ? <Spinner /> : movie_data === null ? <Spinner /> : <div>
                Chosen movie: {movie_data.movieTitle} <br />
            Date: {movie_data.chosenDay}<br />
            Hour: {movie_data.hour}    </div>} </div>
        <table>
            <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Regular Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Sub total</th>

                </tr>
            </thead>
            <tbody>
                {ticketList.map(ticket => {
                    return (<tr>
                        <td>{ticket.type}</td>
                        <td>{ticket.price}€</td>
                        <td><select name="ticket_quantity" id={ticket.id} onChange={(e) => changeSubtotal(e.target.value, ticket.id)}>
                            {(() => { return options; })()}
                        </select></td>
                        <td>{ticket.subtotal}</td>
                    </tr>)
                })}
            </tbody>
        </table>
        Total: {totalCost}€
        <br />
        <a href="seats" >
            <button disabled={totalCost<=0} onClick={() => saveTicket()}>Choose seats</button>
            </a>
    </div>
    )
}