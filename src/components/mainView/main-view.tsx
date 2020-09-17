import React, { useEffect, useState } from "react";
import tenetposter from '../../images/poster_tenet.jpg'
import './main-view.css'
import Spinner from "../common/spinner"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import useEffectAsync from "../service/useEffectAsync";
import { service } from "../service/service";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar, IconButton } from "@material-ui/core";
import './main-view.css'
// import { Spinner } from "react-bootstrap";
export default function MainView() {
    const [movies, setMovies] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
        setIsLoading(true)
        let promiseMovies = service.GetMovies();
        let responseMovies = await promiseMovies;
        setMovies(responseMovies)
        setIsLoading(false)
    }
    useEffectAsync(async () => {

        load();
    }, [dataChanged])
    return (

        <div>
            <h1>Hello!</h1>
            <p>Our Movies:</p>

            <div className="row">
                {isLoading ? <Spinner /> : movies === null ? <Spinner /> : movies.map((movie, index) => {
                    return <div className='column'>
                        <div className="column">{index % 4 == 0 ? <img src={movie.poster_path} /> : ''
                        } </div>
                        <div className="column"  >{index % 4 == 1 ? <img id="sec" src={movie.poster_path} /> : ''
                        }</div>
                        <div className="column" > {index % 4 == 2 ? <img src={movie.poster_path} /> : ''
                        }</div>
                        <div className="column" > {index % 4 == 3 ? <img id="sec"src={movie.poster_path} /> : ''
                        }</div>
                    </div>
                })}




            </div>
        </div>

    );
}