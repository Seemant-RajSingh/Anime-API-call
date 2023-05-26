import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/global';


export default function Sidebar() {
    const {popularAnime} = useGlobalContext()

    const sorted = popularAnime?.sort((a,b) => {
        return b.score - a.score
    })

    return (
        <SidebarStyled>
            <div className="container">
            <h3>Top 5 Picks</h3>
            <div className="anime">
                {sorted?.slice(0,5).map((anime) => {
                    return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                        <h5>
                            {anime.title}
                        </h5>
                    </Link>
                })}
            </div>
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`

    position: relative;
    top: 2rem;

    height: 100%;
    
    .container{
    margin-top: 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-top: 5px solid #c9b020;
    padding-right: 2rem;
    padding-left: 2rem;
    padding-top: 2rem;
    margin-right: 2rem;
    }

    .container:before {
        content: "";
        position: absolute;
        top: 15rem;
        left: 50%;
        transform: translateX(-50%);
        height: 50%;
        width: 60%;
        border-right: none;
        border-bottom: none;
        border-left: none;
      }


    .anime{
        display: flex;
        flex-direction: column;
        width: 150px;
        padding-bottom: 2rem;

        img{
            width: 100%;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
        }

        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: white;
            h4{
                font-size: 1.1rem;
            }
        }
    }
`;