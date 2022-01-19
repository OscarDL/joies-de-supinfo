import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { SyncLoader } from 'react-spinners';
//import { useNavigate } from 'react-router-dom';

import { postGifToImgur } from '../../Functions/user';


export default function Submit() {
  //const history = useNavigate();

  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState({
    title: '',
    image: null,
    nickname: ''
  });


  const uploadGif = async () => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append('image', upload.image);
    formdata.append('title', 'Test title');

    const res = await postGifToImgur(formdata);
    if (!res.success) {
      setLoading(false);
      return toast(res.message, {type: 'error'});
    }

    // Add gif data to MongoDB
  };


  return loading ? (
    <div className="flex items-center">
      <SyncLoader loading color='#7c3aed'/>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6 w-fit">
        <label className="pl-2 text-gray-700 text-sm font-medium mb-2" htmlFor="title">
          Titre
        </label>

        <input
          id="title"
          type="text"
          value={upload.title}
          placeholder="Quand on te dit &quot;pas de dates&quot;"
          className="border-2 rounded w-full py-2 px-3 text-gray-700"
          onChange={e => setUpload({...upload, title: e.target.value})}
        />
      </div>

      <div className="
        border-violet-300 hover:border-violet-500 focus:border-violet-500 bg-gray-100
        relative flex justify-center items-center h-48 w-96 rounded-md border-2 transition duration-300 mb-6
      ">
        <div className="absolute">
          <div className="grid place-items-center">
            <span className="material-icons-outlined text-6xl mb-6">perm_media</span>
            <span className="text-gray-600 font-medium max-w-xs">{upload.image?.name || 'Choisir une image ou un GIF'}</span>
          </div>
        </div>

        <input
          onChange={e => setUpload({...upload, image: e.target.files[0]})}
          type="file" className="cursor-pointer h-full w-full opacity-0" accept=".png, .jpg, .gif"
        />
      </div>

      <button onClick={uploadGif} className="
        flex items-center rounded text-sm px-2 py-1 ease-in-out duration-300
        focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
      ">
        <span className="material-icons pr-2">save</span>METTRE EN LIGNE
      </button>
    </div>
  );
};
