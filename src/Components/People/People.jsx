import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem'
import { Helmet } from 'react-helmet'

export default function People() {
  const [trindingPeople, setTrindingPeople] = useState([]);
    async function getTrinding(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=bb390fb819be07c0a86e8a9636b2477d`)
    setTrindingPeople(data.results);
    {trindingPeople.map((item , index)=> <MediaItem key={index}  item={item}/>)}
    }
    useEffect(()=>{
      getTrinding();
    },[])
  return (<>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="login-page" />
      <title>People Page</title>
    </Helmet>
    
    <h2 className='text-center pt-3 '>The Most <span className='text-primary'>Popelar People</span> in this Week</h2>

    {trindingPeople.length > 0 ? 
    <div className="row mt-5 mb-2 ">
    {trindingPeople.filter((person)=>person.profile_path !== null).map((item , index)=> <MediaItem key={index}  item={item}/>)}
    </div>:
         <i className=" fa-spin fa-solid fa-spinner  loading"></i> }
  </>
  )
}
