import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([])

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const setColumn = () => {
    if (window.innerWidth > 1200)
      return 3
    else if (window.innerWidth > 650)
      return 2;
     else
      return 1;
  }

  useEffect(() => {
    fetch('/PhotosDatabase.json?ver='+new Date().getTime())
    .then(response => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      for( let i=0, j=jsonData.photos.length; i < j; i++)
        jsonData.photos[i].src += `?data=${jsonData.date}`
        
      setPhotos(jsonData.photos)
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  }, []);

  return (
      photos.length > 0 && 
      <div>
        <Gallery columns={setColumn} photos={photos} onClick={openLightbox} direction="column"/>
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
  );
}

export default App;
