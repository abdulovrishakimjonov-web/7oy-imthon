import React from "react";
import footer1 from "../../assets/images/footer-img-1.png";
import footer2 from "../../assets/images/footer-img-2.png";
import footer3 from "../../assets/images/footer-img-3.png";
import logo from "../../assets/images/Logo.svg";
import location from "../../assets/images/Location.svg";
import masage from "../../assets/images/Message.svg";
import phone from "../../assets/images/phone.svg";
import facebook from "../../assets/images/Facebook.svg"
import instagram from "../../assets/images/Instagram.svg"
import tiwiter from "../../assets/images/Twitter.svg"
import lincuden from "../../assets/images/Linkedin.svg"
import yutube from "../../assets/images/yutube.svg"
import viza from "../../assets/images/viza.svg"

const Footer = () => {
  return (
    <footer className="max-w-[1200px] bg-[#F0FDF4] m-auto">
      <div className="py-[31px] px-[23px] flex gap-[50px] items-center">
        <div>
          <img src={footer1} alt="" className="mb-[15px]" />
          <h4 className="text-[#212121] font-bold mb-[9px]">Garden Care</h4>
          <p className="text-[#727272] text-[14px]">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div className="w-[1px] h-[187px] bg-[#46A3581A] opacity-[10px]"></div>
        <div>
          <img src={footer2} alt="" className="mb-[15px]" />
          <h4 className="text-[#212121] font-bold mb-[9px]">Plant Renovation</h4>
          <p className="text-[#727272] text-[14px]">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div className="w-[1px] h-[187px] bg-[#46A3581A] opacity-[10px]"></div>
        <div>
          <img src={footer3} alt="" className="mb-[15px]" />
          <h4 className="text-[#212121] font-bold mb-[9px]">Watering Graden</h4>
          <p className="text-[#727272] text-[14px]">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div>
          <h4 className="text-[#1c1c1c] text-[16px] mb-[18px]">
            Would you like to join newsletters?
          </h4>
          <div className="flex w-full mb-4 shadow-sm rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="enter your email address..."
              className="flex-1 min-w-[120px] p-3 text-sm border border-gray-200 focus:outline-none focus:border-green-500 rounded-l-md"
            />
            <button className="bg-[#14532D] cursor-pointer text-white px-6 py-3 font-bold text-sm rounded-r-md hover:bg-[#166534] transition-colors">
              Join
            </button>
          </div>
          <p className="text-[#727272] text-[13px]">
            We usually post offers and challenges in newsletter. We’re <br />{" "}
            your online houseplant destination. We offer a wide range <br /> of
            houseplants and accessories shipped directly from our <br />{" "}
            (green)house to yours!{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[107px] py-[27px] px-[23px] mb-[33px] bg-[#d3ffe0]">
        <img src={logo} alt="" />
        <div className="flex items-center gap-[9px] ">
          <img src={location} alt="" />
          <p className="text-[#3D3D3D] text-[14px]">
            70 West Buckingham Ave. <br />
            Farmingdale, NY 11735
          </p>
        </div>
        <div className="flex items-center gap-[9px]">
          <img src={masage} alt="" />
          <p className="text-[#3D3D3D] text-[14px]">contact@greenshop.com</p>
        </div>
        <div className="flex items-center gap-[9px]">
          <img src={phone} alt="" />
          <p className="text-[#3D3D3D] text-[14px]">+88 01911 717 490</p>
        </div>
      </div>
      <div className="flex items-center gap-[155px] mb-[20px]">
        <div className="flex flex-col gap-[10px] px-[23px]">
          <b className="text-[#262525] text-[18px] font-bold">My Account</b>
          <a className="text-[#3D3D3D] text-[14px]" href="#">My Account</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Our stores</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Contact us</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Career</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Specials</a>
        </div>
        <div className="flex flex-col gap-[10px] px-[23px]">
          <b className="text-[#262525] text-[18px] font-bold">Help & Guide</b>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Help Center</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">How to Buy</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Shipping & Delivery</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Product Policy</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">How to Return</a>
        </div>
        <div className="flex flex-col gap-[10px] px-[23px]">
          <b className="text-[#262525] text-[18px] font-bold">Categories</b>
          <a className="text-[#3D3D3D] text-[14px]" href="#">House Plants</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Potter Plants</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Seeds</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Small Plants</a>
          <a className="text-[#3D3D3D] text-[14px]" href="#">Accessorie</a>
        </div>
        <div>
          <h4 className="text-[#272727] text-[18px] font-bold mb-[20px]">Social Media</h4>
          <div className="flex gap-[10px] mb-[33px]">
            <img className="border-2 border-[#d3ffe0] cursor-pointer rounded-md py-2 px-4" src={facebook} alt="" />
            <img className="border-2 border-[#d3ffe0] cursor-pointer rounded-md py-2 px-3" src={instagram} alt="" />
            <img className="border-2 border-[#d3ffe0] cursor-pointer rounded-md py-2 px-3" src={tiwiter} alt="" />
            <img className="border-2 border-[#d3ffe0] cursor-pointer rounded-md py-2 px-3" src={lincuden} alt="" />
            <img className="border-2 border-[#d3ffe0] cursor-pointer rounded-md py-2 px-3" src={yutube} alt="" />
          </div>
          <p className="text-[#272727] text-[18px] mb-[13px] font-bold">We accept</p>
        <img src={viza} alt="" />
        </div>
      </div>
      <div className="py-">
        <div className="w-full h-[1px] bg-[#46A35833]"></div>
        <p className="text-center text-[14px] text-[#3D3D3D] py-4">© 2021 GreenShop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
