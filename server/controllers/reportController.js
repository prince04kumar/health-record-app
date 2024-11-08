// controllers/reportController.js
const express = require('express');
const File = require('../models/Reoprt');
const path = require('path');
const fs = require('fs');

const addfile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded');

        console.log(req.file);

        const newFile = new File({
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            note: req.body.note,
            userId: req.user._id  // Add the user ID from the authenticated request
        });

        await newFile.save();

        res.status(200).json({
            message: 'File uploaded successfully',
            file: newFile,
        });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

const getAllReports = async (req, res) => {
    try {
        // Only get reports for the logged-in user
        const reports = await File.find({
            userId: req.user._id 
        }); 
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

const downloadFile = async (req, res) => {
    try {
        // First check if the file belongs to the user
        const file = await File.findOne({ 
            userId: req.user._id 
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

const deleteFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        // Only delete if the file belongs to the user
        const result = await File.deleteOne({ 
            userId: req.user._id 
        });
        
        if (result.deletedCount === 1) {
            console.log("File deleted successfully");
            res.status(200).send("File deleted successfully");
        } else {
            res.status(404).send("File not found");
        }
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

module.exports = { addfile, getAllReports, downloadFile, deleteFile };