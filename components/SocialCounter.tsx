import React, { useState, useEffect } from "react";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

interface SocialCounterProps {
  platform: "youtube" | "instagram" | "twitter";
}

const SocialCounter: React.FC<SocialCounterProps> = ({ platform }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulating API call to get follower/subscriber count
    const fetchCount = async () => {
      // Replace this with actual API calls in production
      const mockCounts = {
        youtube: 100000,
        instagram: 50000,
        twitter: 75000,
      };

      setTimeout(() => {
        setCount(mockCounts[platform]);
      }, 1000);
    };

    fetchCount();
  }, [platform]);

  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  const getIcon = () => {
    switch (platform) {
      case "youtube":
        return <FaYoutube className="text-2xl" />;
      case "instagram":
        return <FaInstagram className="text-2xl" />;
      case "twitter":
        return <FaTwitter className="text-2xl" />;
    }
  };

  const getColor = () => {
    switch (platform) {
      case "youtube":
        return "bg-red-600";
      case "instagram":
        return "bg-pink-600";
      case "twitter":
        return "bg-blue-400";
    }
  };

  return (
    <div
      className={`flex items-center space-x-2 ${getColor()} px-4 py-2 rounded`}
    >
      {getIcon()}
      <span className="font-bold">{formatCount(count)}</span>
    </div>
  );
};

export default SocialCounter;
