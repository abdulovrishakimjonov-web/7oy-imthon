import React from "react";

const MyProducts = () => {
  return (
    <div>
      <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-6">
        My Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-md p-4">
          <img
            src="https://via.placeholder.com/200"
            alt="product"
            className="w-full h-[150px] object-cover mb-3"
          />
          <h3 className="text-[15px] font-medium">Product name</h3>
          <p className="text-[#46A358] font-bold">$120</p>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
