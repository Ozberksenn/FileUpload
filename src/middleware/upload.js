const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const config = require("../../config.json");
const uploadMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: (req, file, cb) => {
    cb(undefined, true); // dosya ne gelirse gelsin kabul ediyoruz. Sadece resim dosylarını kullanmak istersek farklı tanımlamalar yapmalıyız.
  },
  storage: multer.diskStorage({
    // dosyayı nereye ve hangi isimle kaydedeceğimizi burada belirleriz.
    filename: (req, file, cb) => {
      const uuid = uuidv4();
      const uniqueFileName = uuid + file.originalname;
      cb(null, uniqueFileName); // dosyanın ismini yazdırıyoruz.
    },
    destination: (req, file, cb) => {
      cb(null, config.service.fileUploadPath); // dosyanın konumu.
    },
  }),
});

module.exports = { uploadMiddleware };
