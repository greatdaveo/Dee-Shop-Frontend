import React, { useEffect, useState } from "react";
import "../../styles/pages/profile/ProfilePage.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import NavBar from "../../components/homepage/NavBar";
import PageMenu from "../../components/page_menu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSlice,
  updatePhotoSlice,
  updateUserSlice,
} from "../../redux/auth/authSlice";
import Loader from "../../components/loader/loader";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";

// For the Cloudinary implementation
const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL;

const ProfilePage = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.address || "",
      country: user?.address?.country || "",
    },
  };

  const [profileData, setProfileData] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  // To fetch the user data from the backend
  useEffect(() => {
    if (user === null) {
      dispatch(getUserSlice());
    }
  }, [dispatch, user]);

  // To set the backend data to the profile input
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: user?.address || {
          address: user?.address?.address || "",
          state: user?.address?.address || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: profileData.name,
      phone: profileData.phone,
      address: {
        address: profileData.address,
        state: profileData.state,
        country: profileData.country,
      },
    };

    await dispatch(updateUserSlice(userData));
    // console.log("User Data: ", userData);
  };

  const handleUploadedPhoto = async (e) => {
    e.preventDefault();
    let imageURL;

    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);
        // To save the image to cloudinary
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: image,
        });

        const imgData = await response.json();
        // console.log(imgData);

        imageURL = imgData.url.toString();
      }

      // To Save the uploaded profile image to the MongoDB database
      const userData = { photo: profileImage ? imageURL : profileImage.photo };
      await dispatch(updatePhotoSlice(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="nav">
        <NavBar />
      </div>

      <div>
        <PageMenu />
      </div>

      <section>
        {isLoading && <Loader />}
        <div className="profile-photo">
          <div className="photo-preview">
            <img
              src={imagePreview === null ? user?.photo : imagePreview}
              alt={profileData.name + "profile photo"}
            />

            <h3>Role: {profileData.role}</h3>
            {imagePreview !== null && (
              <button className="photo-btn" onClick={handleUploadedPhoto}>
                <AiOutlineCloudUpload size={18} /> Upload Photo
              </button>
            )}
          </div>
        </div>

        {!isLoading && (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label id="image">Change Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <label id="name">Name:</label> <br />
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label id="email">Email:</label> <br />
                <input
                  type="text"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled
                  required
                />
              </div>

              <div>
                <label id="phone">Phone:</label> <br />
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label id="address">Address:</label> <br />
                <input
                  type="text"
                  name="address"
                  value={profileData?.address?.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label id="state">State:</label> <br />
                <input
                  type="text"
                  name="state"
                  value={profileData?.address?.state}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label id="country">State:</label> <br />
                <input
                  type="text"
                  name="country"
                  value={profileData?.address?.country}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="btn">UPDATE PROFILE</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

// For the Username settings
export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || "...";

  return (
    <span style={{ color: "gold", fontSize: "0.9rem" }}>
      {" "}
      Hi, {shortenText(username, 9)} |{" "}
    </span>
  );
};

export default ProfilePage;
