const Section = require('../models/Section');

const createSection = async (req, res) => {
  try {
    const newSection = new Section({
      name: req.body.name,
      userId: req.user._id
    });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await Section.find({ userId: req.user._id });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

const updateSection = async (req, res) => {
  try {
    const section = await Section.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name: req.body.name },
      { new: true }
    );
    if (!section) {
      return res.status(404).send('Section not found');
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

const deleteSection = async (req, res) => {
  try {
    const section = await Section.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!section) {
      return res.status(404).send('Section not found');
    }
    res.status(200).send('Section deleted successfully');
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

module.exports = { createSection, getSections, updateSection, deleteSection };
