const { Router } = require("express");
const router = Router();
const {
  Pais,
  Colegio,
  Categoria,
  Idioma,
  Departamento,
  Provincia,
  Plan_Pago,
  Distrito,
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
          model: Pais,
          attributes: ["id", "nombre_pais"],
        },
        {
          model: Departamento,
          attributes: ["id", "nombre_departamento"],
        },
        {
          model: Provincia,
          attributes: ["id", "nombre_provincia"],
        },
        {
          model: Distrito,
          attributes: ["id", "nombre_distrito"],
        },
        {
          model: Plan_Pago,
          attributes: ["id", "nombre_plan_pago"],
        },
        {
          model: Categoria,
          attributes: ["id", "nombre_categoria"],
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
        "primera_imagen",
      ],
    });
    response = cole;
    res.json(response);
  } catch (err) {
    res.json({ err });
  }
});

router.get("/:Colegio_id", async (req, res) => {
  const { Colegio_id } = req.params;

  try {
    const cole = await Colegio.findAll({
      where: { id: [Colegio_id] },
      include: [
        { model: Idioma, attributes: ["nombre_idioma", "id"] },
        {
          model: Pais,
          attributes: ["id", "nombre_pais"],
        },
        {
          model: Departamento,
          attributes: ["nombre_departamento"],
        },
        {
          model: Provincia,
          attributes: ["id", "nombre_provincia"],
        },
        {
          model: Distrito,
          attributes: ["id", "nombre_distrito"],
        },
        {
          model: Plan_Pago,
          attributes: ["id", "nombre_plan_pago"],
        },
        {
          model: Categoria,
          attributes: ["id", "nombre_categoria"],
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
        "primera_imagen",
        "galeria_fotos",
        "video_url",
      ],
    });

    res.json(cole);
  } catch (err) {
    res.json({ err });
  }
});

//------- POST A COLEGIOS--------
router.post("/", async (req, res) => {
  const {
    nombre_responsable,
    apellidos_responsable,
    email,
    telefono,
    ruc,
    nombre_colegio,
    departamento,
  } = req.body;
  try {
    const [colegio, creado] = await Colegio.findOrCreate({
      where: {
        Nombre_colegio: nombre_colegio,
      },
    });
    if (creado) {
      console.log("Colegio creado exitosamente");
      id, (colegio.nombre_responsable = nombre_responsable);
      colegio.apellidos_responsable = apellidos_responsable;
      colegio.email = email;
      colegio.telefono = telefono;
      colegio.ruc = ruc;
      colegio.departamento = departamento;
      colegio.save();
      res.status(200).json(colegio);
    } else {
      res.status(500).json([{ error: "Colegio existente" }]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      direccion,
      numero_estudiantes,
      fecha_fundacion,
      nombre_director,
      primera_iamgen,
      galeria_fotos,
      video_url,
      area,
      ugel,
      ubicacion,
      referencia_ubicacion,
      telefono,
      propuesta_valor,
      descripcion,
      horas_idioma_exstranjero,
      rating,
      idAuth,
      PaisId,
      DepartamentoId,
      ProvinciaId,
      DistritoId,
      PlanPagoId,
      isActive,
      CategoriaId,
    } = req.body;
    const editedColegio = await Colegio.update(
      {
        direccion: direccion,
        numero_estudiantes: numero_estudiantes,
        fecha_fundacion: fecha_fundacion,
        nombre_director: nombre_director,
        primera_iamgen: primera_iamgen,
        galeria_fotos: galeria_fotos,
        video_url: video_url,
        area: area,
        ugel: ugel,
        ubicacion: ubicacion,
        referencia_ubicacion: referencia_ubicacion,
        telefono: telefono,
        propuesta_valor: propuesta_valor,
        descripcion: descripcion,
        horas_idioma_exstranjero: horas_idioma_exstranjero,
        rating: rating,
        idAuth: idAuth,
        PaisId: PaisId,
        DepartamentoId: DepartamentoId,
        ProvinciaId: ProvinciaId,
        DistritoId: DistritoId,
        PlanPagoId: PlanPagoId,
        isActive: isActive,
        CategoriaId: CategoriaId,
      },
      { where: { id: id } }
    );
    res.json(editedColegio);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
