import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const News = () => {
    const [news, setNews] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const apiKey = "cec3db3e7bd54dfd95cc3c78ac071281"
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${apiKey}`;
        
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            setNews(data.articles.slice(0, 8)); // Fetch and set only the first 3 articles
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('news-section');
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="news-section" className="flex flex-col justify-center items-center gap-5 mx-auto p-4">
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-lora font-bold'>LATEST-NEWS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {visible && news.map((article, index) => (
                    <motion.div 
                        key={index} 
                        className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                            <p className="text-gray-700 mb-4">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Read more
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default News;
