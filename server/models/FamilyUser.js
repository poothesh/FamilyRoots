
const mongoose = require('mongoose');

const FamilyUserSchema = new mongoose.Schema({
  familyName: String,
  familyKey: String,
  password: String,
  members: [ 
    {
      name: String,
      relation: String
    }
  ],
  stories: [
    {
      title: String,
      author: String,
      date: String,
      content: String,
      imageUrl: String
    }
  ],
  bloodGroups: [
    {
      name: String,
      bloodType: String
    }
  ],
  timelineEvents: [
    {
      title: String,
      date: String,
      description: String
    }
  ],
  photos: [
    {
      caption: String,
      date: String,
      imageUrl: String
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const FamilyModel = mongoose.model("userDetail", FamilyUserSchema);
module.exports = FamilyModel;
