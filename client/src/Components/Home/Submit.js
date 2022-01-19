import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import { submitPost } from '../../Functions/posts';
import { postGifToImgur } from '../../Functions/user';
import { useAppContext } from '../../Context/Provider';


export default function Submit() {
  const navigate = useNavigate();
  const [{user}] = useAppContext();

  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState({
    title: '',
    image: null,
    user: user._id
  });


  const updateImage = (e) => {
    const image = e.target.files[0];
    setUpload({ ...upload, image });

    const imageCard = document.getElementById('image-card');

    if (image) {
      var reader = new FileReader();

      reader.onload = (e) => {
        var image = new Image();

        // Set the base64 string return from FileReader as source
        image.src = e.target.result;
      
        // Retrieve the image dimensions
        image.onload = function () {
          imageCard.style.aspectRatio = this.width / this.height;
        };

        imageCard.classList.add('has-image');
        imageCard.style.backgroundImage = `url(${e.target.result})`;
      }

      reader.readAsDataURL(image);
    } else {
      imageCard.style.aspectRatio = '';
      imageCard.style.backgroundImage = '';
      imageCard.classList.remove('has-image');
    }
  };

  const uploadGif = async () => {
    if (!upload.title || !upload.image)
      return toast('Ajoutez un titre et un gif.', {type: 'error'});

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(upload.image.type))
      return toast('Choississez une image de type .jpg, .png or .gif.', {type: 'error'});

    setLoading(true);

    // Imgur upload
    const formdata = new FormData();
    formdata.append('image', upload.image);
    formdata.append('title', upload.title);

    const imgurRes = await postGifToImgur(formdata);
    if (!imgurRes.success) {
      setLoading(false);
      return toast("Erreur de téléversement de l'image sur les serveurs d'imgur.", {type: 'error'});
    }

    // MongoDB upload
    const post = {
      user: upload.user,
      title: upload.title,
      id: imgurRes?.data?.id,
      link: imgurRes?.data?.link,
      datetime: imgurRes?.data?.datetime
    };

    const res = await submitPost(post);
    if (!res.success) return toast(res, {type: 'error'});

    navigate('/');
    toast('Post uploadé avec succès.', {type: 'success'});
  };


  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-fit">
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

      <div id="image-card" style={{minHeight: '12rem' /* h-48 */}} className="
        relative flex justify-center items-center h-48 rounded-md transition duration-300
        border-violet-300 hover:border-violet-500 focus:border-violet-500 bg-gray-100 bg-contain bg-no-repeat
      ">
        <div className="absolute h-full grid place-items-center">
          <div id="image-content" className="grid place-items-center">
            <span id="image-icon" className="material-icons-outlined text-6xl mb-6">perm_media</span>
            <span id="image-text" className="text-gray-600 font-medium max-w-xs">
              {upload.image?.name || 'Choisir une image ou un GIF'}
            </span>
          </div>
        </div>

        <input
          onChange={updateImage}
          type="file" className="cursor-pointer h-full w-full opacity-0" accept=".png, .jpg, .gif"
        />
      </div>

      <button onClick={uploadGif} className="
        flex items-center rounded text-sm px-2 py-1 ease-in-out duration-300
        focus:ring-2 focus:ring-violet-300 bg-violet-600 hover:bg-violet-700 text-white
      ">
        <span className="material-icons pr-2">save</span>METTRE EN LIGNE
      </button>

      {loading ? (
        <div className="absolute inset-0 bg-white grid place-items-center">
          <SyncLoader loading color='#7c3aed'/>
        </div>
      ) : null}
    </div>
  );
};
