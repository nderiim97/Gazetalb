import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Lajme', icon: '📰' },
    { name: 'Sport', icon: '⚽' },
    { name: 'Ekonomi', icon: '💼' },
  ];

  const filteredArticles = selectedCategory
    ? articles.filter(a => a.category === selectedCategory)
    : articles;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">GazetaLB 🇦🇱</h1>
          <p className="text-xl text-blue-100">Lajmet më të reja nga Shqipëria dhe bota</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-600">GazetaLB</h2>
          <nav className="flex gap-4 items-center">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/category/${cat.name}`}
                className="hover:text-blue-600 transition font-semibold"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white p-4 mb-6">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded transition ${
              !selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Të Gjithë (All)
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded transition ${
                selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Po ngarkohen lajmet...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Nuk ka lajme të reja akoma.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(article => (
              <article
                key={article._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.content.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>🖊️ {article.author}</span>
                    <span>👁️ {article.views}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
