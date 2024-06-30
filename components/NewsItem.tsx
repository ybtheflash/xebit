import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsItemProps {
  item: {
    id: number;
    title: string;
    date: string;
    image: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <Image
        src={item.image}
        alt={item.title}
        width={400}
        height={225}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-gray-400 mb-4">
          {new Date(item.date).toLocaleDateString()}
        </p>
        <Link
          href={`/news/${item.id}`}
          className="text-[#ff1616] hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
