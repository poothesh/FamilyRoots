import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import FamilyHome from "./pages/FamilyHome";
import FamilyStories from "./pages/FamilyStories";
import Footer from "./components/Footer";
import FamilyTree from "./pages/FamilyTree";
import FamilyDna from "./pages/FamilyDna";
import FamilyPhotos from "./pages/FamilyPhotoArchives";
import ResearchTools from "./pages/FamilyResearch";
import TimelineCreation from "./pages/FamilyTimeLine";
import Header from "./components/Header";
import React from 'react';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FamilyPage from "./pages/FamilyPage";



function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation(); 
  const hideFooterOnPages = ["/","/login", "/signup"];

  return (
    <div className="app-container">
      {!hideFooterOnPages.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/familypage" element={<FamilyPage />} />
        <Route path="/familyhome" element={<FamilyHome />} />
        <Route path="/familystories" element={<FamilyStories />} />
        <Route path="/familytree" element={<FamilyTree />} />
        <Route path="/dna-insights" element={<FamilyDna />}/>
        <Route path="/photo-archives" element={<FamilyPhotos />}/>
        <Route path="/research-tools" element={<ResearchTools />}/>
        <Route path="/timeline-creation" element={<TimelineCreation />}/>
      </Routes>

      {!hideFooterOnPages.includes(location.pathname) && <Footer />}
      
    </div>
  );
}

export default App;
