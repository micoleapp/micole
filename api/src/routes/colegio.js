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
  Infraestructura,
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
        {
          model: Infraestructura,
          attributes: ["nombre_infraestructura","InfraestructuraTipoId"],
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
  console.log(req.body)
  try {
    const { id } = req.params;
    const {
      direccion,
      alumnos:numero_estudiantes,
      fundacion:fecha_fundacion,
      nombreDirector:nombre_director,
      nombreColegio:nombre_colegio,
      multimedia,
      ruc,
      area,
      ugel,
      lat,
      lng,
      propuesta:propuesta_valor,
      descripcion,
      ingles:horas_idioma_extranjero,
      categoria:Categoria,
      departamento,
      provincia,
      infraestructura,
    } = req.body;
    let video_url = multimedia.video_url
    let primera_imagen = multimedia.images[0]
    let galeria_fotos = JSON.stringify(multimedia.images.slice(1))
    const ubicacion = {lat,lng}
    const editedColegio = await Colegio.update(
      {
        Departamento: departamento,
        Infraestructuras: infraestructura,
        Categoria:Categoria,
        nombre_colegio:nombre_colegio,
        direccion: direccion,
        numero_estudiantes: numero_estudiantes,
        fecha_fundacion: fecha_fundacion,
        nombre_director: nombre_director,
        primera_imagen: primera_imagen,
        galeria_fotos: galeria_fotos,
        video_url: video_url, 
        ruc: ruc,
        area: area,
        ugel: ugel,
        Provincium: provincia,
        ubicacion: JSON.stringify(ubicacion),
        propuesta_valor: propuesta_valor,
        descripcion: descripcion,
        horas_idioma_extranjero: horas_idioma_extranjero,
        DepartamentoId: departamento.id,
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
