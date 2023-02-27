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
  Afiliacion,
  Nivel
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
        {
          model: Nivel,
          attributes: ["nombre_nivel","id"],
        },
        {
          model: Idioma,
          attributes: ["nombre_idioma", "id"],
          through: {
            attributes: [],
          },
        },
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
          through: {
            attributes: [],
          },
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
        "primera_imagen"
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
        {
          model: Nivel,
          attributes: ["nombre_nivel","id"],
        },
        {
          model: Idioma,
          attributes: ["nombre_idioma", "id"],
          through: {
            attributes: [],
          },
        },
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
          attributes: ["id", "nombre_distrito", "ProvinciaId"],
        },
        {
          model: Plan_Pago,
          attributes: ["id", "nombre_plan_pago"],
        },
        {
          model: Categoria,
          attributes: ["id", "nombre_categoria","imagen_categoria","logo_categoria"],
          through: {
            attributes: [],
          },
        },
        {
          model: Infraestructura,
          attributes: ["id", "nombre_infraestructura", "InfraestructuraTipoId","imagen"],
          through: {
            attributes: [],
          },
        },
        {
          model: Afiliacion,
          attributes: ["id", "nombre_afiliacion", "Afiliacion_tipo_Id","logo"],
          through: {
            attributes: [],
          },
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
        "video_url"
      ],
    });

    res.json(cole);
  } catch (err) {
    res.json({ err });
  }
});

//--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const {
      direccion,
      alumnos,
      fundacion,
      nombreDirector,
      nombreColegio,
      multimedia,
      ruc,
      area,
      ugel,
      lat,
      lng,
      propuesta,
      descripcion,
      ingles,
      categoria,
      departamento,
      provincia,
      infraestructura,
      niveles,
      afiliaciones
    } = req.body;
    let video_url = multimedia.video_url;
    let primera_imagen = multimedia.image
    let galeria_fotos = JSON.stringify(multimedia.images);
    const ubicacion = { lat, lng };
    const editedColegio = await Colegio.update(
      {
        direccion: direccion,
        numero_estudiantes: alumnos,
        fecha_fundacion: fundacion,
        nombre_director: nombreDirector,
        nombre_colegio: nombreColegio,
        //multimedia
        primera_imagen: primera_imagen,
        galeria_fotos: galeria_fotos,
        video_url: video_url,
        ruc: ruc,
        area: area,
        ugel: ugel,
        ubicacion: JSON.stringify(ubicacion),
        propuesta_valor: propuesta,
        descripcion: descripcion,
        horas_idioma_extranjero: ingles,
        DepartamentoId: departamento.id,
        provincia: provincia,
      },

      { where: { id: id } }
    );
    const colegio = await Colegio.findByPk(id);
    if (colegio === null) { 
      console.log("Not found!");
    } else {
      await colegio.setInfraestructuras(infraestructura.map((i) => i.id));
      await colegio.setCategoria(categoria.map((c) => c.id));
      await colegio.setNivels(niveles.map((n) => n.id));
      await colegio.setAfiliacions(afiliaciones.map((a) => a.id));
    }

    res.json(editedColegio);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
