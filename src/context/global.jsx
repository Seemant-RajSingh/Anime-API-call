import React, {createContext, useContext, useReducer, useEffect, useState} from "react";

const GlobalContext = createContext();




// reducer function, state holds all the API data popularAnime, airedAnime, etc. provided to app via global context provider and console logged
const reducer = (state, action) => {

    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false} 
        case SEARCH:
            return {...state, searchResults: action.payload, loading: false}
        case GET_UPCOMING_ANIME:
            return {...state, upcomingAnime: action.payload, loading: false}
        case GET_AIRING_ANIME:
            return {...state, airingAnime: action.payload, loading: false}
        case GET_PICTURES:
            return {...state, pictures: action.payload, loading: false}
        default:
            return state;
    }

    return state;
}


// API link
const baseUrl = "https://api.jikan.moe/v4";



const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";



//  ALL DATA INSIDE THIS WILL BE SHARED VIA useGlobalContext
export const GlobalContextProvider = ({children}) => {


    // initial states variable with various objects
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        //airing = true in data from API
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false
    }



    //creating a reducer hook with INITIAL VALUES AS initialState variable
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');



    //handle change function used for input text box in homepage.jsx - set i/p box value to what is typed, set isSearch to false once text within is edited
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }



    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }




    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        // fetching from API different link (data listing top animes)
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        //console.log(data.data)
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }




    //fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data})
    }




    //fetch airing anime
    const getAiringAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data})
    }




    //get anime pictures
    const getAnimePictures = async (id) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`);
        const data = await response.json();
        dispatch({type: GET_PICTURES, payload: data.data})
    }




    //searching anime, anime parameter holds the anime name entered in form at homepage to be searched
    const searchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }



    //initial render
        React.useEffect(() => {
            getPopularAnime();
    }, [])




    return(
        //all children should have access to elements of initialState eg. popularAnime array, upcomingAnime array etc.
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            getAnimePictures
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

// any const assigned this function will recieve value 'hello'
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}


