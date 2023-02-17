const { Router } = require("express");
const router = Router();
const {
  Colegio,
  Idioma,
  Departamento,
  Provincia,
  Plan_Pago,
} = require("../db.js");

// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  //   const { brand, category, priceMin, priceMax } = req.query;
  let response = [];
  try {
    let cole;
    cole = await Colegio.findAll({
      include: [
        { model: Idioma, attributes: ["nombre_idioma", "id"] },
        {
          model: Departamento,
          attributes: ["nombre_departamento"],
        },
        {
          model: Plan_Pago,
          attributes: ["nombre_plan_pago"],
        },
        {
          model: Provincia,
          attributes: ["nombre_provincia"],
        },
      ],
      attributes: [
        "id",
        "nombre_colegio",
        "direccion",
        "ruc",
        "numero_estudiantes",
        "fecha_fundacion",
        "nombre_director",
        "telefono",
        "rating",
        "horas_idioma_extranjero",
      ],
    }); 
    response = cole;
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:Colegio_id", async (req, res) => {
  const { Colegio_id } = req.params;

  try {
    const cole = await Colegio.findAll({
      where: { id: [Colegio_id] },
      include: [
        { model: Idioma, attributes: ["nombre_idoma", "id"] },
        {
          model: Departamento,
          attributes: ["nombre_departamento"],
        },
        {
          model: Plan_Pago,
          attributes: ["nombre_plan_pago"],
        },
        {
          model: Provincia,
          attributes: ["id"],
        },
      ],
      attributes: [
        "id",
        "nombre_colegio",
        "direccion",
        "ruc",
        "numero_estudiantes",
        "fecha_fundacion",
        "nombre_director",
        "area",
        "ugel",
        "ubicacion",
        "telefono",
        "referencia_ubicacion",
        "propuesta_valor",
        "descripcion",
        "rating",
        "horas_idioma_extranjero",
      ],
    });

    res.send(cole);
  } catch (err) {
    res.send({ error: err.message });
  }
});
// //---PEDIR TODOS LOS PRODUCTOS DE UN SELLER---
// router.get("/seller/:SellerId", async (req, res) => {
//   const { SellerId } = req.params;

//   try {
//     const products = await WareHouse.findAll({
//       where: { SellerId: [SellerId] },
//       include: [
//         { model: Seller,
//           attributes: ["store_name", "adress", "id", "email", "adress"],
//         },
//         { model: Product,
//           attributes: [ "id", "categories", "name", "image", "id_table"],
//         },
//         { model: Review,
//           attributes: ["id", "comment", "rating", "UserId"],
//         },
//       ],
//       attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
//     });

//     products.forEach(async p => {
//       p.ratingProm = ratingProm(p.Reviews);
//       await p.save()
//     });

//     res.send(products);
//   } catch (err) {
//     res.send({ error: err.message });
//   }
// });

// router.get("/seller/:SellerId", async (req, res) => {
//   const { SellerId } = req.params;

//   try {
//     const products = await WareHouse.findAll({
//       where: { SellerId: [SellerId] },
//       include: [
//         { model: Seller,
//           attributes: ["store_name", "adress", "id", "email", "adress"],
//         },
//         { model: Product,
//           attributes: [ "id", "categories", "name", "image", "id_table"],
//         },
//         { model: Review,
//           attributes: ["id", "comment", "rating", "UserId"],
//         },
//       ],
//       attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
//     });

//     products.forEach(async p => {
//       p.ratingProm = ratingProm(p.Reviews);
//       await p.save()
//     });

//     res.send(products);
//   } catch (err) {
//     res.send({ error: err.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await WareHouse.findByPk(id, {
//       include: [
//         { model: Seller,
//           attributes: ["store_name", "adress", "id", "email", "adress"],
//         },
//         { model: Product,
//           attributes: [ "id", "categories", "name", "image", "id_table"],
//         },
//         { model: Review,
//           include: {
//             model: User,
//             attributes: ["email"]
//           },
//           attributes: ["id", "comment", "rating", "UserId"],
//         },
//       ],
//       attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
//     });

//     product.ratingProm = ratingProm(product.Reviews);
//     product.save();

//     const componentData = await getComponentData(product.Product.categories, product.Product.id_table);

//     res.send({...product.dataValues, componentData});
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// router.get("/");

// //------- POST A ALMACEN--------
// router.post("/", async (req, res) => {
//   const { precio, cantidad, id_vendedor, id_producto } = req.body;
//   try {
//     const [product, created] = await WareHouse.findOrCreate({
//       where: {
//         SellerId: id_vendedor,
//         ProductId: id_producto,
//       },
//     });
//     if (created) {
//       console.log("Product created successfully");
//       product.cantidad = cantidad;
//       product.precio = precio;
//       product.save()
//       res.status(200).json(product);
//     } else {
//       res.status(500).json([{ error: "Producto existente" }]);
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { cantidad, precio } = req.body;
//     const editedProduct = await WareHouse.update(
//       {
//         cantidad: cantidad,
//         precio: precio,
//       },
//       { where: { id: id } }
//     );
//     res.json(editedProduct);
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// });

module.exports = router;
