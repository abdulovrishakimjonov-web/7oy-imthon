import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "../../@types/AuthType";
import Card from "../dashboard/Card";
import { ShoppingBag, Heart, ArrowLeft, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modal-store";

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  const user = useReduxSelector((state: any) => state.userSlice.user);

  useEffect(() => {
    if (!user && !Cookies.get("token")) {
      dispatch(setAuthorizationModalVisibility());
      navigate("/");
      return;
    }

    loadWishlist();

    const handleWishlistUpdate = () => loadWishlist();
    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, [user, navigate, dispatch]);

  const loadWishlist = () => {
    try {
      setIsLoading(true);
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userObj = JSON.parse(userCookie);
        setWishlistProducts(userObj.wishlist || []);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-green-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#46A358] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Saralanganlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 min-h-screen">
      {/* Sahifa sarlavhasi */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">Mening istaklarim</h1>
            <p className="text-gray-500 text-sm">{wishlistProducts.length} ta mahsulot saqlangan</p>
          </div>
        </div>
        
        {wishlistProducts.length > 0 && (
          <button className="hidden sm:flex items-center gap-2 text-red-500 hover:text-red-600 font-medium text-sm transition-colors">
            <Trash2 size={18} />
            Hammasini tozalash
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        /* Bo'sh holat dizayni */
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center">
              <Heart size={56} className="text-[#46A358] opacity-20" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ShoppingBag size={24} className="text-[#46A358]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Istaklar ro'yxati bo'sh</h2>
          <p className="text-gray-500 text-center max-w-sm mb-8 leading-relaxed">
            Hali hech qanday mahsulotni saqlamadingiz. O'zingizga yoqqan o'simliklarni keyinchalik sotib olish uchun saqlab qo'ying.
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-[#46A358] text-white font-bold rounded-2xl hover:bg-[#388a4a] hover:shadow-xl hover:shadow-green-100 transition-all active:scale-95 flex items-center gap-3"
          >
            <ShoppingBag size={20} />
            Xaridni boshlash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {wishlistProducts.map((product) => (
            <div key={product._id} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-b from-green-50 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <Card product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;