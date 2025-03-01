const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = "blog-images";       
        if (file.fieldname === "profileImage") {
            folder = "profile-images";
        }

        return {
            folder: folder,
            allowed_formats: ["jpg", "png", "jpeg"],
        };
    },
});

const upload = multer({ storage });

module.exports = upload;
