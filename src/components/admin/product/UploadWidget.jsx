import React from "react";
import "../../../styles/components/admin/product/UploadWidget.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";

// For the Cloudinary implementation
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL;

const UploadWidget = ({ files, setFiles }) => {
  const [selectedImages, setSelectedImages] = useState([]); // This is displayed in the browser
  const [images, setImages] = useState([]); // This is uploaded to Cloudinary
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const addImages = (e) => {
    e.preventDefault();
    
    const selectedFiles = e.target.files;
    // This will make all the selected Images an array
    const selectedFilesArray = Array.from(selectedFiles);
    // To convert the selected Files into a URL
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    // To upload the image to cloudinary
    setImages((prevImages) => prevImages.concat(selectedFilesArray));
    // To add and update the selected images to existing images in the state
    setSelectedImages((prevImages) => prevImages.concat(imagesArray));
    // To clear the e.target input field
    e.target.value = "";
  };

  //   To remove uploaded image
  const removeImage = (image) => {
    const imgIndex = selectedImages.indexOf(image);
    // For the img uploaded and shown in the browser
    setSelectedImages(selectedImages.filter((img, i) => img !== image));
    // For the img uploaded on cloudinary
    setImages(images.filter((img, i) => i !== imgIndex));
    URL.revokeObjectURL(image);
  };

  // To upload the images added and shown in the browser to Clodinary
  const uploadImages = async () => {
    // console.log(images);
    setUploading(true);

    let imageUrls = [];
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      formData.append("folder", "DeeShop-Product-Img"); // To save all the images in a folder

      // To upload the images to the database
      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        // console.log(data);

        imageUrls.push(data.secure_url); //This is https link & it will push all the uploaded images url from cloudinary to imageUrls
        setProgress(imageUrls.length); // This will update the progress state as it is getting uploaded
        // if the uploaded images & the imageUrls are equal, it means the uploading process has finished
        if (imageUrls.length === images.length) {
          // After uploading it, the next is add it to the files state so as to save it in Mongo DB
          setFiles((prevFiles) => prevFiles.concat(imageUrls));
          setUploading(false);
          console.log(files); //This is the file that will be saved to Mongo DB
          toast.success("Image uploaded completely! ");
          setImages([]);
          setSelectedImages([]);
          setProgress(0);
        }
      } catch (error) {
        // console.log(error);
        setUploading(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="uploadWidget">
      <div className="upload-container">
        <label>
          <AiOutlineCloudUpload size={35} />
          <br />
          <span>Click to upload up to 5 images.</span>
          <br />
          <input
            type="file"
            name="images"
            onChange={addImages}
            multiple
            hidden
            accept="image/png, image/jpg, image/webp"
          />
        </label>
      </div>

      {selectedImages.length > 0 && selectedImages.length > 5 ? (
        <p className="error">
          You can't upload more than 5 images! <br />
          <span>
            Please remove <b>{selectedImages.length - 5} </b> of them!
          </span>
        </p>
      ) : (
        <button
          className="upload-img-btn"
          onClick={uploadImages}
          disabled={uploading}
        >
          {uploading
            ? `Uploading ${progress} of ${images.length}...`
            : `Upload ${images.length} Image(s)`}
        </button>
      )}

      {/* To View Selected Images*/}
      <div className={selectedImages.length > 0 ? "img-container" : ""}>
        {selectedImages !== 0 &&
          selectedImages.map((image, i) => {
            return (
              <div key={i} className="img">
                <img src={image} alt="Product Image" width={150} height={150} />

                <button onClick={() => removeImage(image)}>
                  <i>
                    <BsTrash size={25} />
                  </i>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UploadWidget;
