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
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gray-50">
      {/* Orqa fondagi dekorativ doiralar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          {/* Chap tomon: Rasm (Banner) */}
          <div className="w-full lg:w-1/2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src={blogheaderhi2KeX2m}
                alt="GreenShop Banner"
                className="relative w-full h-[300px] sm:h-[400px] object-cover rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* O'ng tomon: Matn va Tugma */}
          <div className="w-full lg:w-1/2 text-left">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full">
              Imkoniyatni qo'ldan boy bermang
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Monetize your content <br />
              with <span className="text-[#46A358] relative">
                GreenShop
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="#46A358" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              GreenShop - bu nafaqat do'kon, balki ijodkorlar uchun platforma. 
              Gullar haqidagi maqolalar, videolar va podkastlaringizni nashr qiling 
              va bugunoq daromad olishni boshlang.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={openAuthModal}
                className="inline-flex items-center justify-center bg-[#46a358] hover:bg-[#3a8b4a] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(70,163,88,0.5)] active:scale-95"
              >
                Join GreenShop
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="inline-flex items-center justify-center border-2 border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-600 font-bold py-4 px-10 rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MonetizeSection;