import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { message, Modal } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SolutionOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { AuthType } from "../@types/AuthType";
import Wishlist from "../components/Profile/Wishlist";
import { useReduxDispatch } from "../hooks/useRedux/useRedux";
import { logout } from "../redux/user-slice";
import Address from "../components/Profile/Address";
import MyProducts from "../components/Profile/MyProducts";
import TrackOrder from "../components/Profile/TrackOrder";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { tab } = useParams();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const activeTab = tab || "account-details";

  const [userData, setUserData] = useState<AuthType | null>(() => {
    const cookieUser = Cookies.get("user");
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const menuItems = [
    { key: "account-details", label: "Account Details", icon: <UserOutlined /> },
    { key: "my-products", label: "My Products", icon: <ShoppingOutlined /> },
    { key: "address", label: "Address", icon: <EnvironmentOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "track-order", label: "Track Order", icon: <SolutionOutlined /> },
  ];

  const confirmLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    dispatch(logout());
    message.success("Muvaffaqiyatli tizimdan chiqildi!");
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleAccountDetailsSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUser = {
      ...userData,
      name: formData.get("firstname"),
      surname: formData.get("lastname"),
      email: formData.get("email"),
      phone_number: formData.get("phone"),
    } as AuthType;

    Cookies.set("user", JSON.stringify(updatedUser));
    setUserData(updatedUser);
    message.success("O'zgarishlar saqlandi!");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-10 pb-20">
      <div className="w-[95%] max-w-[1200px] m-auto flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-[300px] flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            {/* User Profile Summary */}
            <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-50 text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#46A358] to-emerald-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-green-100 mb-4">
                {userData?.name?.charAt(0)}{userData?.surname?.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-gray-800 leading-tight">
                {userData?.name} {userData?.surname}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{userData?.email}</p>
            </div>

            <nav>
              <ul className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <li
                    key={item.key}
                    onClick={() => navigate(`/profile/${item.key}`)}
                    className={`group cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.key
                        ? "bg-[#46A358]/5 text-[#46A358]"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg transition-transform group-hover:scale-110 ${activeTab === item.key ? "text-[#46A358]" : "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span className={`text-[15px] ${activeTab === item.key ? "font-bold" : "font-medium"}`}>
                        {item.label}
                      </span>
                    </div>
                    {activeTab === item.key && <RightOutlined className="text-[10px]" />}
                  </li>
                ))}
                
                <li
                  onClick={() => setShowLogoutModal(true)}
                  className="mt-4 border-t border-gray-50 pt-4 cursor-pointer flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogoutOutlined className="text-lg" />
                  <span className="font-medium">Logout</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
          {activeTab === "account-details" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10">
                <h2 className="text-2xl font-black text-gray-900">Personal Information</h2>
                <p className="text-gray-500 mt-2">Update your profile details and contact information.</p>
              </div>

              <form onSubmit={handleAccountDetailsSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">First Name</label>
                    <input
                      required
                      name="firstname"
                      defaultValue={userData?.name}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#46A358]/10 focus:border-[#46A358] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">Last Name</label>
                    <input
                      required
                      name="lastname"
                      defaultValue={userData?.surname}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#46A358]/10 focus:border-[#46A358] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      defaultValue={userData?.email}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#46A358]/10 focus:border-[#46A358] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-bold text-gray-700 ml-1">Phone Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-5 text-gray-400 font-medium border-r pr-3 border-gray-200">
                        +998
                      </span>
                      <input
                        required
                        name="phone"
                        defaultValue={userData?.phone_number}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-20 pr-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-[#46A358]/10 focus:border-[#46A358] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-12 py-4 bg-[#46A358] text-white font-bold rounded-2xl hover:bg-[#388a4a] hover:shadow-xl hover:shadow-green-100 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "address" && <Address user={userData} setUser={setUserData} />}
          {activeTab === "my-products" && <MyProducts />}
          {activeTab === "wishlist" && <Wishlist />}
          {activeTab === "track-order" && <TrackOrder />}
        </div>
      </div>

      <Modal
        title={null}
        footer={null}
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        centered
        width={400}
        className="rounded-3xl overflow-hidden"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            <LogoutOutlined />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
          <p className="text-gray-500 mt-2 px-6">Are you sure you want to log out from your account?</p>
          <div className="flex gap-4 mt-8 px-4">
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={confirmLogout}
              className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;