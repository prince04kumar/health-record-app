const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Report = require('./models/PatientReoprt');
const { GridFSBucket } = require('mongodb');


const connectDB = async () => {
    try {
         mongoose.connect(`${process.env.MONGODB_URI}/health-app` 
        ).then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error(`Error connecting to MongoDB: ${error.message}`);
          
        });


    }

     catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }

    const connection = mongoose.connection;
    let gfs;
    let gridfsBucket;
    
    connection.once('open', () => {
      gridfsBucket = new GridFSBucket(connection.db, { bucketName: 'uploads' });
      gfs = Grid(connection.db, mongoose.mongo);
      gfs.collection('uploads');
    });



// Route to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
    const { note, patientId } = req.body;
  
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
  
    const uploadStream = gridfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });
    uploadStream.end(req.file.buffer);
  
    uploadStream.on('finish', async (file) => {
      const newReport = new Report({
        filename: file.filename,
        contentType: file.contentType,
        note,
        patientId,
      });
      await newReport.save();
      res.status(201).json(newReport);
    });
  });









};

exports.connectDB = connectDB;