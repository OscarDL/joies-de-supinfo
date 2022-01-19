import React from 'react';
import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr.json';


TimeAgo.addDefaultLocale(fr);


export default function GifCard({gif}) {
  const timeAgo = new TimeAgo('fr-FR');

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">{gif.title}</h1>

        <button className="
          rounded transition duration-300 flex
          hover:bg-opacity-20 hover:bg-gray-400
        ">
          <span className="material-icons p-1">more_vert</span>
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-4">{gif.nickname} &bull; {timeAgo.format(gif.datetime * 1000)}</p>

      <img src={gif.link} alt={gif.title}/>
    </div>
  );
};
