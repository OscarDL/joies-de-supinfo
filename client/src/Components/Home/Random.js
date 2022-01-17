import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import GifCard from '../Shared/GifCard';


export default function Random() {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    if (!gif) {
      // Retrieve a random gif
      // setGif(randomGif);
    }
  }, [gif]);


  return gif ? (
    <div className="flex flex-col justify-center items-center gap-12">
      <GifCard gif={gif}/>

      <button onClick={() => setGif(null)} className="
        flex items-center rounded-sm text-sm px-2 py-1 ease-in-out duration-300
        focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
      ">
        <span className="material-icons pr-2">cached</span>AUTRE GIF AU HASARD
      </button>
    </div>
  ) : (
    <div className="flex items-center">
      <SyncLoader loading color='#7c3aed'/>
    </div>
  );
};
