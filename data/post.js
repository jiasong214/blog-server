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
  category: {
    type: dataTypes.STRING(128),
    allowNull: true,
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

export async function getByCategory(category) {
  return Post.findAll({
    where: { category },
    order: [['createdAt', 'DESC']],
  });
}

export async function getById(id) {
  return Post.findOne({
    where: { id },
    order: [['createdAt', 'DESC']],
  });
}

export async function create(category, title, text) {
  return Post.create({category, title, text});
}

export async function update(id, category, title, text) {
  return Post.findByPk(id)
    .then((post) => post.update({ category, title, text }));
}

export async function remove(id) {
  return Post.destroy({ where: { id } });
}

export async function getCategories() {
  const categoryArr = [];

  //get all posts category string
  const categoryDB = await Post.findAll({
    attributes: [ 'category' ],
  });

  categoryDB.forEach((colum) => {
    const columsCategoryStr = [];
    //make a array with all colums category data
    if(colum.category !== null) columsCategoryStr.push(colum.category);

    columsCategoryStr.forEach((categoryStr) => {
      //make a array with every categories that each colum has
      const categories = categoryStr.split(',');
      //and push items in array to result array
      categories.forEach((category) => {
        if(category === '' || categoryArr.includes(category)) return;
        categoryArr.push(category);
      })
    })
  });


  return categoryArr;
}