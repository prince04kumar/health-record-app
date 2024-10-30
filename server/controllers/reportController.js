const express = require('express');
const File = require('../models/Reoprt');

const path = require('path');
const addfile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded');

        const newFile = new File({
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            note: req.body.note
        })

        await newFile.save();

        res.status(200).json({
            message: 'File uploaded successfully',
            file: newFile,
        });
    }
    catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
}


module.exports = { addfile };