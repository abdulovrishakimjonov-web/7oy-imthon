import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { ShopCartType } from "../@types/AuthType";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data } = useSelector((state: any) => state.shopSlice);

  const subtotal = data?.reduce((acc: number, item: ShopCartType) => acc + (item.userPrice || 0), 0) || 0;
  const shipping = 16.0;
  const total = subtotal + shipping;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length === 0) {
      message.error("Savat bo'sh!");
      return;
    }
    setIsModalOpen(true);
  };

  const InputField = ({ label, required, ...props }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-semibold text-[#3D3D3D] flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#46A358] focus:ring-2 focus:ring-[#46A358]/10 transition-all placeholder:text-gray-300 text-[15px]"
      />
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-10 px-4">
      <div className="max-w-[1200px] m-auto">
        <h1 className="text-2xl font-bold text-[#3D3D3D] mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDE: BILLING FORM */}
          <div className="w-full lg:w-[65%] bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#46A358] rounded-full"></span>
              Billing Address
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" required type="text" placeholder="John" />
                <InputField label="Last Name" required type="text" placeholder="Doe" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Country / Region" required type="text" placeholder="Uzbekistan" />
                <InputField label="Town / City" required type="text" placeholder="Tashkent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Street Address" required type="text" placeholder="House number and street name" />
                <InputField label="Apartment" type="text" placeholder="Appartment, suite, unit, etc. (optional)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="State" required type="text" placeholder="Select state" />
                <InputField label="Zip Code" required type="text" placeholder="100000" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Email Address" required type="email" placeholder="example@mail.com" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-semibold text-[#3D3D3D]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#46A358]/10 focus-within:border-[#46A358] transition-all">
                    <span className="bg-gray-50 px-3 py-2.5 text-gray-500 border-r border-gray-100 flex items-center text-sm font-medium">
                      +998
                    </span>
                    <input required type="tel" className="w-full px-4 outline-none text-[15px]" placeholder="90 123 45 67" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <label className="text-[14px] font-semibold text-[#3D3D3D] block mb-2">Order Notes (optional)</label>
                <textarea 
                  className="w-full border border-gray-200 rounded-lg p-4 outline-none focus:border-[#46A358] focus:ring-2 focus:ring-[#46A358]/10 transition-all h-32 resize-none"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SUMMARY & PAYMENT */}
          <div className="w-full lg:w-[35%] sticky top-6 space-y-6">
            
            {/* Order Items Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-4">Your Order</h2>
              <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {data?.map((item: ShopCartType) => (
                  <div key={item._id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <img src={item.main_image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#3D3D3D] line-clamp-1 w-32">{item.title}</h4>
                        <p className="text-xs text-gray-400">Qty: {item.counter}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#46A358] text-sm">${(item.price * item.counter).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 pt-4 border-t border-gray-50">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3D3D3D]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#3D3D3D]">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-[#3D3D3D]">Total</span>
                  <span className="text-xl font-black text-[#46A358]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-4">Payment Method</h2>
              <Radio.Group 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                value={paymentMethod} 
                className="w-full space-y-3"
              >
                {[
                  { id: 'paypal', label: 'Online Payment', icons: true },
                  { id: 'bank', label: 'Bank Transfer', icons: false },
                  { id: 'cash', label: 'Cash on Delivery', icons: false }
                ].map((method) => (
                  <label 
                    key={method.id}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id ? "border-[#46A358] bg-green-50/30" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Radio value={method.id} />
                      <span className="text-sm font-bold text-[#3D3D3D]">{method.label}</span>
                    </div>
                    {method.icons && (
                      <div className="flex gap-1 opacity-80 scale-90">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-3" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3" alt="" />
                      </div>
                    )}
                  </label>
                ))}
              </Radio.Group>

              <button
                type="submit"
                className="w-full mt-6 bg-[#46A358] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-[#357c44] shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>

        {/* MODAL QISMI (O'zgarishsiz qoldi, faqat paddinglar biroz to'g'irlandi) */}
        <Modal
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  width={600}
  centered
  maskClosable={true}
  className="order-success-modal"
  bodyStyle={{ padding: '30px 40px' }}
>
  {/* Header qismi - Diqqatni tortuvchi animatsion ko'rinish */}
  <div className="flex flex-col items-center mb-8">
    <div className="relative">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
        <div className="w-14 h-14 bg-[#46A358] rounded-full flex items-center justify-center shadow-lg shadow-green-200">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
    <h2 className="text-[#3D3D3D] text-2xl font-bold mt-4">Raxmat!</h2>
    <p className="text-[#727272] text-[15px]">Buyurtmangiz muvaffaqiyatli qabul qilindi</p>
  </div>

  {/* Buyurtma ma'lumotlari - Minimalist Box stilida */}
  <div className="bg-[#FBFBFB] rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border border-gray-100">
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[#A5A5A5] mb-1">Buyurtma №</p>
      <p className="text-[14px] font-bold text-[#3D3D3D]">#19586687</p>
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[#A5A5A5] mb-1">Sana</p>
      <p className="text-[14px] font-bold text-[#3D3D3D]">{formattedDate}</p>
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[#A5A5A5] mb-1">Jami</p>
      <p className="text-[14px] font-bold text-[#46A358]">${total.toFixed(2)}</p>
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[#A5A5A5] mb-1">To'lov turi</p>
      <p className="text-[14px] font-bold text-[#3D3D3D]">
        {paymentMethod === "cash" ? "Naqd" : paymentMethod}
      </p>
    </div>
  </div>

  <h3 className="font-bold text-[17px] text-[#3D3D3D] mb-4 flex items-center gap-2">
    Buyurtma tafsilotlari
    <span className="h-[1px] flex-1 bg-gray-100"></span>
  </h3>

  {/* Mahsulotlar ro'yxati - Toza va chiroyli chiziqlar bilan */}
  <div className="flex flex-col gap-4 mb-6 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
    {data?.map((item: ShopCartType) => (
      <div
        key={item._id}
        className="flex justify-between items-center group transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1">
            <img
              src={item.main_image}
              alt={item.title}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <h4 className="font-semibold text-[14px] text-[#3D3D3D] line-clamp-1">
              {item.title}
            </h4>
            <p className="text-[12px] text-[#A5A5A5]">
              SKU: <span className="text-[#727272]">{item._id.slice(0, 8)}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[13px] text-[#727272]">x{item.counter}</p>
          <p className="font-bold text-[#46A358]">${(item.price * item.counter).toFixed(2)}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Hisob-kitob qismi */}
  <div className="bg-gray-50/50 rounded-xl p-4 border-t border-b border-dashed border-gray-200 mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[#727272] text-[14px]">Yetkazib berish</span>
      <span className="font-semibold text-[#3D3D3D]">${shipping.toFixed(2)}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[#3D3D3D] font-bold text-[16px]">Umumiy summa</span>
      <span className="font-black text-[#46A358] text-[22px]">
        ${total.toFixed(2)}
      </span>
    </div>
  </div>

  <p className="text-center text-[13px] text-[#969696] leading-relaxed mb-8 px-6">
    Buyurtmangiz tayyorlanmoqda. Tez orada elektron pochtangizga tasdiqlash xati va yetkazib berish sanasini yuboramiz.
  </p>

  {/* Action tugmasi */}
  <div className="flex justify-center">
    <button
      onClick={() => navigate("/Profile")}
      className="group relative w-full md:w-auto bg-[#46A358] text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
    >
      Buyurtmani kuzatish
    </button>
  </div>
</Modal>
      </div>
    </div>
  );
};

export default CheckoutPage;