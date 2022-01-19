import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import React, { useEffect, useState } from 'react';

import PostCard from '../Shared/PostCard';
import { getPosts } from '../../Functions/posts';


export default function Posts() {
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    document.title = 'Les Joies de SUPINFO';

    getPosts().then(res => {
      if (!res.success) return toast(res, {type: 'error'});

      setPosts(res.posts);
    });
  }, []);


  return (
    posts ? (
      <div className="flex flex-col justify-start max-w-screen-sm gap-6">
        {posts.sort((a, b) => b.datetime - a.datetime).map((post, i) => (
          <React.Fragment key={post.id}>
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
