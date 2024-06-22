import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetails() {
  let { id, media_type } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [genres, setGenres] = useState([]);

  async function getItemDetails(id, mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=bb390fb819be07c0a86e8a9636b2477d&language=en-US`
    );
    setItemDetails(data);
    setGenres(data.genres);
  }
  useEffect(() => {
    getItemDetails(id, media_type);
  }, []);
  return (
    <>
      {itemDetails.poster_path || itemDetails.profile_path ? (
        <div className="row">
          <div className="col-md-3">
            <div className="photo">
              {itemDetails.poster_path ? (
                <img
                  src={
                    `https://image.tmdb.org/t/p/w500/` + itemDetails.poster_path
                  }
                  className="w-100"
                  alt=""
                />
              ) : (
                <img
                  src={
                    `https://image.tmdb.org/t/p/w500/` +
                    itemDetails.profile_path
                  }
                  className="w-100"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div className="details">
              <h2 className=" text-center title my-3">
                {itemDetails.title}
                {itemDetails.name}
              </h2>
              <h4 className="mb-4 text-center text-muted">{itemDetails.tagline}</h4>
              {genres ? genres.map((type , index)=>(
                <div key={index} className="d-flex my-1 justify-content-center ">
                  <span className=" genres mx-2" >{type.name}</span>
                </div>
              )):''}
              {itemDetails.vote_average?(
                <p className="mt-4 py-2">
                    {''}
                    Vote : {itemDetails.vote_average?.toFixed(1)}    
                </p>
              ) : (
                ''
              )}
              {itemDetails.vote_count?(
                <p className="mt-4 py-2">
                    {''}
                    Vote Count : {itemDetails.vote_count?.toFixed(1)}
                </p>
              ):(
                ''
              )}
              {itemDetails.popularity ?(
                <p className="mt-4 py-2">
                    {''}
                    Popularity : {itemDetails.popularity}
                </p>
              ):(
                ''
              )}
              {itemDetails.release_date ? (
                <p className="mt-4 py-2">
                    {''}
                    Release Date : {itemDetails.release_date}
                </p>
              ):(
                ''
              )}
                
              <p className="my-4 py-2 text-muted h4">{itemDetails.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
    </>
  );
}
