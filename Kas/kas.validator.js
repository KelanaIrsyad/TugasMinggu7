const { body } = require("express-validator");
const { KasModel } = require("./kas.model");

const KasNomorValidator = (target = "nomorReferensi") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .bail()
    .custom(async (nomor) => {
      const kas = await KasModel.findOne({ nomor });
      if (kas) {
        throw new Error("Nomor sudah digunakan");
      }
    })
    .bail();
};

const KasJumlahMasukValidator = (target="jumlahMasuk") => {
    return body(target)
      .exists()
      .withMessage("Field harus tersedia!")
      .bail()
      .notEmpty()
      .withMessage("Field tidak boleh kosong.")
      .bail()
      .isInt()
      .withMessage("Field harus bilangan bulat.")
      .bail()
  }

  const KasJumlahKeluarValidator = (target="jumlahKeluar") => {
    return body(target)
      .exists()
      .withMessage("Field harus tersedia!")
      .bail()
      .notEmpty()
      .withMessage("Field tidak boleh kosong.")
      .bail()
      .isInt()
      .withMessage("Field harus bilangan bulat.")
      .bail()
  }

  const KasTanggalValidator = (target="tanggal") => {
    return body(target)
      .exists()
      .withMessage("Field harus tersedia!")
      .bail()
      .notEmpty()
      .withMessage("Field tidak boleh kosong.")
      .bail()
      .isDate({format: "YYYY-MM-DD"})
      .withMessage("Format harus YYYY-MM-DD")
      .bail()
  }

  module.exports = {
    KasNomorValidator,
    KasJumlahKeluarValidator,
    KasJumlahMasukValidator,
    KasTanggalValidator
    
  }
