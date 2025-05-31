const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); 
const path = require("path");
const fs = require("fs");
const FamilyModel = require('./models/FamilyUser');
const { LocalStorage } = require('node-localstorage');



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/FamilyRootsHub");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

app.use('/uploads', express.static('uploads'));
const localStorage = new LocalStorage('./scratch');
app.post("/login", (req, res) => {
  const {familyKey, password} = req.body;
  FamilyModel.findOne({familyKey: familyKey})
    .then(user => {
      if(user) {
        if(user.password == password) {
          res.json("Success");
        } else {
          res.json("The password is Incorrect");
        }
      } else {
        res.json("No record Found in db");
      }
    });
});

app.post('/signup', (req, res) => {
  FamilyModel.create(req.body)
  .then(userDetail => {
    
    localStorage.setItem('familyKey', userDetail.familyKey);
    console.log("Familykey:", userDetail.familyKey);

    res.json(userDetail);
  })
    .catch(err => res.json(err));
});

app.get('/api/family-details/:familyKey', (req, res) => {
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(details => {
      if(details) {
        res.json(details);
      } else {
        res.json({message: "No family details found", data: null});
      }
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/family-details', (req, res) => {
  const {familyKey, members, stories, bloodGroups, timelineEvents, photos} = req.body;
  
  FamilyModel.findOne({familyKey: familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(members) family.members = members;
      if(stories) family.stories = stories;
      if(bloodGroups) family.bloodGroups = bloodGroups;
      if(timelineEvents) family.timelineEvents = timelineEvents;
      if(photos) family.photos = photos;
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({error: 'No file uploaded'});
  }
  
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    imageUrl: imageUrl
  });
});

app.post('/api/family-members/:familyKey', (req, res) => {
  const newMember = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(!family.members) {
        family.members = [];
      }
      
      family.members.push(newMember);
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily.members});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/family-stories/:familyKey', (req, res) => {
  const newStory = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(!family.stories) {
        family.stories = [];
      }
      
      family.stories.push(newStory);
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily.stories});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.get('/api/user-stories/:familyKey', async (req, res) => {
  try {
    const family = await FamilyModel.findOne({familyKey: req.params.familyKey});
    if (!family) {
      return res.status(404).json({ message: "Family not found", stories: [] });
    }
    res.json({ success: true, stories: family.stories || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blood-groups/:familyKey', (req, res) => {
  const newBloodGroup = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(!family.bloodGroups) {
        family.bloodGroups = [];
      }
      
      family.bloodGroups.push(newBloodGroup);
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily.bloodGroups});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/timeline-events/:familyKey', (req, res) => {
  const newEvent = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(!family.timelineEvents) {
        family.timelineEvents = [];
      }
      
      family.timelineEvents.push(newEvent);
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily.timelineEvents});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/family-photos/:familyKey', (req, res) => {
  const newPhoto = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(!family.photos) {
        family.photos = [];
      }
      
      family.photos.push(newPhoto);
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({success: true, data: updatedFamily.photos});
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.post('/api/submit-all/:familyKey', (req, res) => {
  const {members, stories, bloodGroups, timelineEvents, photos} = req.body;
  
  FamilyModel.findOne({familyKey: req.params.familyKey})
    .then(family => {
      if(!family) {
        return res.status(404).json({error: "Family not found with this key"});
      }
      
      if(members) family.members = members;
      if(stories) family.stories = stories;
      if(bloodGroups) family.bloodGroups = bloodGroups;
      if(timelineEvents) family.timelineEvents = timelineEvents;
      if(photos) family.photos = photos;
      family.lastUpdated = Date.now();
      
      return family.save();
    })
    .then(updatedFamily => {
      res.json({
        success: true, 
        message: "All family details submitted successfully",
        data: updatedFamily
      });
    })
    .catch(err => res.status(500).json({error: err.message}));
});

app.get('/api/all-data/:familyKey', async (req, res) => {
  try {
    const family = await FamilyModel.findOne({familyKey: req.params.familyKey});
    if(!family) {
      return res.status(404).json({error: "Family not found with this key"});
    }
    
    res.json({
      success: true,
      data: family
    });
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});