import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import MyImageCrop from "./MyImageCrop";
const MAX_WIDTH = 240;
const MAX_HEIGHT = 240;

const MyDropzone = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // use the 'typeof' keyword to get the type of the 'DropzoneAcceptedFile' value
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <div>
        {files.map((file) => (
          //   <img
          //     key={file.name}
          //     src={file.preview}
          //     style={{
          //       maxWidth: MAX_WIDTH,
          //       maxHeight: MAX_HEIGHT,
          //     }}
          //     alt="Preview"
          //   />
          <MyImageCrop imageSrc={file.preview} key={file.name}></MyImageCrop>
        ))}
      </div>
    </div>
  );
};
export default MyDropzone;
