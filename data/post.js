let posts = [
  {
    "id": 1,
    "category": ["react"],
    "title": "This is first post",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur orci a metus pharetra rutrum. Etiam condimentum magna sed imperdiet scelerisque. Quisque tristique, elit sit amet posuere eleifend, augue dolor malesuada elit, a ornare lectus odio a tellus. Cras consequat non nisi non rhoncus. Nam ac libero a elit elementum efficitur. Sed suscipit vulputate vehicula.",
    "createAt": new Date().toString()
  },
  {
    "id": 2,
    "category": ["react", "javascript"],
    "title": "This is second post",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur orci a metus pharetra rutrum. Etiam condimentum magna sed imperdiet scelerisque. Quisque tristique, elit sit amet posuere eleifend, augue dolor malesuada elit, a ornare lectus odio a tellus. Cras consequat non nisi non rhoncus. Nam ac libero a elit elementum efficitur. Sed suscipit vulputate vehicula.",
    "createAt": new Date().toString()
  },
  {
    "id": 3,
    "category": ["react", "javascript", "node"],
    "title": "This is third post",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur orci a metus pharetra rutrum. Etiam condimentum magna sed imperdiet scelerisque. Quisque tristique, elit sit amet posuere eleifend, augue dolor malesuada elit, a ornare lectus odio a tellus. Cras consequat non nisi non rhoncus. Nam ac libero a elit elementum efficitur. Sed suscipit vulputate vehicula.",
    "createAt": new Date().toString()
  }
]

export async function getAll() {
  return posts;
}

export async function getByCategory(category) {
  return posts.filter(post => post.category.includes(category));
}

export async function getById(id) {
  return posts.filter((post) => parseInt(post.id) === parseInt(id));
}

export async function create(category, title, text) {
  const post = {
    id: Date.now().toString(),
    category,
    title,
    text,
    createdAt: new Date().toString(),
  }

  posts = [post, ...posts];
  return post;
}

export async function update(id, category, title, text) {
  let post = posts.find((post) => parseInt(post.id) === parseInt(id));

  if (post) {
    post.category = category;
    post.title = title;
    post.text = text;
  }

  return post;
}

export async function remove(id) {
  posts = posts.filter((post) => parseInt(post.id) !== parseInt(id));
}

export async function getCategories() {
  const categoryArr = [];

  posts.forEach((post) => {
    post.category.forEach((eachCategory) => {
      if(categoryArr.includes(eachCategory)) return;
      categoryArr.push(eachCategory);
    })
  });

  return categoryArr;
}