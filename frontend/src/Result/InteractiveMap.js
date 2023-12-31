import React from 'react'
import PropTypes from 'prop-types'

const InteractiveMap = ({ name }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY // Get the API key from the .env.local file

  // Rendering the map
  return (
<div className="card card-compact shadow-xl w-full h-full bg-base-100">
    <figure className='h-full'>
        <iframe
            title='Country Map'
            loading="lazy"
            className='h-full w-full'
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${name}&maptype=satellite`}>
        </iframe>
    </figure>
    <div className="card-body">
        <div className="flex items-center justify-between">
            <h3 className="card-title">{name}&apos;s Map</h3>
            <div className="flex items-center">
                <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>EXPAND</button>
            </div>
        </div>
    </div>
    {/* Modal for the fullscreen map */}
    <dialog id="my_modal_1" className="modal mb-[5vh]">
        <div className="modal-box max-w-[80vw] h-[80vh] flex flex-col items-center justify-between px-10 pt-10 ">
            <iframe
                title='Country Map'
                loading="lazy"
                className='rounded-2xl h-full w-full'
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${name}&maptype=satellite`}>
            </iframe>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">CLOSE</button>
                </form>
            </div>
        </div>
    </dialog>
</div>
  )
}

InteractiveMap.propTypes = {
  name: PropTypes.string.isRequired
}

export default InteractiveMap
