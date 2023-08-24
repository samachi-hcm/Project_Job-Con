import React from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";

const CropperModal = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  open,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom,
}) => {

  const pixelCrop = {
    x:"value",
    y:"value"
  }
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>test</Modal.Header>
      <Modal.Body style={{ height: "500px" }}>
        <div className="crop-container">
          <div className="crop-space">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              minZoom={minZoom}
              aspect={2 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{
                width: 400,
                height: 400 / 2,
              }}
              onMediaLoaded={onMediaLoaded}
              showGrid={true}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            onClose();
            showCroppedImage();
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CropperModal;