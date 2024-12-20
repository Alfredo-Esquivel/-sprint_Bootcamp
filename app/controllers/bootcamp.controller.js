//bootcamp.controller.js
const { Bootcamp, User } = require('../models');

// Crear un nuevo bootcamp
exports.createBootcamp = async (req, res) => {
  const { title, cue, descripcion } = req.body;

  try {
    if (!title || !cue || !descripcion) {
      return res.status(400).json({ message: 'Todos los campos (title, cue, descripcion) son requeridos' });
    }

    // Crear el nuevo bootcamp
    const newBootcamp = await Bootcamp.create({ title, cue, descripcion });
    res.status(201).json({ message: 'Bootcamp creado exitosamente', bootcamp: newBootcamp });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el bootcamp', error });
  }
};

// Asociar un usuario a un bootcamp
exports.addUser = async (req, res) => {
  // Obtener los IDs de los parámetros de la URL, no del cuerpo
  const { bootcampId, userId } = req.params;

  try {
    // Buscar el bootcamp y el usuario por sus IDs
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);

    // Verificar que el bootcamp y el usuario existan
    if (!bootcamp || !user) {
      return res.status(404).json({ message: 'Bootcamp o usuario no encontrado' });
    }

    // Agregar el usuario al bootcamp
    await bootcamp.addUser(user);  // Usamos el método generado por Sequelize para asociar el usuario al bootcamp

    res.status(200).json({ message: 'Usuario añadido al bootcamp exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir usuario al bootcamp', error });
  }
};


// Obtener un bootcamp por ID
exports.findById = async (req, res) => {
  const { id } = req.params;

  try {
    const bootcamp = await Bootcamp.findByPk(id, {
      include: User,  // Incluir los usuarios relacionados
    });

    if (!bootcamp) return res.status(404).json({ message: 'Bootcamp no encontrado' });

    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el bootcamp', error });
  }
};

// Obtener todos los bootcamps y sus usuarios
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: User,  // Incluir los usuarios relacionados
    });
    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los bootcamps', error });
  }
};
