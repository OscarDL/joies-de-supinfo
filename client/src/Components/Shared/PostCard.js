import React from 'react';
import { Link } from 'react-router-dom';

import TimeAgo from 'javascript-time-ago';


export default function PostCard({post}) {
  const timeAgo = new TimeAgo('fr-FR');

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Link className="text-inherit focus:underline" to={'/post/' + post._id} state={post}>
          <h1 className="text-xl cursor-pointer hover:underline">{post.title}</h1>
        </Link>

        <button className="
          rounded transition duration-300 flex
          hover:bg-opacity-20 hover:bg-gray-400
        ">
          <span className="material-icons p-1">more_vert</span>
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        <Link to={'/profile/' + post.user} className="hover:underline focus:underline">
          {post.username}
        </Link> &bull; {timeAgo.format(post.datetime * 1000)}
      </p>

      <img src={post.link} alt={post.title}/>
    </div>
  );
};
