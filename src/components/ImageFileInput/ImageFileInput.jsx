import React, { useRef } from "react";

const ImageFileInput = ({ imageUploader, onFileChange }) => {
  const inputRef = useRef();

  const onChange = async (event) => {
    const uploaded = await imageUploader.upload(event.target.files[0]);
    onFileChange({
      url: uploaded.url,
    });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
    </div>
  );
};
export default ImageFileInput;
