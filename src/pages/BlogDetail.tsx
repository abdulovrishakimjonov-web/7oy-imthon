import React from "react";
import { useParams } from "react-router-dom";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import { FaEye, FaRegComment, FaRegHeart, FaShareAlt, FaRegBookmark, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_by: string;
  created_at: string;
  reaction_length: number;
  views?: number;
  likes?: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: blogData, isLoading, error } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: `blog-detail-${id}`,
    param: {},
  });

  if (isLoading)
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-full mb-6"></div>
          <div className="h-6 bg-gray-100 rounded w-5/6 mb-12"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-4 bg-gray-50 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error || !blogData)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <p className="text-xl font-medium">Blog topilmadi yoki xatolik yuz berdi</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#46A358] hover:underline">Orqaga qaytish</button>
      </div>
    );

  const blog = Array.isArray(blogData) ? (blogData[0] as BlogType) : (blogData as BlogType);

  return (
    <article className="min-h-screen bg-[#FCFCFC] pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 group"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Orqaga</span>
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.2] tracking-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-100 to-green-50 flex items-center justify-center text-[#46A358] font-bold text-xl border border-green-200">
                {blog.created_by?.charAt(0) || 'G'}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">{blog.created_by || "Admin"}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.created_at).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric', year: 'numeric' })} · 5 min o'qish
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <FaRegBookmark className="cursor-pointer hover:text-black transition-colors" size={20} />
              <FaShareAlt className="cursor-pointer hover:text-black transition-colors" size={20} />
            </div>
          </div>
        </header>

        {blog.short_description && (
          <p className="text-xl md:text-2xl text-gray-500 italic mb-10 leading-relaxed font-light">
            "{blog.short_description}"
          </p>
        )}

        <main className="mb-12">
          <div
            className="prose prose-lg prose-green max-w-none text-gray-800 leading-[1.8] 
              first-letter:text-5xl first-letter:font-bold first-letter:text-[#46A358] first-letter:mr-3 first-letter:float-left"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </main>

        <footer className="sticky bottom-6 mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-full shadow-xl flex items-center justify-center gap-8 w-max mx-auto transition-all hover:border-green-200">
            <button className="flex items-center gap-2 group text-gray-600 hover:text-red-500 transition-colors">
              <FaRegHeart className="group-active:scale-125 transition-transform" />
              <span className="text-sm font-medium">{blog.likes ?? 0}</span>
            </button>
            
            <div className="w-px h-4 bg-gray-200"></div>

            <button className="flex items-center gap-2 group text-gray-600 hover:text-[#46A358] transition-colors">
              <FaRegComment />
              <span className="text-sm font-medium">{blog.reaction_length ?? 0}</span>
            </button>

            <div className="w-px h-4 bg-gray-200"></div>

            <div className="flex items-center gap-2 text-gray-400">
              <FaEye size={14} />
              <span className="text-xs">{blog.views ?? 0}</span>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogDetail;