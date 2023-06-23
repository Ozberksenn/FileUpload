const multer = require("multer");
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
      cb(null, file.originalname); // dosyanın ismini yazdırıyoruz.
    },
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // dosyanın konumu.
    },
  }),
});

module.exports = { uploadMiddleware };
