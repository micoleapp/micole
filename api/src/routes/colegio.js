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
} = require('../db.js');
const { Op } = require('sequelize');

// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get('/', async (req, res) => {
  const { distritos, grado, ingreso } = req.query;
  let response = [];
  const arrayDistritos =
    distritos && distritos !== 'false' ? distritos.split(',') : null;
  try {
    let cole;
    cole = await Colegio.findAll({
      include: [
        {
          model: Nivel,
          attributes: ['nombre_nivel', 'id'],
        },
        {
          model: Vacante,
          attributes: ['año', 'GradoId'],
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
          attributes: ['id', 'nombre_categoria'],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        ...(arrayDistritos && {
          [Op.or]: arrayDistritos.map((distrito) => ({ DistritoId: distrito })),
        }),
        ...(grado && grado !== 'false' && { '$Vacantes.GradoId$': grado }),
        ...(ingreso && ingreso !== 'false' && { '$Vacantes.año$': ingreso }),
      },
    });

    response = cole;
    /*     function filterByGrado(array, grado) {
      for (let i = 0; i < array.length; i++) {
        console.log(array[i].GradoId === Number(grado));
        if (array[i].GradoId === Number(grado)) {
          return true;
        }
      }
      return false;
    }

    function filterByIngreso(array, ingreso) {
      for (let i = 0; i < array.length; i++) {
        console.log(array[i].año === Number(ingreso));
        if (array[i].año === Number(ingreso)) {
          return true;
        }
      }
      return false;
    }
    
    distrito !== "false"
      ? (response = response.filter((c) => c.Distrito.id === Number(distrito)))
      : null;
    grado !== "false"
      ? (response = response.filter((c) => filterByGrado(c.Vacantes, grado)))
      : null;
    ingreso !== "false"
      ? (response = response.filter((c) => filterByIngreso(c.Vacantes, ingreso)))
      : null;
 */
    res.json(response);
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
          attributes: ['año', 'GradoId'],
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

/* {
  distrits: Array(4) [ 1, 2, 3, 4 ],
  grado: 4,
  tipo: 7,
  pension: Array(2) [ 20, 71 ],
  cuota: Array(2) [ 20, 86 ],
  rating: 5.5,
  ingles: 6,
  ingreso: 2024
} */
/* 
{
  distrits: [],
  grado: null,
  tipo: null,
  pension: Array(2) [ 20, 71 ],
  cuota: Array(2) [ 20, 86 ],
  rating: null,
  ingles: 6,
  ingreso: null
}
 */
router.post('/filter', async (req, res) => {
    const { distrits, grado, tipo, pension, cuota, rating, ingles, ingreso } = req.body;
    console.log(req.body)
  try {
    let cole;
    cole = await Colegio.findAll({
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
          attributes: ['id', 'nombre_categoria'],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        ...(distrits.length !== 0 && {
        [Op.or]: distrits.map((distrito) => ({ DistritoId: distrito })),
        }),
        ...(grado.length !== 0  && { '$Vacantes.GradoId$': grado }),
        ...(ingreso.length !== 0  && { '$Vacantes.año$': ingreso }),
        ...(pension && {
          '$Vacantes.cuota_pension$': {
            [Op.between]: [pension[0], pension[1]],
          },
        }),
        ...(cuota && {
          '$Vacantes.cuota_ingreso$': { [Op.between]: [cuota[0], cuota[1]] },
        }),
        ...(tipo.length !== 0  && { '$Categoria.id$': tipo }),
        ...(ingles && { $horas_idioma_extranjero$: { [Op.lte]: ingles } }),
        ...(rating && { $rating$: { [Op.gte]: rating } }),
      },
    });
    response = cole;
    res.json(response);
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
