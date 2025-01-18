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
            filename: req.file.originalname,
            filedata: req.file.buffer,
            filetype: req.file.mimetype,
            note: req.body.note,
            userId: req.user._id,
            sectionId: req.body.sectionId // Add the section ID from the request
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
        const file = await File.findOne({
            userId: req.user._id,
            filename: req.params.filename
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        res.set('Content-Type', file.filetype);
        res.send(file.filedata);
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

const deleteFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        const result = await File.deleteOne({
            userId: req.user._id,
            filename: filename
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