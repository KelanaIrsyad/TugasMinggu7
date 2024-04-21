const mongoose = require("mongoose");

const KasObject = {
  nomorReferensi: { type: String, unique: true, require: true, maxLength:6, minLength:6 },
  jumlahKeluar: { type: Number, require: true },
  jumlahMasuk: { type: Number, require: true },
  tanggal: { type: Date, require: true }
}

const KasSchema = new mongoose.Schema(KasObject)

const KasModel = mongoose.model("Kas", KasSchema);

module.exports = {
    KasSchema,
    KasModel,
    KasObject

}