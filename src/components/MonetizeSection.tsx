import React from "react";
import blogheaderhi2KeX2m from "../assets/images/blog-header-hi2KeX2m.png";
import { useReduxDispatch, useReduxSelector } from "../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../redux/modal-store";

const MonetizeSection: React.FC = () => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisibility());
  };

  if (user) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm">
          
          {/* Yuqori qism: Rasm (100% kenglikda) */}
          <div className="relative w-full h-[250px] sm:h-[400px] overflow-hidden">
            <img
              src={blogheaderhi2KeX2m}
              alt="Monetize content"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            {/* Rasm ustidagi gradient qatlam */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
          </div>

          {/* Pastki qism: Kontent */}
          <div className="p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-green-100 text-[#46A358] text-xs font-bold uppercase tracking-widest">
                Creator Community
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              O'z kontentingiz orqali <br />
              <span className="text-[#46A358]">daromad olishni boshlang</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              GreenShop platformasida o'z tajribangiz bilan ulashing. Maqolalar yozing, 
              maslahatlar bering va o'simliklar dunyosidagi eng katta hamjamiyatning bir qismiga aylaning.
            </p>

            {/* Tugmalar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openAuthModal}
                className="w-full sm:w-auto px-10 py-4 bg-[#46A358] hover:bg-[#3a8b4a] text-white font-bold rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95"
              >
                Hozir qo'shiling
              </button>
              
              <button className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-gray-100 hover:border-green-200 text-gray-700 font-bold rounded-2xl transition-all active:scale-95">
                Batafsil ko'rish
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MonetizeSection;