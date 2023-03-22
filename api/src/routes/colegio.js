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
  Nivel,
  Vacante,
  Grado,
  Horario,
  Metodos,
  Dificultades,
  Review,
  Evento,
} = require("../db.js");
const { Op } = require("sequelize");
const getPagination = require("../utils/getPagination");

// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  const { distritos, grado, ingreso } = req.query;
  const cleanedUrl = req.originalUrl.replace(/limit=\d+&page=\d+&?/, "");
  const url = `${req.protocol}://${req.get("host")}${cleanedUrl}`;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  try {
    const totalColegios = await Colegio.findAll({
      include: [
        {
          model: Vacante,
          include: [{ model: Grado }],
        },
      ],
      where: {
        ...(distritos && distritos !== "false" && { DistritoId: distritos }),
        ...(grado && grado !== "false" && { "$Vacantes.GradoId$": grado }),
        ...(ingreso && ingreso !== "false" && { "$Vacantes.año$": ingreso }),
      },
      subQuery: false,
    });

    const colegios = await Colegio.findAll({
      include: [
        {
          model: Nivel,
          attributes: ["nombre_nivel", "id"],
        },
        {
          model: Idioma,
          attributes: ["nombre_idioma", "id"],
          through: {
            attributes: [],
          },
        },
        {
          model: Vacante,
          include: [{ model: Grado, attributes: ["nombre_grado"] }],
          required: grado !== "false" || ingreso !== "false" ? true : false,
          duplicating: grado !== "false" || ingreso !== "false" ? false : true,
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
          model: Horario,
          attributes: ["dia", "horarios"],
        },
        {
          model: Review,
        },
        {
          model: Categoria,
          attributes: [
            "id",
            "nombre_categoria",
            "imagen_categoria",
            "logo_categoria",
          ],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        ...(distritos && distritos !== "false" && { DistritoId: distritos }),
        ...(grado && grado !== "false" && { "$Vacantes.GradoId$": grado }),
        ...(ingreso && ingreso !== "false" && { "$Vacantes.año$": ingreso }),
      },
      //(Sequelize) Problemas con Limit y Offset con los includes hasMany -> https://github.com/sequelize/sequelize/issues/7585
      /*    limit: limit,
      offset: skip, */
    });
    const endIndex = skip + limit;
    const colegiosPaginados = colegios.slice(skip, endIndex);
    const pagination = getPagination(url, page, limit, colegios.length);
    res.json({
      count: totalColegios.length,
      pages: Math.ceil(totalColegios.length / limit),
      prev: pagination.prev,
      next: pagination.next,
      first: pagination.first,
      last: pagination.last,
      colegios: colegiosPaginados,
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

//------- PEDIR UNO DE LOS COLEGIOS POR ID--------
router.get("/:Colegio_id", async (req, res) => {
  const { Colegio_id } = req.params;

  try {
    const cole = await Colegio.findAll({
      where: { id: [Colegio_id] },
      include: [
        {
          model: Nivel,
          attributes: ["nombre_nivel", "id"],
        },
        {
          model: Vacante,
          include: [{ model: Grado, attributes: ["nombre_grado"] }],
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
          model: Metodos,
          attributes: ["id_metodo", "nombre_metodo"],
        },
        {
          model: Dificultades,
          attributes: ["id_dificultad", "nombre_dificultad"],
        },
        {
          model: Horario,
          attributes: ["id", "dia", "horarios"],
        },
        {
          model: Review,
        },
        {
          model: Evento,
        },
        {
          model: Categoria,
          attributes: [
            "id",
            "nombre_categoria",
            "imagen_categoria",
            "logo_categoria",
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: Infraestructura,
          attributes: [
            "id",
            "nombre_infraestructura",
            "InfraestructuraTipoId",
            "imagen",
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: Afiliacion,
          attributes: ["id", "nombre_afiliacion", "Afiliacion_tipo_Id", "logo"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(cole);
  } catch (err) {
    res.json({ err });
  }
});
router.post("/filter", async (req, res) => {
  const {
    distrits,
    grado,
    tipo,
    pension,
    cuota,
    rating,
    ingles,
    ingreso,
    order,
    metodos,
    dificultades,
  } = req.body;
  console.log(req.body);
  let orderBy = null;
  switch (order) {
    case "mayor_precio_pension":
      orderBy = [[{ model: Vacante }, "cuota_pension", "DESC"]];
      break;
    case "menor_precio_pension":
      orderBy = [[{ model: Vacante }, "cuota_pension", "ASC"]];
      break;
    case "mayor_precio_matricula":
      orderBy = [[{ model: Vacante }, "matricula", "DESC"]];
      break;
    case "menor_precio_matricula":
      orderBy = [[{ model: Vacante }, "matricula", "ASC"]];
      break;
    case "mayor_precio_ingreso":
      orderBy = [[{ model: Vacante }, "cuota_ingreso", "DESC"]];
      break;
    case "menor_precio_ingreso":
      orderBy = [[{ model: Vacante }, "cuota_ingreso", "ASC"]];
      break;
    case "mayor_rating":
      orderBy = [["rating", "DESC"]];
      break;
    case "menor_rating":
      orderBy = [["rating", "ASC"]];
      break;
    default:
      orderBy = null;
      break;
  }
  const cleanedUrl = req.originalUrl.replace(/limit=\d+&page=\d+&?/, "");
  const url = `${req.protocol}://${req.get("host")}${cleanedUrl}`;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  try {
    const colegios = await Colegio.findAll({
      include: [
        {
          model: Nivel,
          attributes: ["nombre_nivel", "id"],
        },
        {
          model: Vacante,
          include: [
            {
              model: Grado,
              attributes: ["nombre_grado"],
            },
          ],
          required:
            grado.length !== 0 ||
            ingreso.length !== 0 ||
            pension.length !== 0 ||
            cuota.length !== 0
              ? true
              : false,
          duplicating:
            grado.length !== 0 ||
            ingreso.length !== 0 ||
            pension.length !== 0 ||
            cuota.length !== 0
              ? false
              : true,
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
          model: Metodos,
          attributes: ["id_metodo", "nombre_metodo"],
        },
        {
          model: Dificultades,
          attributes: ["id_dificultad", "nombre_dificultad"],
        },
        {
          model: Horario,
          attributes: ["dia", "horarios"],
        },
        {
          model: Categoria,
          through: {
            attributes: [],
          },
          required: tipo.length !== 0 ? true : false,
          duplicating: tipo.length !== 0 ? false : true,
        },
        {
          model: Review,
        },
      ],
      where: {
        isActive: true,
        ...(distrits.length !== 0 && {
          [Op.or]: distrits.map((distrito) => ({ DistritoId: distrito })),
        }),
        ...(grado.length !== 0 && { "$Vacantes.GradoId$": grado }),
        ...(ingreso.length !== 0 && { "$Vacantes.año$": ingreso }),
        ...(pension.length !== 0 && {
          "$Vacantes.cuota_pension$": {
            [Op.between]: [pension[0], pension[1]],
          },
        }),
        ...(cuota.length !== 0 && {
          "$Vacantes.cuota_ingreso$": { [Op.between]: [cuota[0], cuota[1]] },
        }),
        ...(tipo.length !== 0 && { "$Categoria.id$": tipo }),
        ...(metodos.length !== 0 && { "$Metodos.id_metodo$": metodos }),
        ...(dificultades.length !== 0 && {
          "$Dificultades.id_dificultad$": dificultades,
        }),
        ...(ingles && { $horas_idioma_extranjero$: { [Op.lte]: ingles } }),
        ...(rating && { rating: { [Op.gte]: rating } }),
      },
      order: orderBy,
      //(Sequelize) Problemas con Limit y Offset con los includes hasMany -> https://github.com/sequelize/sequelize/issues/7585
      /*       limit: limit,
      offset: skip, */
    });
    const endIndex = skip + limit;
    const colegiosPaginados = colegios.slice(skip, endIndex);
    const pagination = getPagination(url, page, limit, colegios.length);
    res.json({
      count: colegios.length,
      pages: Math.ceil(colegios.length / limit),
      prev: pagination.prev,
      next: pagination.next,
      first: pagination.first,
      last: pagination.last,
      colegios: colegiosPaginados,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

//-----Cambiar estado activo de Colegio
router.put("/activo/:id"), async (req,res) => {
  try {
    const { id } = req.params;

    const colegio = await Colegio.findByPk(id);
    if (!colegio) {
      return next({
        statusCode: 404,
        message: 'El colegio ha modificar no existe',
      });
    }
    colegio.isActive = true;
    colegio.save();
  } catch (error) {
    res.status(500).send({
      message: err.message,
    });
  }
}

//--------------------PUT  UN COLEGIO POR ID-------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
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
      afiliaciones,
      isActive,
      metodos,
      dificultades,
    } = req.body;
    let video_url = "";
    let primera_imagen = "";
    let galeria_fotos = "";
    console.log(multimedia);
    if (multimedia) {
      video_url = multimedia.video_url;
      primera_imagen = multimedia.image;
      galeria_fotos = JSON.stringify(multimedia.images);
    }
    console.log(video_url);
    console.log(primera_imagen);
    console.log(galeria_fotos);
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
        isActive: isActive,
      },

      { where: { id: id } }
    );
    const colegio = await Colegio.findByPk(id);
    await colegio.setMetodos(metodos.map((i) => i.id_metodo));
    await colegio.setDificultades(dificultades.map((i) => i.id_dificultad));
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

//--------------------PUT  MULTIMEDIA POR ID-------
router.put("/multimedia/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { multimedia } = req.body;
    let video_url = "";
    let primera_imagen = "";
    let galeria_fotos = "";
    if (multimedia) {
      video_url = multimedia.video_url;
      primera_imagen = multimedia.image;
      galeria_fotos = JSON.stringify(multimedia.images);
    }

    const editedColegio = await Colegio.update(
      {
        //multimedia
        primera_imagen: primera_imagen,
        galeria_fotos: galeria_fotos,
        video_url: video_url,
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

router.put("/activo/:id", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    const colegio = await Colegio.findByPk(id);
    if (!colegio) {
      return next({
        statusCode: 400,
        message: "El registro solicitado no existe",
      });
    }
    colegio.isActive = isActive;
    await colegio.save();
    return res.status(200).send({ message: "El registro se modifico" });
  } catch (error) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
