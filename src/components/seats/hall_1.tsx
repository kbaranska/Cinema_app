import React, { useState } from "react";
import './hall_1.css'
import useEffectAsync from "../service/useEffectAsync";
export default function Hall_1(props) {
    const [dataChanged, setDataChanged] = useState(false);

    function displayForm() {
        let divs = [];
        for (let i = 1; i <= props.available_seats; i++) {
            divs.push(<button className="hall_1_btn" key={i} id={"seat_"+props.available_seats+"_"+i.toString()}>{i}</button>)
        }

        return divs;
    }
    const load = () => {
        
    }
    useEffectAsync(async () => {
        load();
    }, [dataChanged])
    return (<div><div className="hall_1" id={"hall"+props.hallNumber}>
        <button id={"screen"+props.hallNumber}>Screen</button>
        {displayForm()}</div><button className="next_btn"> NEXT</button></div>)
}