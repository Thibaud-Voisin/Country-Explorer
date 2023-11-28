
import React from 'react';

const Interactive_Map = ({ Name }) => {

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;




  return (

<div className="card card-compact shadow-xl w-full h-full bg-base-100">
    <figure className='h-full'>
        <iframe
            title='Country Map'
            loading="lazy"
            className='h-full w-full'
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${Name}&maptype=satellite`}>
        </iframe>
    </figure>
    <div className="card-body">
        <div className="flex items-center justify-between">
            <h3 className="card-title">{Name}'s Map</h3>
            <div className="flex items-center">
                <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>EXPAND</button>
            </div>
        </div>
    </div>
    <dialog id="my_modal_1" className="modal mb-[5vh]">
        <div className="modal-box max-w-[80vw] h-[80vh] flex flex-col items-center justify-between px-10 pt-10 ">
            <iframe
                title='Country Map'
                loading="lazy"
                className='rounded-2xl h-full w-full'
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${Name}&maptype=satellite`}>
            </iframe>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">CLOSE</button>
                </form>
            </div>
        </div>
    </dialog>
</div>
  );
};

export default Interactive_Map;