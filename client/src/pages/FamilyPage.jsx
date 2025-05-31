import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/FamilyPage.css';

const FamilyPage = () => {

  const navigate = useNavigate();

  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyStories, setFamilyStories] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  
  const [newMember, setNewMember] = useState({ name: '', relation: '' });
  const [newStory, setNewStory] = useState({ title: '', author: '', date: '', content: '', image: null });
  const [newBloodGroup, setNewBloodGroup] = useState({ name: '', bloodType: '' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [newPhoto, setNewPhoto] = useState({ caption: '', date: '', image: null });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  const familyKey = localStorage.getItem('familyKey') || 'default-family-key';
  
  const API_URL = 'http://localhost:3001';
  
  
  
  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(`${API_URL}/api/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.imageUrl;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Failed to upload image");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/family-members/${familyKey}`, newMember);
      
      if (response.data.success) {
        setFamilyMembers(prev => [...prev, newMember]);
        setNewMember({ name: '', relation: '' });
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding family member:", err);
      setError("Failed to add family member");
      setIsLoading(false);
    }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      let storyData = { ...newStory };
      delete storyData.image;
      
      if (newStory.image) {
        const imageUrl = await uploadImage(newStory.image);
        storyData.imageUrl = imageUrl;
      }
      
      const response = await axios.post(`${API_URL}/api/family-stories/${familyKey}`, storyData);
      
      if (response.data.success) {
        setFamilyStories(prev => [...prev, storyData]);
        setNewStory({ title: '', author: '', date: '', content: '', image: null });
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding family story:", err);
      setError("Failed to add family story");
      setIsLoading(false);
    }
  };

  const handleStoryImageUpload = (e) => {
    setNewStory({...newStory, image: e.target.files[0]});
  };

  const handleAddBloodGroup = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/blood-groups/${familyKey}`, newBloodGroup);
      
      if (response.data.success) {
        setBloodGroups(response.data.data);
        setNewBloodGroup({ name: '', bloodType: '' });
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding blood group:", err);
      setError("Failed to add blood group");
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/timeline-events/${familyKey}`, newEvent);
      
      if (response.data.success) {
        setTimelineEvents(response.data.data);
        setNewEvent({ title: '', date: '', description: '' });
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding timeline event:", err);
      setError("Failed to add timeline event");
      setIsLoading(false);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      let photoData = { ...newPhoto };
      delete photoData.image;
      
      if (newPhoto.image) {
        const imageUrl = await uploadImage(newPhoto.image);
        photoData.imageUrl = imageUrl;
        
        const response = await axios.post(`${API_URL}/api/family-photos/${familyKey}`, photoData);
        
        if (response.data.success) {
          setFamilyPhotos(response.data.data);
          setNewPhoto({ caption: '', date: '', image: null });
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error adding family photo:", err);
      setError("Failed to add family photo");
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    setNewPhoto({...newPhoto, image: e.target.files[0]});
  };

  const handleSubmitDetails = async () => {
    try {
      setIsLoading(true);
      
      const allData = {
        members: familyMembers,
        stories: familyStories,
        bloodGroups: bloodGroups,
        timelineEvents: timelineEvents,
        photos: familyPhotos
      };
      
      const response = await axios.post(`${API_URL}/api/submit-all/${familyKey}`, allData);
      
      if (response.data.success) {
        setShowConfirmation(true);
        navigate('/login');
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error submitting all details:", err);
      setError("Failed to submit all details");
      setIsLoading(false);
    }
  };

  const sortedEvents = [...timelineEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="family-page">
      <br /><br /><br />

      <div className="content-container">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
        
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <div className="check-icon">✓</div>
              <h3>Details Submitted Successfully!</h3>
              <p>Your family information has been saved.</p>
            </div>
          </div>
        )}

        <section className="section-container members-section">
          <h2 className="section-title">Family Members</h2>
          <div className="section-content">
            <form className="input-form" onSubmit={handleAddMember}>
              <h3>Add Family Member</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Relation" 
                  value={newMember.relation} 
                  onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                  required
                />
                <button type="submit" className="action-btn" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            </form>

            <div className="display-content">
              <div className="members-list">
                {familyMembers.map((member, index) => (
                  <div key={index} className="member-card">
                    <h3>{member.name}</h3>
                    <p>{member.relation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-container stories-section">
          <h2 className="section-title">Family Stories</h2>
          <div className="section-content">
            <form className="input-form" onSubmit={handleAddStory}>
              <h3>Add Family Story</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={newStory.title} 
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Author" 
                  value={newStory.author} 
                  onChange={(e) => setNewStory({...newStory, author: e.target.value})}
                  required
                />
                <input 
                  type="date" 
                  placeholder="Date" 
                  value={newStory.date} 
                  onChange={(e) => setNewStory({...newStory, date: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Story Content" 
                  value={newStory.content} 
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  required
                />
                <div className="file-input-container">
                  <label className="file-input-label">
                    <span>Story Image (optional)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleStoryImageUpload}
                      className="file-input"
                    />
                  </label>
                </div>
                <button type="submit" className="action-btn" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Story'}
                </button>
              </div>
            </form>

            <div className="display-content">
              <div className="stories-list">
                {familyStories.map((story, index) => (
                  <div key={index} className="story-card">
                    <h3>{story.title}</h3>
                    <div className="story-meta">
                      <p>By {story.author}</p>
                      <p>{story.date}</p>
                    </div>
                    {story.imageUrl && (
                      <div className="story-image-container">
                        <img src={story.imageUrl} alt={story.title} className="story-image" />
                      </div>
                    )}
                    <div className="story-content-box">
                      <p className="story-content">{story.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-container dna-section">
          <h2 className="section-title">Family DNA</h2>
          <div className="section-content">
            <form className="input-form" onSubmit={handleAddBloodGroup}>
              <h3>Add Blood Group</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Member Name" 
                  value={newBloodGroup.name} 
                  onChange={(e) => setNewBloodGroup({...newBloodGroup, name: e.target.value})}
                  required
                />
                <select 
                  value={newBloodGroup.bloodType} 
                  onChange={(e) => setNewBloodGroup({...newBloodGroup, bloodType: e.target.value})}
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <button type="submit" className="action-btn" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Blood Group'}
                </button>
              </div>
            </form>

            <div className="display-content">
              <div className="blood-groups-list">
                {bloodGroups.map((member, index) => (
                  <div key={index} className="blood-group-card">
                    <h3>{member.name}</h3>
                    <div className="blood-type">{member.bloodType}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-container timeline-section">
          <h2 className="section-title">Family Timeline</h2>
          <div className="section-content">
            <form className="input-form" onSubmit={handleAddEvent}>
              <h3>Add Timeline Event</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Event Title" 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
                <input 
                  type="date" 
                  placeholder="Date" 
                  value={newEvent.date} 
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Event Description" 
                  value={newEvent.description} 
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  required
                />
                <button type="submit" className="action-btn" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Event'}
                </button>
              </div>
            </form>

            <div className="display-content">
              <div className="timeline">
                {sortedEvents.map((event, index) => (
                  <div key={index} className="timeline-event">
                    <div className="event-date">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-container photos-section">
          <h2 className="section-title">Family Photos</h2>
          <div className="section-content">
          <form className="input-form" onSubmit={handleAddPhoto}>
              <h3>Add Family Photo</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Caption" 
                  value={newPhoto.caption} 
                  onChange={(e) => setNewPhoto({...newPhoto, caption: e.target.value})}
                  required
                />
                <input 
                  type="date" 
                  placeholder="Date" 
                  value={newPhoto.date} 
                  onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})}
                  required
                />
                <div className="file-input-container">
                  <label className="file-input-label">
                    <span>Upload Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="file-input"
                      required
                    />
                  </label>
                </div>
                <button type="submit" className="action-btn" disabled={isLoading || !newPhoto.image}>
                  {isLoading ? 'Uploading...' : 'Add Photo'}
                </button>
              </div>
            </form>

            <div className="display-content">
              <div className="photo-gallery">
                {familyPhotos.map((photo, index) => (
                  <div key={index} className="photo-card">
                    <div className="photo-container">
                      <img src={photo.imageUrl} alt={photo.caption} className="family-photo" />
                    </div>
                    <div className="photo-info">
                      <p className="photo-caption">{photo.caption}</p>
                      <p className="photo-date">{new Date(photo.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="submit-all-container">
          <button 
            className="submit-all-btn" 
            onClick={handleSubmitDetails}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save All Family Information'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;