import React from 'react';
import TimeAgo from 'javascript-time-ago';
import { useNavigate } from 'react-router-dom';
import fr from 'javascript-time-ago/locale/fr.json';


TimeAgo.addDefaultLocale(fr);


export default function PostCard({post}) {
  const navigate = useNavigate();
  const timeAgo = new TimeAgo('fr-FR');

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl cursor-pointer" onClick={() => navigate('/post/' + post.id, {state: post})}>{post.title}</h1>

        <button className="
          rounded transition duration-300 flex
          hover:bg-opacity-20 hover:bg-gray-400
        ">
          <span className="material-icons p-1">more_vert</span>
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-4">{post.user} &bull; {timeAgo.format(post.datetime * 1000)}</p>

      <img src={post.link} alt={post.title}/>
    </div>
  );
};
