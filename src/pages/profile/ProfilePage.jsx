import React, { useEffect, useState } from "react";
import "../../styles/pages/profile/ProfilePage.css";
import NavBar from "../../components/homepage/NavBar";
import PageMenu from "../../components/page_menu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import { getUserSlice } from "../../redux/features/auth/authSlice";

const ProfilePage = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    address: user?.address || {},
  };

  const [profileData, setProfileData] = useState(initialState);
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
        address: user?.address || {},
      });
    }
  }, [dispatch, user]);

  const handleImageChange = () => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handleInputChange = () => {};
  const handleSubmit = () => {};

  return (
    <div className="profile-container">
      <div className="nav">
        <NavBar />
      </div>

      <div>
        <PageMenu />
      </div>

      <section>
        <div></div>

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
                />
              </div>

              <div>
                <label id="email">Name:</label> <br />
                <input
                  type="text"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>

              <div>
                <label id="phone">Phone:</label> <br />
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label id="address">Address:</label> <br />
                <input
                  type="text"
                  name="address"
                  value={profileData?.address?.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label id="state">State:</label> <br />
                <input
                  type="text"
                  name="state"
                  value={profileData?.address?.state}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label id="country">State:</label> <br />
                <input
                  type="text"
                  name="country"
                  value={profileData?.address?.country}
                  onChange={handleInputChange}
                />
              </div>

              <button className="btn">SAVE</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
