import React, { useState, useCallback, useEffect, useRef } from "react";
import CropperModal from "./CropperModal";
import getCroppedImg from "./getCroppedImg";
import { Button } from "react-bootstrap";
import { css } from '@emotion/react'
import { FileEarmarkImage } from "react-bootstrap-icons";


/** @jsxImportSource @emotion/react */

const ImageCropper = ({setImage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [croppedImgSrc, setCroppedImgSrc] = useState("");

  const inputRef = useRef(null)

  const fileUpload = () => {
    console.log(inputRef.current)
    inputRef.current.click()
  }

  useEffect(() => {
    console.log(croppedImgSrc)
  }, [croppedImgSrc])


  const onFileChange = useCallback(
    async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || "");
            setIsOpen(true);
          }
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );

  const onMediaLoaded = useCallback((mediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > 6 / 1) {
      const result = 400 / (6 / 1) / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }
    const result = 400 / width;
    setZoom(result);
    setMinZoom(result);
  }, []);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImgSrc(croppedImage);
      setImage(croppedImage)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);

  const inputStyle = css`
   display: none;
  `

  const uploadButtonStyle = css`
    background: none;
    border: none;
    border: solid 1px #c7c7c7;
    width: 100%;
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
  `

  return (
    <div>
      <div className="file-upload-container">
        <button onClick={() => fileUpload()} css = {uploadButtonStyle}>
          <FileEarmarkImage size={50} opacity={0.5}/>
        </button>
        <input type="file" accept="image/*" onChange={onFileChange} ref={inputRef} css = {inputStyle}/>
      </div>
      <div className="img-container">
        {croppedImgSrc ? (
          <img src={croppedImgSrc} alt="Cropped" className="img" />
        ) : (<></>
        )}
      </div>
      <CropperModal
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        imgSrc={imgSrc}
        showCroppedImage={showCroppedImage}
        onMediaLoaded={onMediaLoaded}
        minZoom={minZoom}
      />
    </div>
  );
};
export default ImageCropper;
