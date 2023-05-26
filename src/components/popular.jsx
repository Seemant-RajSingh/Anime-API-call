import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './sidebar'

export default function Popular({rendered}) {

  // accessing listed elements of state from global.jsx 
  const {popularAnime, isSearch, searchResults} = useGlobalContext()

  const conditionalRender = () => {
    if(!isSearch && rendered === 'popular') {
      // iterating each api data for popularAnimes with varname anime for each iteration
      return popularAnime?.map((anime) => {

        // xxxxx consoling each popular anime and their detail per iteration
        // xxxxx console.log(anime)


        // image acts as a link, on clicking image, nothing changes but url shown in url bar to the images maid_id(basically its ID)
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          {/* returning image for each iteration using api data -  image property */}
          <img src={anime.images.jpg.large_image_url} className='anime-image' alt="" />
          </Link>

      })
    }
    else{
      return searchResults.map((anime) => {
          return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} className='anime-image' alt="" />
          </Link>
      })
  }
  }

  return (
            <PopularStyled>
              <div className="popular-anime">
                {conditionalRender()}
              </div>
              <Sidebar />
            </PopularStyled>

  )
}


// creating custom styles using styled-components
// display flex for popular.jsx and sidebar.jsx side by side
const PopularStyled = styled.div`
  display: flex;

  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: black;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 120px 80px 200px black, inset -120px -80px 200px black;
      z-index: 2;
      pointer-events: none; /* Make the pseudo-element transparent to pointer events */
    }

    a {
      position: relative;
      z-index: 1;
      height: 500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }

    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      pointer-events: none; /* Make the images transparent to pointer events */
    }
  }
};`