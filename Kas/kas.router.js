const express = require("express");
const { KasList, KasCreate, KasUpdate, KasDelete } = require("./kas.controller");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { KasJumlahKeluarValidator, KasJumlahMasukValidator, KasTanggalValidator, KasNomorValidator } = require("./kas.validator");

const KasRouter = express.Router();

KasRouter.get("/", [IsAuthenticated], KasList)
KasRouter.post("/",[
    IsAuthenticated,
    Validate([
        KasNomorValidator(),
        KasJumlahKeluarValidator(),
        KasJumlahMasukValidator(),
        KasTanggalValidator()
    ])
], KasCreate)
KasRouter.put("/:id", [IsAuthenticated], KasUpdate)
KasRouter.delete("/:id", [IsAuthenticated], KasDelete)

module.exports = {
    KasRouter
}