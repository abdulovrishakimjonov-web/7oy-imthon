import { Select } from "antd";
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
    <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
      
      <div className="flex flex-wrap items-center gap-4 md:gap-8">
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
            className={`text-[15px] transition-all duration-300 relative pb-1 cursor-pointer
              ${
                value.route_path === type
                  ? "text-[#166534] font-bold border-b-2 border-[#166534]"
                  : "text-[#222222] hover:text-[#166534] border-b-2 border-transparent"
              }`}
          >
            {value.title}
          </h3>
        ))}
      </div>

      <div className="flex items-center gap-2 justify-end md:justify-start">
        <span className="text-[#272727] text-[15px] whitespace-nowrap">
          Short by:
        </span>
        <Select
          onChange={changed}
          defaultValue={sort}
          style={{ width: 150 }}
          className="min-w-[150px]"
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Cheapest" },
            { value: "most-expensive", label: "Most Expensive" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsTitleSection;
