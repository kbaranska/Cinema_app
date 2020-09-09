import React, { useState } from "react";
import { service } from "../service/service"
import useEffectAsync from "../service/useEffectAsync";
import Spinner from "../common/spinner";
import Hall_1 from "./hall_1";
import './hall_1.css'


export default function Seats() {
    const [dataChanged, setDataChanged] = useState(false);
    const [hall, setHall] = useState(null);
    const [hallNumber, setHallNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [movie_data, setMovieData] = useState(null);

    const load = async () => {
        setIsLoading(true)
        console.log(movie_data)
        let m_data = JSON.parse(localStorage.getItem('chosen_movie'));
        setMovieData(m_data)
        let promiseHall = service.GetHallByID(m_data.hall_id);
        let response = await promiseHall;
        setHall(response)
        console.log(response)
        setHallNumber(parseInt(m_data.hall_id.toString().substring(0, 1)))
        setIsLoading(false)
    }
    function hallView(){
           return <Hall_1 available_seats={hall[0].number_of_seats} hallNumber={hallNumber} />
    }
    useEffectAsync(async () => {

        load();
        console.log(movie_data)
    }, [dataChanged])
    return (<div>
        {isLoading ? <Spinner /> : movie_data === null ? <Spinner /> : <div><div className="info_div"> Chosen movie: {movie_data.movieTitle} <br />
            Date: {movie_data.chosenDay}<br />
            Hour: {movie_data.hour}</div> {hallView()}</div> }    </div>)
}