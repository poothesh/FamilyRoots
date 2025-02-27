import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import '../assets/styles/FamilyStories.css';

const FamilyStories = () => {
  const [activeFilter, setActiveFilter] = useState('All Stories');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    title: '',
    story: ''
  });

  const stories = [
    {
      id: 1,
      image: '/images/familygathering.jpg',
      author: 'Sarah Johnson',
      date: 'June 15, 2024',
      title: 'Christmas Traditions of 1960s',
      excerpt: 'Every Christmas Eve, our entire family would gather at grandma\'s house. The smell of fresh-baked cookies and the sound of carols filled the air...',
      category: 'Family Traditions'
    },
    {
      id: 2,
      image: '/images/oldrecipe.jpg',
      author: 'Michael Chen',
      date: 'June 14, 2024',
      title: 'Grandmother\'s Secret Recipe',
      excerpt: 'This apple pie recipe has been passed down through five generations. Each slice tells a story of family gatherings and how close we are...',
      category: 'Family Recipes'
    },
    {
      id: 3,
      image: '/images/weddingday.jpg',
      author: 'Emily Wilson',
      date: 'June 13, 2024',
      title: 'A Wedding to Remember Forever',
      excerpt: 'When my parents got married in 1975, everything that could go wrong did. But that\'s what made it unforgettable and We proved our love...',
      category: 'Family Traditions'
    },
    {
      id: 4,
      image: '/images/summerhouse.jpg',
      author: 'David Thompson',
      date: 'June 12, 2024',
      title: 'Summer of \'85: The Tree House',
      excerpt: 'That summer, my friends and I built a treehouse in the old oak tree. It became our secret hideout, where imagination knew no bounds...',
      category: 'Childhood Memories'
    },
    {
      id: 5,
      image: '/images/publicschool.webp',
      author: 'Lisa Martinez',
      date: 'June 11, 2024',
      title: 'First Day of Public School, 1978',
      excerpt: 'The smell of new books, sharpened pencils, and the nervous excitement of meeting new friends. My mother\'s goodbye wave still lives in my memory...',
      category: 'Childhood Memories'
    },
    {
      id: 6,
      image: '/images/oldpark.jpg',
      author: 'Kevin Park',
      date: 'June 10, 2024',
      title: 'The Old Neighborhood Park',
      excerpt: 'Every summer evening in 1982, the park came alive with children. The creaky swings, the hot metal slides, and the endless games of tag...',
      category: 'Childhood Memories'
    },
    {
      id: 7,
      image: '/images/moonlanding.webp',
      author: 'Robert Miller',
      date: 'June 9, 2024',
      title: 'Watching History: Moon Landing',
      excerpt: 'July 20, 1969: Our family huddled around the black-and-white TV, watching in awe as Neil Armstrong took that historic first step to history...',
      category: 'Historical Events'
    },
    {
      id: 8,
      image: '/images/wall.jpg',
      author: 'Anna Schmidt',
      date: 'June 8, 2024',
      title: 'The Fall of the House Wall Affect',
      excerpt: 'November 9, 1989: The night the wall came down, I was there with my camera. The joy, tears, and celebrations of reunited families...',
      category: 'Historical Events'
    },
    {
      id: 9,
      image: '/images/music.jpg',
      author: 'James Wong',
      date: 'June 7, 2024',
      title: 'Three Days of Peace and Music',
      excerpt: 'August 1969: Woodstock wasn\'t just a festival, it was a moment that defined a generation. The music, the rain, the spirit of unity...',
      category: 'Historical Events'
    }
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.story-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
  }, [activeFilter]); // Re-run animation when filter changes

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      date: '',
      title: '',
      story: ''
    });
  };

  const handleBackClick = () => {
    // You can replace this with your actual navigation logic
    console.log('Back button clicked');
  };

  const filteredStories = activeFilter === 'All Stories'
    ? stories
    : stories.filter(story => story.category === activeFilter);

  const filterButtons = [
    'All Stories',
    'Childhood Memories',
    'Family Traditions',
    'Historical Events',
    'Family Recipes'
  ];

  return (
    <>

      <main>
        <div className="filters">
          {filterButtons.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="story-grid">
          {filteredStories.map(story => (
            <article key={story.id} className="story-card">
              <img src={story.image} alt={story.title} className="story-image" />
              <div className="story-content">
                <div className="story-meta">
                  <span>By {story.author}</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="story-title">{story.title}</h3>
                <p className="story-excerpt">{story.excerpt}</p>
                <a href="#" className="story-link">Read More</a>
              </div>
            </article>
          ))}
        </div>

        <section className="story-editor">
          <h2 className="editor-title">Share Your Story</h2>
          <form className="editor-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name..."
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Enter date to remember..."
              />
            </div>
            <div className="form-group">
              <label>Story Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your story title..."
              />
            </div>
            <div className="form-group">
              <label>Your Story</label>
              <textarea
                rows="6"
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                placeholder="Share your family memory..."
              />
            </div>
            <button type="submit" className="submit-btn">Share Story</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default FamilyStories;