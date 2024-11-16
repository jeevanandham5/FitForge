import { Button } from "antd";
import React, { useRef, useState, useEffect } from "react";

export default function Test() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    // Check for an image in localStorage when the component loads
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      const file = dataURLToFile(savedImage, "saved-image.png");
      setImage(file);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);

            // Convert the image blob to a Base64 string and store in localStorage
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
              localStorage.setItem("uploadedImage", reader.result);
            };
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const dataURLToFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full flex items-center flex-col">
      <label
        htmlFor="image-upload-input"
        className="block text-center text-gray-600 mb-4 text-lg font-medium"
      >
        {image ? "" : "Choose an image"}
      </label>
      <div
        onClick={handleClick}
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-full w-24 h-24 flex justify-center items-center mb-4 bg-gray-50"
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="h-20 w-20 object-cover rounded-full"
          />
        ) : (
          <img
            src="./photo.png"
            alt="Upload"
            className="h-20 w-20 object-contain"
          />
        )}
      </div>

      <input
        id="image-upload-input"
        type="file"
        onChange={handleImageChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />

      <Button onClick={handleClick} type="primary" size="small">
        {image ? "Change Image" : "Upload Image"}
      </Button>
    </div>
  );
}
