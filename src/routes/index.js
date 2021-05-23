const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.post("/simularEmprestimo", Controller.simularEmprestimo);
router.post("/efetivarEmprestimo", Controller.efetivarEmprestimo);
router.get("/emprestimosSolicitados", Controller.getEmprestimosSolicitados);
router.get("/", (req, res) => {
  res.send("Hello from Picsize Test API!")
})

module.exports = router;
