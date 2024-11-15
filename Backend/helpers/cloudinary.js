const cloudinary = require('cloudinary').v2;
const multer = require("multer")

cloudinary.config({
    cloud_name: 'dsovyumur',
    api_key : '794937836339295',
    api_secret: 'rIHB_xxNhqgErylOFKsDUOhHNaY'
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type: 'auto'
    });

    return result;
}

const upload = multer({storage});

module.exports = {upload,ImageUploadUtil}