import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import PostCard from '../Shared/PostCard';
import { getProfile } from '../../Functions/user';


export default function Profile() {
  const { id } = useParams();
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    getProfile(id).then(res => {
      if (!res.success)
        return toast(res, {type: 'error'});

      setPosts(res.posts);
    });
  }, [id]);


  return (
    posts ? (
      <div className="flex flex-col justify-start max-w-screen-sm gap-6">
        {posts.sort((a, b) => b.datetime - a.datetime).map((post, i) => (
          <React.Fragment key={post._id}>
            {i > 0 && <hr/>}

            <PostCard post={post}/>
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
