const posts = [
  {
    id: 1,
    category: 'react',
    title: 'this is title',
    text: 'hello this is text',
    createAt: new Date().toString(),
  }
]

export function getAll() {
  return posts;
}

export function getByCategory(category) {
  return posts.filter(post => post.category === category);
}

export function create(category, text) {
  const post = {
    id: Date.now().toString(),
    category,
    title,
    text,
    createdAt: new Date().toString(),
  }

  posts = [post, ...posts];
}

export function update(id, category, title, text) {
  const post = posts.find(post => post.id === id);

  if (post) {
    post.category = category;
    post.title = title;
    post.text = text;
  }
}

export function remove(id) {
  posts = posts.filter(post => post.id !== id);
}