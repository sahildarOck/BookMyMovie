import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import Confirmation from '../screens/confirmation/Confirmation';
import { UserLoggedinContext } from "../common/UserLoggedinContext";
import { Route, Switch, useLocation } from "react-router-dom";
import BookShow from "./bookshow/BookShow"
import LoginRegisterModal from "../common/login_register_modal/LoginRegisterModal";

const Controller = () => {

    const location = useLocation();
    const background = location.state && location.state.background;

    const baseUrl = "http://localhost:8085/api/v1/";

    const [data, setData] = useState({
        upcomingMovies: [],
        releasedMovies: [],
        genres: [],
        artists: []
    });

    const loadData = async () => {
        const tempData = data;

        const moviesList = await getMoviesList();

        tempData.upcomingMovies = moviesList[0];
        tempData.releasedMovies = moviesList[1];
        tempData.genres = await getGenres();
        tempData.artists = await getArtists();

        setData({ ...tempData });
    }

    const getMoviesList = async () => {
        const moviesList = [];
        const rawResponse = await fetch(baseUrl + "movies?page=1&limit=20");
        const data = await rawResponse.json();

        moviesList.push(data.movies.filter(item => item.status === 'PUBLISHED'));

        moviesList.push(data.movies.filter(item => item.status === 'RELEASED'));

        return moviesList;
    }

    const getGenres = async () => {
        const rawResponse = await fetch(baseUrl + "genres")
        const data = await rawResponse.json()
        return data.genres;
    }

    const getArtists = async () => {
        const rawResponse = await fetch(baseUrl + "artists")
        const data = await rawResponse.json()
        return data.artists;
    }

    const isUserLoggedIn = () => {
        return getAuthorization() !== null;
    }

    const getAuthorization = () => {
        return `Bearer ${window.localStorage.getItem('access-token')}`;
    }

    const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());

    const loginHandler = async (username, password) => {
        const authorization = window.btoa(`${username}:${password}`);

        const rawResponse = await fetch(baseUrl + "auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'authorization': `Basic ${authorization}`
                }
            }
        );

        if (rawResponse.status === 200) {
            const userDetails = await rawResponse.json();
            window.localStorage.setItem('user-details', JSON.stringify(userDetails));
            window.localStorage.setItem('access-token', rawResponse.headers.get('access-token'));

            setUserLoggedIn(true);

            return true;
        } else {
            return false;
        }
    }

    const registerUserHandler = async (registerUserForm) => {
        const rawResponse = await fetch(baseUrl + "signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerUserForm)
            }
        );

        const data = await rawResponse.json();

        if (data && "ACTIVE" === data.status) {
            return true;
        } else {
            return false;
        }
    }

    const logoutHandler = async () => {
        const rawResponse = await fetch(baseUrl + "auth/logout",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': `${getAuthorization()}`
                }
            }
        );

        if (rawResponse.status === 200) {
            window.localStorage.removeItem('user-details');
            window.localStorage.removeItem('access-token');

            setUserLoggedIn(false);
        }
    }

    const filterMovies = filterCriteria => {
        let filteredResult = data.releasedMovies.filter(movies => {
            let filter = true;

            if (movies.title && !movies.title.includes(filterCriteria.movieName)) {
                filter = false;
            }

            if (filter && movies.genres && filterCriteria.genres.length > 0) {
                const filteredGenresResult = filterCriteria.genres.filter(gen => {
                    return movies.genres.includes(gen);
                })

                if (filteredGenresResult.length === 0) {
                    filter = false;
                }
            }


            if (filter && movies.artists && filterCriteria.artists.length > 0) {
                const filteredArtistResult = filterCriteria.artists.filter(art => {
                    const innerFilter = movies.artists.filter(artM => {
                        let fullname = artM.first_name + " " + artM.last_name;
                        return fullname === art;
                    })

                    return innerFilter.length !== 0;

                })

                if (filteredArtistResult.length === 0) {
                    filter = false;
                }

            }

            return filter;
        })

        if (filteredResult !== null && filteredResult !== [])
            return filteredResult;
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="main-container">
            <UserLoggedinContext.Provider value={userLoggedIn}>
                <Header logoutHandler={logoutHandler} />
            </UserLoggedinContext.Provider>

            <Switch location={background || location}>
                <Route exact path='/' render={(props) => <Home {...props} data={data} search={(data) => filterMovies(data)} />} />
                <Route path='/movie/:id' render={(props) => <Details {...props} releasedMovies={data.releasedMovies} />} />
                <Route path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl={baseUrl} />} />
                <Route path='/confirm/:id' render={(props) => <Confirmation {...props} />} />
            </Switch>


            {background && <Route path="/login-register-modal" children={<LoginRegisterModal loginHandler={loginHandler} registerUserHandler={registerUserHandler} />} />}
        </div>
    )
}

export default Controller;