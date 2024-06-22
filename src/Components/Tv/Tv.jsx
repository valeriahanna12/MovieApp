import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'
import { Helmet } from 'react-helmet'

export default function Tv() {
  const [trindingTv, setTrindingTv] = useState([]);
    async function getTrinding(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=bb390fb819be07c0a86e8a9636b2477d`)
    setTrindingTv(data.results);
    {trindingTv.slice(0,10).map((item , index)=> <MediaItem key={index}  item={item}/>)}
    }
    useEffect(()=>{
      getTrinding();
    },[])
  return (<>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="login-page" />
      <title>Tv Page</title>
    </Helmet>
    
    <h2 className='text-center pt-3 '>The Most <span className='text-primary'>Popelar Tv shows</span> in this Week</h2>
    {trindingTv.length > 0 ?
      <div className="row mt-5 mb-2 ">
      {trindingTv.filter((Tv)=>Tv.poster !== null).map((item , index)=> <MediaItem key={index}  item={item}/>)}
      </div> :
        <i className=" fa-spin fa-solid fa-spinner  loading"></i> 
    }
  </>
  );
}
