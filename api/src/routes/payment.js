const {Router}=require("express");
const mercadopago=require("mercadopago");
const router = Router();
const {Colegio}=require("../db.js");
const payController= require("../controllers/payController");

router.post("/notification", async(req,res)=>{
    const {query}=req;

    console.log("yo soy la mera mera: " + query);
});

router.post("/", payController);

module.exports = router;
