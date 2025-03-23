import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import GlassCard from "../common/GlassCard";
import { Newspaper, Clock, AlertCircle } from "lucide-react";

interface NewsArticle {
  title: string;
  source: { name: string };
  url: string;
  publishedAt: string;
  description: string;
  urlToImage?: string;
}

const NEWS_API_KEY = "aa00be2e79ba43028c1c2c4797ef796b";

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");

  const fetchNews = useCallback(async () => {
    try {
      setNewsLoading(true);
      const response = await axios.get<{ articles: NewsArticle[] }>(
        `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${NEWS_API_KEY}`
      );
      setNews(response.data.articles.slice(0, 5));
      setNewsError("");
    } catch (error) {
      setNewsError("Failed to load financial news. Please try again later.");
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const newsInterval = setInterval(fetchNews, 300000);
    return () => clearInterval(newsInterval);
  }, [fetchNews]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric"
    });
  };

  return (
        <><Navbar /><GlassCard className="h-full p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center gap-3 mb-6">
              <Newspaper className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Financial Updates
              </h2>
          </div>

          {newsLoading ? (
              <div className="space-y-5">
                  {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-200/30 rounded-full w-4/5"></div>
                          <div className="flex items-center gap-2 text-gray-400">
                              <div className="h-3 bg-gray-200/30 rounded-full w-24"></div>
                              <div className="h-3 bg-gray-200/30 rounded-full w-16"></div>
                          </div>
                          <div className="h-12 bg-gray-200/30 rounded-lg"></div>
                      </div>
                  ))}
              </div>
          ) : newsError ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-red-300 text-lg font-medium">{newsError}</p>
              </div>
          ) : (
              <div className="space-y-5">
                  {news.map((article, index) => (
                      <a
                          key={index}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group hover:bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-xl transition-all duration-300"
                      >
                          <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 relative">
                                  {article.urlToImage ? (
                                      <img
                                          src={article.urlToImage}
                                          alt={article.title}
                                          className="w-24 h-24 object-cover rounded-lg shadow-lg" />
                                  ) : (
                                      <div className="w-24 h-24 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                          <Newspaper className="w-8 h-8 text-gray-500" />
                                      </div>
                                  )}
                              </div>

                              <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                                      {article.title}
                                  </h3>

                                  {article.description && (
                                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                          {article.description}
                                      </p>
                                  )}

                                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                                      <span className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          {formatDate(article.publishedAt)}
                                      </span>
                                      <span className="h-1 w-1 bg-gray-600 rounded-full"></span>
                                      <span className="font-medium text-gray-300">
                                          {article.source.name}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </a>
                  ))}
              </div>
          )}
      </GlassCard></>
  );
};

export default NewsFeed;