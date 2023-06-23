const fs = require("fs"); // dosya dizinleri üzerinde işlem yapmak için kullandığımız moduül.
const path = require("path");
const uploadFolder = path.join(__dirname, "../../", "uploads");

const getImages = (req, res) => {
  // uploads klasörünün altında ki tüm görsellere fs modülünü kullanarak ulaşabiliriz.

  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.json({
        err,
        message: "Resim klasörünü okurken bir hata oluştu.",
      });
    }
    return res.json({
      message: "Başarılı...",
      file: files,
    });
  });
};

module.exports = { getImages };
