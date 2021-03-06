import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const dataTypes = SQ.DataTypes;

//create posts table, and define schema
const Post = sequelize.define('post', {
  id: {
    type: dataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { 
    type: dataTypes.STRING(128),
    allowNull: false,
  },
  text: {
    type: dataTypes.TEXT,
    allowNull: false,
  }
});


export async function getAll() {
  return Post.findAll({
    order: [['createdAt', 'DESC']],
  });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
    order: [['createdAt', 'DESC']],
  });
}

export async function create(title, text) {
  return Post.create({ title, text });
}

export async function update(id, title, text) {
  return Post.findByPk(id)
    .then((post) => post.update({ title, text }));
}

export async function remove(id) {
  return Post.destroy({ where: { id } });
}