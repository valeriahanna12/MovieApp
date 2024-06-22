import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MediaItem from "../MediaItem/MediaItem";
export default function Home() {
  const [trindingMovies, setTrindingMovies] = useState([]);
  const [trindingTv, setTrindingTv] = useState([]);
  const [trindingPeople, setTrindingPeople] = useState([]);
  async function getTrinding(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=2576faa3513d5900bf44685f3728ea05`
    );
    callback(data.results);
    // console.log(data.results );
  }
  useEffect(() => {
    getTrinding("movie", setTrindingMovies);
    getTrinding("tv", setTrindingTv);
    getTrinding("person", setTrindingPeople);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="login-page" />
        <title>Home Page</title>
      </Helmet>
      {trindingMovies.length > 0 ?(
      <div className="row mt-5 mb-2 ">
        <div className="col-md-4 pb-2 d-flex align-items-center">
          <div className="w-100">
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h4">
              Trinding <br /> Movies <br /> to Watch Now
            </h2>
            <p className="py-2 text-muted">Most Watched movies by days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {trindingMovies.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
      ):(
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
      
        {trindingTv.length > 0 ?(
        <div className="row mt-5 mb-2 ">
        <div className="col-md-4 pb-2 d-flex align-items-center">
          <div className="w-100">
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h4">
              Trinding <br /> Tv <br /> to Watch Now
            </h2>
            <p className="py-2 text-muted">Most Watched Tv by days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {trindingTv.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
      ):(
        <i className=" fa-spin fa-solid fa-spinner  loading"></i>
      )}
      
        {trindingPeople.length > 0 ? (
          <div className="row mt-5 mb-5 ">
          <div className="col-md-4 pb-2 d-flex align-items-center">
            <div className="w-100">
              <div className="brdr w-25 mb-3"></div>
              <h2 className="h4">
                Trinding <br /> People <br /> to Watch Now
              </h2>
              <p className="py-2 text-muted">Most Trinding People by days</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {trindingPeople
            .filter((person) => person.profile_path !== null)
            .slice(0, 10)
            .map((item, index) => (
              <MediaItem key={index} item={item} />
            ))}
        </div>
        ):(
          <i className=" fa-spin fa-solid fa-spinner  loading"></i>
        )}
      
    </>
  );
}
