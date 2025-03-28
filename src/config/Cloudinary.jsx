// Import Cloudinary dependencies
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';

// Configure Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: 'di1hhug7b',
  api_key: '987469235859674',
  api_secret: 'Z-B7L6-zyH3QgHd8c-T6kN4buj4',
  secure: true
});


const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Create an unsigned upload preset in Cloudinary dashboard

      axios.post(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          if (response.data.secure_url) {
              resolve(response.data.secure_url);
          } else {
              reject(new Error('Upload failed'));
          }
      })
      .catch(error => {
          reject(error);
      });
  });
};

export default uploadToCloudinary;
