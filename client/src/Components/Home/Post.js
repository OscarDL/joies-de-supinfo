import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getPost } from '../../Functions/posts';
import PostCard from '../Shared/PostCard';


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
      {post ? <PostCard post={post}/> : (
        <div className="grid place-items-center">
          <SyncLoader loading color='#7c3aed'/>
        </div>
      )}
    </div>
  );
};
