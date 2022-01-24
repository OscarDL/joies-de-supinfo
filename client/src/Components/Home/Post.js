import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import PostCard from '../Shared/PostCard';
import { getPost } from '../../Functions/posts';


export default function Post() {
  const { id } = useParams();
  const { state } = useLocation();

  const [post, setPost] = useState(state);


  useEffect(() => {
    if (!post) {
      getPost(id).then(res => {
        if (!res.success) return toast(res, {type: 'error'});
        setPost(res.post);
      });
    }
  }, [id, post]);


  return (
    <div>
      {post ? (
        <div className="flex flex-col justify-center items-center gap-12">
          <PostCard post={post}/>

          <Link to="/" className="
            flex items-center rounded text-sm px-2 py-1 ease-in-out duration-300
            focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
          ">
            <span className="material-icons-round pr-2">chevron_left</span>RETOUR AUX POSTS
          </Link>
        </div>
      ) : (
        <div className="grid place-items-center">
          <SyncLoader loading color='#7c3aed'/>
        </div>
      )}
    </div>
  );
};
