import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import axios from 'axios'; 
import '../assets/styles/FamilyStories.css';

const FamilyStories = () => {
  const [activeFilter, setActiveFilter] = useState('All Stories');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    title: '',
    story: ''
  });
  const [stories, setStories] = useState([]);  

  useEffect(() => {
    const familyKey = localStorage.getItem("familyKey");
  
    if (familyKey) {
      axios.get(`http://localhost:3001/api/user-stories/${familyKey}`)
        .then(res => {
          setStories(res.data.stories);
        })
        .catch(err => {
          console.error("Error fetching stories:", err);
        });
    } else {
      console.error("No familyKey found in localStorage");
    }
  }, []);
  

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
  }, [activeFilter]); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("familykey");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.post("http://localhost:3001/api/family-stories", {
        userId,
        story: {
          title: formData.title,
          author: formData.name,
          date: formData.date,
          content: formData.story
        }
      });

      if (response.data.success) {
        console.log("Story saved to MongoDB:", response.data.data);
        setFormData({
          name: '',
          date: '',
          title: '',
          story: ''
        });
      }
    } catch (err) {
      console.error("Error saving story:", err);
    }
  };

  const handleBackClick = () => {
  
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
  {filteredStories.map((story, index) => (
    <article key={story.id || story._id || index} className="story-card">
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
