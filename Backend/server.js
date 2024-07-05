import app from "./app.js";
import cloudinary from 'cloudinary'

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Define PORT variable
const PORT = process.env.PORT || 4000; // Default to port 4000 if not specified in environment variables

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
