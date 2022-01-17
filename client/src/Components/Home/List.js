import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import GifCard from '../Shared/GifCard';


export default function List() {
  const [gifs, setGifs] = useState(null);

  useEffect(() => {
    // Retrieve gifs instead
    setTimeout(() => setGifs([]), 500);
  }, []);


  return (
    gifs ? (
      <div className="flex flex-col justify-start max-w-screen-sm gap-6">
        {gifs.sort((a, b) => b.datetime - a.datetime).map((gif, i) => (
          <React.Fragment key={gif.id}>
            {i > 0 && <hr/>}

            <GifCard gif={gif}/>
          </React.Fragment>
        ))}
      </div>
    ) : (
      <div className="flex items-center">
        <SyncLoader loading color='#7c3aed'/>
      </div>
    )
  );
};
