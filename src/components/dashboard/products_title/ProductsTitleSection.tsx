import { Select, ConfigProvider } from "antd";
import { products_title } from "../../../utils/utils";
import { useSearchParamsHandler } from "../../../hooks/paramsApi/paramsApi";

const ProductsTitleSection = () => {
  const { setParam, getParam } = useSearchParamsHandler();
  const category = getParam("category") || "house-plants";
  const range_max = Number(getParam("range_max")) || 1000;
  const range_min = Number(getParam("range_min")) || 0;
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";

  const changed = (e: string) => {
    setParam({ sort: e });
  };

  return (
    <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-2">
      
      {/* Tablar qismi */}
      <div className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth">
        {products_title.map((value) => (
          <h3
            key={value.id}
            onClick={() =>
              setParam({
                category,
                range_max,
                range_min,
                type: value.route_path,
              })
            }
            className={`text-[16px] transition-all duration-300 relative py-2 cursor-pointer whitespace-nowrap
              ${
                value.route_path === type
                  ? "text-[#166534] font-bold"
                  : "text-gray-500 hover:text-gray-800 font-medium"
              }`}
          >
            {value.title}
            {/* Aktiv tab ostidagi chiziq animatsiyasi */}
            <span 
              className={`absolute bottom-0 left-0 h-[3px] bg-[#166534] transition-all duration-300 rounded-full
                ${value.route_path === type ? "w-full opacity-100" : "w-0 opacity-0"}`}
            />
          </h3>
        ))}
      </div>

      {/* Saralash (Sort) qismi */}
      <div className="flex items-center gap-3 self-end md:self-center bg-gray-50/50 p-1 rounded-lg">
        <span className="text-gray-500 text-sm font-medium pl-2">
          Sort by:
        </span>
        
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#166534',
              borderRadius: 8,
              colorBorder: 'transparent',
              colorBgContainer: 'transparent',
            },
          }}
        >
          <Select
            onChange={changed}
            value={sort}
            variant="borderless"
            className="w-[160px] font-semibold text-gray-800"
            dropdownStyle={{ borderRadius: '12px', padding: '8px' }}
            options={[
              { value: "default-sorting", label: "Default Sorting" },
              { value: "the-cheapest", label: "The Cheapest" },
              { value: "most-expensive", label: "Most Expensive" },
            ]}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ProductsTitleSection;