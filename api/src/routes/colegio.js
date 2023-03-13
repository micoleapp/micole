const { Router } = require('express');
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
  Review,
} = require('../db.js');
const { Op } = require('sequelize');
const getPagination = require('../utils/getPagination');

// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get('/', async (req, res) => {
  const { distritos, grado, ingreso } = req.query;
  const cleanedUrl = req.originalUrl.replace(/limit=\d+&page=\d+&?/, '');
  const url = `${req.protocol}://${req.get('host')}${cleanedUrl}`;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  try {
    const colegios = await Colegio.findAll({
      include: [
        {
          model: Nivel,
          attributes: ['nombre_nivel', 'id'],
        },
        {
          model: Idioma,
          attributes: ['nombre_idioma', 'id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Vacante,
          include: [{ model: Grado }],
        },
        {
          model: Pais,
          attributes: ['id', 'nombre_pais'],
        },
        {
          model: Departamento,
          attributes: ['id', 'nombre_departamento'],
        },
        {
          model: Provincia,
          attributes: ['id', 'nombre_provincia'],
        },
        {
          model: Distrito,
          attributes: ['id', 'nombre_distrito'],
        },
        {
          model: Plan_Pago,
          attributes: ['id', 'nombre_plan_pago'],
        },
        {
          model: Horario,
          attributes: ['dia', 'horarios'],
        },
        {
          model: Review,
        },
        {
          model: Categoria,
          attributes: [
            'id',
            'nombre_categoria',
            'imagen_categoria',
            'logo_categoria',
          ],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        ...(distritos && distritos !== 'false' && { DistritoId: distritos }),
        ...(grado && grado !== 'false' && { '$Vacantes.GradoId$': 7 }),
        ...(ingreso && ingreso !== 'false' && { '$Vacantes.año$': ingreso }),
      },
      limit: limit,
      offset: skip,
      subQuery: false,
    });
    const pagination = getPagination(url, page, limit, colegios.length);
    res.json({
      count: colegios.length,
      pages: Math.ceil(colegios.length / limit),
      prev: pagination.prev,
      next: pagination.next,
      first: pagination.first,
      last: pagination.last,
      colegios,
    });
/*     res.json(colegios); */
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

//------- PEDIR UNO DE LOS COLEGIOS POR ID--------
router.get('/:Colegio_id', async (req, res) => {
  const { Colegio_id } = req.params;

  try {
    const cole = await Colegio.findAll({
      where: { id: [Colegio_id] },
      include: [
        {
          model: Nivel,
          attributes: ['nombre_nivel', 'id'],
        },
        {
          model: Vacante,
          include: [{ model: Grado, attributes: ['nombre_grado'] }],
        },
        {
          model: Idioma,
          attributes: ['nombre_idioma', 'id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Pais,
          attributes: ['id', 'nombre_pais'],
        },
        {
          model: Departamento,
          attributes: ['id', 'nombre_departamento'],
        },
        {
          model: Provincia,
          attributes: ['id', 'nombre_provincia'],
        },
        {
          model: Distrito,
          attributes: ['id', 'nombre_distrito', 'ProvinciaId'],
        },
        {
          model: Plan_Pago,
          attributes: ['id', 'nombre_plan_pago'],
        },
        {
          model: Horario,
          attributes: ['id', 'dia', 'horarios'],
        },
        {
          model: Review,
        },
        {
          model: Categoria,
          attributes: [
            'id',
            'nombre_categoria',
            'imagen_categoria',
            'logo_categoria',
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: Infraestructura,
          attributes: [
            'id',
            'nombre_infraestructura',
            'InfraestructuraTipoId',
            'imagen',
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: Afiliacion,
          attributes: ['id', 'nombre_afiliacion', 'Afiliacion_tipo_Id', 'logo'],
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
router.post('/filter', async (req, res) => {
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
  } = req.body;

  let orderBy = null;
  switch (order) {
    case 'mayor_precio_pension':
      orderBy = [['$Vacantes.cuota_pension$', 'DESC']];
      break;
    case 'menor_precio_pension':
      orderBy = [['$Vacantes.cuota_pension$', 'ASC']];
      break;
    case 'mayor_precio_matricula':
      orderBy = [['$Vacantes.cuota_ingreso$', 'DESC']];
      break;
    case 'menor_precio_matricula':
      orderBy = [['$Vacantes.cuota_ingreso$', 'ASC']];
      break;
    case 'mayor_precio_ingreso':
      orderBy = [['$Vacantes.cuota_ingreso$', 'DESC']];
      break;
    case 'menor_precio_ingreso':
      orderBy = [['$Vacantes.cuota_ingreso$', 'ASC']];
      break;
    case 'mayor_rating':
      orderBy = [['rating', 'DESC']];
      break;
    case 'menor_rating':
      orderBy = [['rating', 'ASC']];
      break;
    default:
      orderBy = null;
      break;
  }
  const cleanedUrl = req.originalUrl.replace(/limit=\d+&page=\d+&?/, '');
  const url = `${req.protocol}://${req.get('host')}${cleanedUrl}`;
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  const totalColegios = await Colegio.count();
  const pagination = getPagination(url, page, limit, totalColegios);
  try {
    const colegios = await Colegio.findAll({
      include: [
        {
          model: Nivel,
          attributes: ['nombre_nivel', 'id'],
        },
        {
          model: Vacante,
          include: [{ model: Grado, attributes: ['nombre_grado'] }],
        },
        {
          model: Idioma,
          attributes: ['nombre_idioma', 'id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Pais,
          attributes: ['id', 'nombre_pais'],
        },
        {
          model: Departamento,
          attributes: ['id', 'nombre_departamento'],
        },
        {
          model: Provincia,
          attributes: ['id', 'nombre_provincia'],
        },
        {
          model: Distrito,
          attributes: ['id', 'nombre_distrito'],
        },
        {
          model: Plan_Pago,
          attributes: ['id', 'nombre_plan_pago'],
        },
        {
          model: Horario,
          attributes: ['dia', 'horarios'],
        },
        {
          model: Categoria,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
        },
      ],
      where: {
        ...(distrits.length !== 0 && {
          [Op.or]: distrits.map((distrito) => ({ DistritoId: distrito })),
        }),
        ...(grado.length !== 0 && { '$Vacantes.GradoId$': grado }),
        ...(ingreso.length !== 0 && { '$Vacantes.año$': ingreso }),
        ...(pension.length !== 0 && {
          '$Vacantes.cuota_pension$': {
            [Op.between]: [pension[0], pension[1]],
          },
        }),
        ...(cuota.length !== 0 && {
          '$Vacantes.cuota_ingreso$': { [Op.between]: [cuota[0], cuota[1]] },
        }),
        ...(tipo.length !== 0 && { '$Categoria.id$': tipo }),
        ...(ingles && { $horas_idioma_extranjero$: { [Op.lte]: ingles } }),
        ...(rating && { $rating$: { [Op.gte]: rating } }),
      },
      order: orderBy,
      limit: limit,
      offset: skip,
      subQuery: false,

    });
    const pagination = getPagination(url, page, limit, colegios.length);
     res.json({
      count: colegios.length,
      pages: Math.ceil(colegios.length / limit),
      prev: pagination.prev,
      next: pagination.next,
      first: pagination.first,
      last: pagination.last,
      colegios,
    });
    /* res.json(colegios); */
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

//--------------------PUT  UN COLEGIO POR ID-------
router.put('/:id', async (req, res) => {
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
      afiliaciones,
    } = req.body;
    let video_url = multimedia.video_url;
    let primera_imagen = multimedia.image;
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
      console.log('Not found!');
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
