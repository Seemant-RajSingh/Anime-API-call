import React, { useState } from 'react'
import { useGlobalContext } from '../context/global'
import Popular from './popular'
import Airing from './airing'
import Upcoming from './upcoming'

import styled from 'styled-components'

export default function Homepage() {

    const {handleSubmit,
        search,
        searchAnime,
        handleChange,
        getUpcomingAnime,
        getAiringAnime} = useGlobalContext()

    // state of rendered will decide which APIs will be called on home screen
    const [rendered, setRendered] = useState('popular')




    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }




  return (
    <HomepageStyled>
        <header>

            <div className="logo">
                <h1>
                {rendered === 'popular' ? 'Popular Animes' : 
                        rendered === 'airing' ? 'Airing Animes' : 'Upcoming Animes'}  
                </h1>
            </div>

            {/* Filtering to popular */}
            <div className="search-container">

                <div className="filter-btn popular-filter">
                            <button onClick={() => {
                                setRendered('popular')
                            }}>Popular<i className="fas fa-fire"></i></button>
                </div>

                {/* Search anime form */}
                <form action="" className="search-form" onSubmit={handleSubmit}>
                            <div className="input-control">
                                <input type="text" placeholder="Search Animes" value={search} onChange={handleChange} />
                                <button type="submit">Search</button>
                            </div>
                            {/* <div>
                                if(isSearch && )
                            </div> */}
                            
                        </form>

                <div className="filter-btn airing-filter">
                    <button onClick={() => {
                        setRendered('airing')
                        getAiringAnime()
                    }}>Airing</button>
                </div>


                <div className="filter-btn upcoming-filter">
                            <button onClick={() => {
                                setRendered('upcoming')
                                getUpcomingAnime()
                            }}>Upcoming</button>
                </div>

            </div>
        </header>

        {switchComponent()}
        </HomepageStyled>
  )
}



const HomepageStyled = styled.div`

    .h1{
        color: #c9b020;
    }

    background-color: black;
    box-shadow: 35px 0px 100px black;

    header{
        box-shadow: inset 0px 10px 100px yellow;
        border-radius: 10px;
        padding: 2rem 5rem;
        width: 70%;
        margin: 0 auto;
        transition: all .4s ease-in-out;
        @media screen and (max-width:1530px){
            width: 95%;
        }

        .logo{
            font-family: 'Zen Dots', cursive;
            text-shadow: -2px -2px 3px #000, 2px 3px #000, -2px 2px 3px #000;
            font-size: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .search-container{
            font-family: 'Bruno Ace SC', cursive;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            button{
                color: white;
                display: flex;
                align-items: center;
                gap: .5rem;
                padding: .7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: black;
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 5px solid #f0d229;
            }

            button:hover {
                background-color: #fcfbae;
                color: black;
            }

            form{
                position: relative;
                width: 100%;
                .input-control{
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    font-family: 'Bruno Ace SC', cursive;
                    width: 100%;
                    padding:.7rem 1rem;
                    color: white;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: #292929;
                    border: 5px solid #f0d229;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }

    header:hover {
        box-shadow: inset 0px 10px 100px blue;
    }
`