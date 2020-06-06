const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.post("/simularEmprestimo", Controller.simularEmprestimo);
router.post("/efetivarEmprestimo", Controller.efetivarEmprestimo);
router.get("/emprestimosSolicitados", Controller.getEmprestimosSolicitados);

module.exports = router;
