import React, { useEffect, useState } from 'react';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
}));

const Home = ({ history, data, search }) => {

    const classes = styles();

    const [filterCriteria, setFilterCriteria] = useState({
        movieName: "",
        genres: [],
        artists: [],
        release_date_start: "",
        release_date_end: ""

    });

    const [displayMoviesList, setDisplayMoviesList] = useState(data.releasedMovies);
    console.log(`Display: ${JSON.stringify(displayMoviesList)}`);

    const movieNameChangeHandler = (event) => {
        const filter = filterCriteria;
        filter['movieName'] = event.target.value;
        setFilterCriteria({ ...filter });
    }

    const genreSelectHandler = (event) => {
        const filter = filterCriteria;
        filter['genres'] = event.target.value;
        setFilterCriteria({ ...filter });
    }

    const artistSelectHandler = (event) => {
        const filter = filterCriteria;
        filter['artists'] = event.target.value;
        setFilterCriteria({ ...filter });
    }

    const releaseDateStartHandler = (event) => {
        const filter = filterCriteria;
        filter['release_date_start'] = event.target.value;
        setFilterCriteria({ ...filter });
    }

    const releaseDateEndHandler = (event) => {
        const filter = filterCriteria;
        filter['release_date_end'] = event.target.value;
        setFilterCriteria({ ...filter });
    }

    const movieClickHandler = (movieId) => {
        history.push('/movie/' + movieId);
    }

    const applyClickHandler = async () => {
        const filteredMovieList = await search(filterCriteria);
        debugger;
        console.log(`Filtered Movie List: ${JSON.stringify(filteredMovieList)}`);
        setDisplayMoviesList(filteredMovieList);
    }

    useEffect(() => {
        setDisplayMoviesList(data.releasedMovies);
    }, [data.releasedMovies]);

    return (
        <div>
            <div className={classes.upcomingMoviesHeading}>
                <span>Upcoming Movies</span>
            </div>

            <GridList cols={5} className={classes.gridListUpcomingMovies} >
                {data.upcomingMovies.map(movie => (
                    <GridListTile key={movie.id}>
                        <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                        <GridListTileBar title={movie.title} />
                    </GridListTile>
                ))}
            </GridList>

            <div className="flex-container">
                <div className="left">
                    <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                        {displayMoviesList.map(movie => (
                            <GridListTile onClick={() => movieClickHandler(movie.id)} className="released-movie-grid-item" key={"grid" + movie.id}>
                                <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="right">
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" onChange={movieNameChangeHandler} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    renderValue={selected => selected.join(',')}
                                    value={filterCriteria.genres}
                                    onChange={genreSelectHandler}
                                >
                                    {data.genres.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={filterCriteria.genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={filterCriteria.artists}
                                    onChange={artistSelectHandler}
                                >
                                    {data.artists.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={filterCriteria.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    onChange={releaseDateStartHandler}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    onChange={releaseDateEndHandler}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <br /><br />
                            <FormControl className={classes.formControl}>
                                <Button variant="contained" color="primary" onClick={applyClickHandler}>
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}

export default Home;