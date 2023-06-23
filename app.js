const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();
// const fs = require("fs"); // dosya dizinleri üzerinde işlem yapmak için kullandığımız moduül.
// const path = require("path");
const { uploadMiddleware } = require("./src/middleware/upload");
const uploadController = require("./src/controller/upload_controller");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/uploadMultiple", uploadMiddleware.array("files", 12), (req, res) => {
  const files = req.files;
  if (!files) {
    return res.json({
      success: false,
      message: "Dosya Yüklenemedi.",
    });
  }
  return (
    res.json({
      success: true,
      message: "Dosya başarıyla yüklendi.",
      file: files,
    }),
    console.log(files)
  );
});

// params alıyoruz
app.get("/uploads/:filename", (req, res) => {
  //:filename ifadesi, URL'nin bir parametresini belirtir. ":" işareti, bir parametre olduğunu belirtir ve filename
  //parametresinin adıdır. İstek yapıldığında, req.params nesnesi üzerinden bu parametreye erişilebilir.
  var filename = req.params.filename;
  res.sendFile(__dirname + "/uploads/" + filename);
});

app.get("/images", uploadController.getImages);

app.listen(port, () => {
  console.log(port, "portunda çalıştı");
});
