import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'


export default function Animeitem() {

    // getting the id of the clicked image (4 digit number)
    const {id} = useParams()



    // CONCEPT: creating states based on what elements will change
    const [anime, setAnime] = useState({})
    const [characters, setCharacters] = useState([])
    const [showMore, setShowMore] = useState(false)



    //destructure anime
    const {
      title, synopsis, 
      trailer, duration, aired, 
      season, images, rank, 
      score, scored_by, popularity, 
      status, rating, source } = anime



    //fetching anime based on id.. and saving the data to state - anime
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)
    }

    //fetching anime characters with id.. and saving the data to state - anime using different route 
    const getCharacters = async (anime) => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
      const data = await response.json()
      setCharacters(data.data)
      //console.log(data.data)
  }


    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [])





  return (

    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">

        {/* IMAGE AND INFO */}
        <div className="detail">

            <div className="image">
              <img src={images?.jpg.large_image_url} alt="" />
            </div>

            <div className="anime-details">
                        <p><span>Aired:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{aired?.string}</span></p>
                        <p><span>Rating:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{rating}</span></p>
                        <p><span>Rank:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{rank}</span></p>
                        <p><span>Score:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{score}</span></p>
                        <p><span>Scored By:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{scored_by}</span></p>
                        <p><span>Popularity:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{popularity}</span></p>
                        <p><span>Status:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{status}</span></p>
                        <p><span>Source:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{source}</span></p>
                        <p><span>Season:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{season}</span></p>
                        <p><span>Duration:</span><span style={{ color: 'rgba(53, 142, 219)' }}>{duration}</span></p>
            </div>

        </div>

                    {/* DESCRIPTION */}
                    <p className="description">
                      {/* showmore option for too long of a description */}
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less': 'Read More'}</button>
                    </p>
        </div>


        {/* -------------------------------------------------------------------------------------- */}


          <h3 className="title">Trailer</h3>

          {/* ? is to ensure that the trailer data is fetched from API */}
          <div className="trailer-con">
            {trailer?.embed_url ? 
                      <iframe 
                          src={trailer?.embed_url} 
                          title="Inline Frame Example"
                          width="1050"
                          height="600"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen>
                      </iframe> :
                      <h3>Trailer not available</h3>
                  }
          </div>


        {/* -------------------------------------------------------------------------------------- */}


          <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const {role} = character
                    const {images, name, mal_id} = character.character
                    {/* setting route to which clicking on image will take user */}
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt="" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>


      </AnimeItemStyled>
  )
}


const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: black;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background:linear-gradient( to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background:linear-gradient( to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .description{
        margin-top: 2rem;
        color: #a6a6a6;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #3d3d3d;
            font-weight: 600;
        }
    }
    .trailer-con{
        display: flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline: none;
            border: 5px solid gray;
            padding: 0.5rem;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .details{
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0px 1000px rgba(23, 128, 209, 0.3);   
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px;
                margin-left: 5rem
            }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
                color: #a6a6a6;
            }
        }
    }
    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0px 1000px rgba(181, 176, 27, 0.3);
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #e5e7eb;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: rgba(255, 255, 255, 0.1);
            transition: all .4s ease-in-out;
            img{
                width: 100%;
            }
            h4{
                padding: .5rem 0;
                color: #a6a6a6;
            }
            p{
                color: #c9b020;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;

