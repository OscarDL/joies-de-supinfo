import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import PostCard from '../Shared/PostCard';
import { getRandomPost } from '../../Functions/posts';


export default function Random() {
  const [post, setPost] = useState(null);


  useEffect(() => {
    if (!post) {
      getRandomPost().then(res => {
        if (!res.success) return toast(res, {type: 'error'});

        setPost(res.post);
        if (res.post.title) document.title = res.post.title;
      });
    }
  }, [post]);


  return post ? (
    <div className="flex flex-col justify-center items-center gap-12">
      {post._id ? <PostCard post={post}/> : <h1 className="text-2xl">Aucun post à afficher.</h1>}

      {post._id ? (
        <button onClick={() => setPost(null)} className="
          flex items-center rounded text-sm px-2 py-1 ease-in-out duration-300
          focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
        ">
          <span className="material-icons pr-2">cached</span>AUTRE GIF AU HASARD
        </button>
      ) : (
        <Link to="/submit" className="
          flex items-center rounded text-sm px-2 py-1 ease-in-out duration-300
          focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
        ">
          <span className="material-icons pr-2">cloud_upload</span>SOUMETTRE UN POST
        </Link>
      )}
    </div>
  ) : (
    <div className="flex items-center">
      <SyncLoader loading color='#7c3aed'/>
    </div>
  );
};
