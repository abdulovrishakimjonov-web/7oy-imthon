import React from "react";
import Ch9JE0GV from "../assets/images/1-Ch9JE0GV.png";
import BqD2fIC7 from "../assets/images/2-BqD2fIC7.png";
import Bg8f3bcT from "../assets/images/3-Bg8f3bcT.png";
import CGk6D0183277n from "../assets/images/4-CGk6Ds5n.png";

interface BlogPost {
  id: number;
  imageUrl: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: Ch9JE0GV,
    date: "September 12",
    readTime: "6 min read",
    title: "Cactus & Succulent Care Tips",
    description: "Cacti are succulents are easy care plants for any home or patio.",
  },
  {
    id: 2,
    imageUrl: BqD2fIC7,
    date: "September 13",
    readTime: "2 min read",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
  },
  {
    id: 3,
    imageUrl: Bg8f3bcT,
    date: "September 15",
    readTime: "3 min read",
    title: "Cacti & Succulent Care Tips",
    description: "Cacti and succulents thrive in containers and because most are.",
  },
  {
    id: 4,
    imageUrl: CGk6D0183277n,
    date: "September 12",
    readTime: "6 min read",
    title: "Best Houseplants Room by Room",
    description: "The benefits of houseplants are endless. In addition to..",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#262626] mb-4">
              Our <span className="text-[#46A358]">Latest</span> Blog Posts
            </h2>
            <p className="text-gray-500 leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants. Learn how to care for them.
            </p>
          </div>
          <button className="hidden md:block bg-[#46A358] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#3a8b4a] transition-all">
            View All Posts
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[11px] font-bold text-[#46A358] uppercase tracking-wider">
                    Plant Care
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 text-[12px] mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2 w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#46A358] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>

                {/* Styled Link */}
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-bold text-[#262626] group-hover:text-[#46A358] transition-all mt-auto"
                >
                  <span className="border-b-2 border-transparent group-hover:border-[#46A358] pb-0.5">
                    Read Story
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <button className="w-full mt-10 md:hidden border-2 border-[#46A358] text-[#46A358] py-3 rounded-xl font-bold">
          View All Posts
        </button>
      </div>
    </section>
  );
};

export default BlogSection;