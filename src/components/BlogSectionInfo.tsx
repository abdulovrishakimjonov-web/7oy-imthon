import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegHeart, FaSearch, FaArrowRight } from "react-icons/fa";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { useReduxSelector } from "../hooks/useRedux/useRedux";

interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_at: string;
  created_by: string;
  views?: number;
  likes?: number;
  comments_count?: number;
}

const BlogSectionInfo = () => {
  const navigate = useNavigate();
  // const user = useReduxSelector((state: any) => state.userSlice.user);
  const skeletonArray = [1, 2, 3, 4, 5, 6];

  const [searchTerm, setSearchTerm] = useState("");
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: apiData = [], isLoading: apiLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });
 
  useEffect(() => {
    if (apiData.length > 0) {
      setAllBlogs(apiData);
      setFilteredBlogs(apiData);
    } else {
      const stored = localStorage.getItem("blogs_cache");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAllBlogs(parsed);
        setFilteredBlogs(parsed);
      }
    }
  }, [apiData]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const filtered = allBlogs.filter((blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header qismi */}
        <div className="border-b border-gray-100 pb-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Publications</h1>
            <p className="text-gray-500">Latest updates, garden care guides and plant stories.</p>
          </div>

          {/* Qidiruv - Minimalist */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#46a358] focus:ring-1 focus:ring-[#46a358] transition-all text-sm"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#46a358]" onClick={handleSearch} />
          </div>
        </div>

        {/* Bloglar To'plami */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isSearching || (apiLoading && allBlogs.length === 0) ? (
            skeletonArray.map((_, idx) => (
              <div key={idx} className="border border-gray-100 p-6 rounded-md animate-pulse h-64 flex flex-col">
                <div className="h-4 bg-gray-100 w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-100 w-full mb-4"></div>
                <div className="h-4 bg-gray-50 w-full mb-2"></div>
                <div className="h-4 bg-gray-50 w-2/3"></div>
              </div>
            ))
          ) : filteredBlogs.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-200 rounded-md">
              <p className="text-gray-400">No publications found matching your search.</p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="group p-6 border border-gray-100 rounded-md hover:border-[#46a358]/30 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full bg-white"
              >
                {/* Tepki qismi: Meta ma'lumotlar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-[#46a358] uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-sm">
                    {blog.created_by || "Plant Care"}
                  </span>
                  <span className="text-gray-400 text-[11px]">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Sarlavha */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#46a358] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Tavsif */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {blog.short_description || blog.content?.replace(/<[^>]*>/g, '')}
                </p>

                {/* Pastki qism: Statistika va Link */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaEye className="text-xs" />
                      <span className="text-[11px] font-medium">{blog.views ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegHeart className="text-xs" />
                      <span className="text-[11px] font-medium">{blog.likes ?? 0}</span>
                    </div>
                  </div>
                  
                  <span className="text-[#46a358] text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSectionInfo;