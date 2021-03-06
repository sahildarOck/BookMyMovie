import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link, useLocation } from 'react-router-dom';

const Details = (props) => {

    const location = useLocation();

    const baseUrl = props.baseUrl;

    const [data, setData] = useState({
        movie: {},
        starIcons: [{
            id: 1,
            stateId: "star1",
            color: "black"
        },
        {
            id: 2,
            stateId: "star2",
            color: "black"
        },
        {
            id: 3,
            stateId: "star3",
            color: "black"
        },
        {
            id: 4,
            stateId: "star4",
            color: "black"
        },
        {
            id: 5,
            stateId: "star5",
            color: "black"
        }]
    });

    useEffect(() => {
        async function setMovieDataInState() {
            let currentData = data;

            const rawResponse = await fetch(baseUrl + "movies/" + location.pathname.split("/")[2]);
            currentData['movie'] = await rawResponse.json();

            setData({ ...currentData })
        }
        setMovieDataInState();
    }, []);

    const opts = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }

    let movies = data['movie'];

    const artistClickHandler = (url) => {
        window.location = url;
    }

    const getVideoId = () => {
        if (movies.trailer_url != null) {
            return movies.trailer_url.split("?v=")[1];
        } else {
            return '';
        }
    }

    const starClickHandler = (id) => {
        let starIconList = [];
        for (let star of data.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        let currentState = data;
        currentState['starIcons'] = starIconList;
        setData({ ...currentState });
    }

    return (
        <div className="details">
            <div className="back">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={movies.poster_url} alt={movies.title} />
                </div>

                <div className="middleDetails">
                    <div>
                        <Typography variant="headline" component="h2">{movies.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movies.genres != null && movies.genres.join(', ')}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movies.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movies.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movies.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot:</span> <a href={movies.wiki_url}>(Wiki Link)</a> {movies.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={getVideoId()}
                            opts={opts}
                        />
                    </div>
                </div>

                <div className="rightDetails">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {data.starIcons.map(star => (
                        <StarBorderIcon
                            className={star.color}
                            key={"star" + star.id}
                            onClick={() => starClickHandler(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {movies.artists != null && movies.artists.map(artist => (

                                <GridListTile
                                    className="gridTile"
                                    onClick={() => artistClickHandler(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;