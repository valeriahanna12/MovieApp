import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";
import { Helmet } from "react-helmet";

export default function Movies() {
  const [trindingMovies, setTrindingMovies] = useState([]);
  async function getTrinding() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=bb390fb819be07c0a86e8a9636b2477d`
    );
    setTrindingMovies(data.results);
    {
      trindingMovies
        .slice(0, 10)
        .map((item, index) => <MediaItem key={index} item={item} />);
    }
  }
  useEffect(() => {
    getTrinding();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="login-page" />
        <title>Movies Page</title>
      </Helmet>

      <h2 className="text-center pt-3 ">
        The Most <span className="text-primary">Popelar Movies</span> in this
        Week
      </h2>
      {trindingMovies.length > 0 ?
        <div className="row mt-5 mb-2 ">
          {trindingMovies.map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>:<i className=" fa-spin fa-solid fa-spinner  loading"></i> }
    </>
  );
}
