import { useState, useEffect } from "react";
import { Slider, Skeleton, Empty } from "antd";
import { useQueryHandler } from "../../hooks/useQuery/UseQuery";
import type { CategoryType, ProductType, QueryType } from "../../@types/AuthType";
import Card from "./Card";
import { useSearchParamsHandler } from "../../hooks/paramsApi/paramsApi";
import ProductsTitle from "./products_title/ProductsTitleSection";
import Discount from "./Discount";
import { RightOutlined, LeftOutlined, FilterOutlined } from "@ant-design/icons";

const ShopPage = () => {
  const { getParam, setParam } = useSearchParamsHandler();

  const range_max = Number(getParam("range_max")) || 1000;
  const range_min = Number(getParam("range_min")) || 0;
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";
  const category = getParam("category") || "house-plants";

  const [slider, setSlider] = useState<number[]>([range_min, range_max]);

  useEffect(() => {
    setSlider([range_min, range_max]);
  }, [range_min, range_max]);

  const { data: categoryData, isLoading: categoryLoading }: QueryType<CategoryType[]> = useQueryHandler({
    url: "flower/category",
    pathname: "category",
  });

  const { data: productsData, isLoading: productsLoading, isError: productsError }: QueryType<ProductType[]> = useQueryHandler({
    url: `flower/category/${category}`,
    pathname: `products-${category}-${range_min}-${range_max}-${type}-${sort}`,
    param: { range_min, range_max, type, sort },
  });

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0 mt-8 mb-20">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full lg:w-[280px] flex flex-col gap-8">
          <div className="bg-[#fbfdfb] border border-gray-100 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
              <FilterOutlined className="text-[#166534]" />
              <h3 className="font-bold text-lg text-gray-800">Categories</h3>
            </div>
            
            <nav className="flex flex-col gap-1">
              {categoryLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => <Skeleton.Button key={i} active block size="small" />)}
                </div>
              ) : (
                categoryData?.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setParam({ category: cat.route_path, range_min, range_max, type, sort })}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group
                      ${category === cat.route_path 
                        ? "bg-green-50 text-[#166534] font-bold shadow-sm" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-green-600"}
                    `}
                  >
                    <span className="text-[15px]">{cat.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full 
                      ${category === cat.route_path ? "bg-green-200" : "bg-gray-100 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600"}`}>
                      {cat.count}
                    </span>
                  </button>
                ))
              )}
            </nav>

            {/* Price Filter */}
            <div className="mt-10">
              <h3 className="font-bold text-gray-800 mb-6">Price Range</h3>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={slider}
                  onChange={(val) => setSlider(val)}
                  trackStyle={[{ backgroundColor: "#166534", height: 6 }]}
                  handleStyle={[
                    { borderColor: "#166534", backgroundColor: "#fff", borderWeight: 3, width: 18, height: 18 },
                    { borderColor: "#166534", backgroundColor: "#fff", borderWeight: 3, width: 18, height: 18 },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500 font-medium">
                  Range: <span className="text-gray-800 font-bold">${slider[0]} - ${slider[1]}</span>
                </p>
                <button
                  onClick={() => setParam({ category, range_min: slider[0], range_max: slider[1], type, sort })}
                  className="bg-[#166534] text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-[#114d27] transition-all shadow-md active:scale-95"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <Discount />
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          <div className="mb-6 bg-white p-2 rounded-xl border border-gray-50 shadow-sm">
            <ProductsTitle />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[600px]">
            {productsError ? (
              <div className="col-span-full flex items-center justify-center"><Empty description="Serverda xatolik yuz berdi" /></div>
            ) : productsLoading ? (
              skeletons.map((_, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center h-[350px] animate-pulse">
                  <div className="w-full h-52 bg-gray-50 rounded-xl mb-4" />
                  <div className="w-3/4 h-5 bg-gray-100 rounded mb-2" />
                  <div className="w-1/2 h-5 bg-gray-50 rounded" />
                </div>
              ))
            ) : productsData?.length === 0 ? (
              <div className="col-span-full flex items-center justify-center"><Empty description="Mahsulot topilmadi" /></div>
            ) : (
              productsData?.map((product) => (
                <Card key={product._id} product={product} />
              ))
            )}
          </div>

          {/* --- PAGINATION --- */}
          <div className="flex gap-2 items-center justify-center lg:justify-end mt-16">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-green-600 hover:text-green-600 transition-all"><LeftOutlined /></button>
            {[1, 2, 3, 4].map(num => (
              <button 
                key={num}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all
                ${num === 1 
                  ? "bg-[#166534] text-white shadow-lg shadow-green-200" 
                  : "border border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600"}`}
              >
                {num}
              </button>
            ))}
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-green-600 hover:text-green-600 transition-all"><RightOutlined /></button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;