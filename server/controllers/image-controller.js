const url = 'https://blogspark-backend.onrender.com';
import mongoose from "mongoose";
import grid from "gridfs-stream"

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (request, response) => {

    if (!request.file) {
        console.log("Failure: No file provided");
        return response.status(404).json({ msg: "No file provided" });
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    console.log("File uploaded successfully", imageUrl);
    return response.status(200).json(imageUrl);

}
export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}