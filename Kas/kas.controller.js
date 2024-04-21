const {
  SearchBackend,
  FilterBackend,
  Pagination,
} = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { KasModel } = require("./kas.model");

async function KasList(req, res) {
  try {
    const result = KasModel.find();
    const search = SearchBackend(req, result, [
      "nomorReferensi",
      "jumlahKeluar",
      "jumlahMasuk",
      "tanggal",
    ]);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}
async function KasCreate(req, res) {
  try {
    const result = await KasModel.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function KasDetail(req, res) {
  try {
    const result = await GetOr404(KasModel, { _id: req.params.id });
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res);
  }
}

async function KasUpdate(req, res) {
    try {
      await GetOr404(KasModel, {_id: req.params.id});
      const result = await KasModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true}
      )
  
      return res.status(200).json(result);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }
  
  async function KasDelete(req, res) {
    try {
      // const result = await GetOr404(CustomerModel, {_id: req.params.id})
      await KasModel.findOneAndDelete({_id: req.params.id})
      // result.delete();
      return res.status(204).json(null);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  module.exports = {
    KasList,
    KasCreate,
    KasUpdate,
    KasDelete
  }