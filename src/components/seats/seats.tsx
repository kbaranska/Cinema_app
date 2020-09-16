import React, { useState } from "react";
import { service } from "../service/service"
import useEffectAsync from "../service/useEffectAsync";
import Spinner from "../common/spinner";
import Hall from "./hall";
import './hall.css'


export default function Seats() {
    const [dataChanged, setDataChanged] = useState(false);
    const [hall, setHall] = useState(null);
    const [hallNumber, setHallNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [movie_data, setMovieData] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([])
    const [ticketAmount, setTicketAmount] = useState(localStorage.getItem('ticket_amount'))
    const load = async () => {
        setIsLoading(true)
        let m_data = JSON.parse(localStorage.getItem('chosen_movie'));
        setMovieData(m_data)
        let promiseHall = service.GetHallByID(m_data.hall_id);
        let response = await promiseHall;
        setHall(response)
        let promiseBSeats = service.GetBookedSeats(m_data.movieID, m_data.chosenDay, m_data.hour);
        let responseBS = await promiseBSeats;
        setBookedSeats(responseBS)
        setHallNumber(parseInt(m_data.hall_id.toString().substring(0, 1)))
        setIsLoading(false)
    }
    function hallView() {
        return <Hall available_seats={hall[0].number_of_seats} hallNumber={hallNumber} bookedSeats={bookedSeats} />
    }
    useEffectAsync(async () => {

        load();
    }, [dataChanged])
    return (<div>
        {isLoading ? <Spinner /> : movie_data === null ? <Spinner /> : <div><div className="info_div"> Chosen movie: {movie_data.movieTitle} <br />
            Date: {movie_data.chosenDay}<br />
            Hour: {movie_data.hour} <br />
            Tickets: {ticketAmount} </div> {hallView()}</div>}    </div>)
}