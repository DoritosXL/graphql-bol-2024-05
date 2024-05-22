const users = [
  {
    id: 'u1',
    firstname: 'Joop',
    email: 'jo@infosupport.com',
    yearOfBirth: 1982,
  },
  {
    id: 'u2',
    firstname: 'Ibrahim',
    email: 'ib@infosupport.com',
    yearOfBirth: 1989,
  },
  {
    id: 'u3',
    firstname: 'Carin',
    email: 'ca@infosupport.com',
    yearOfBirth: 1988,
  },
];

const blogs = [
  {
    id: 'b1',
    title: 'blog A',
    content: 'Content of Blog A',
    published: true,
    userid: 'u1',
  },
  {
    id: 'b2',
    title: 'blog B',
    content: 'Content of Blog B',
    published: true,
    userid: 'u2',
  },
  {
    id: 'b3',
    title: 'blog C',
    content: 'Content of Blog C',
    published: false,
    userid: 'u1',
  },
];

// 👇 add this array
const comments = [
  { id: 'c1', content: 'comment 1 on blog A', blogid: 'b1', userid: 'u2' },
  { id: 'c2', content: 'comment 2 on blog A', blogid: 'b1', userid: 'u3' },
  { id: 'c3', content: 'comment 1 on blog B', blogid: 'b2', userid: 'u1' },
  { id: 'c4', content: 'comment 2 on blog B', blogid: 'b2', userid: 'u3' },
];

const db = {
  users,
  blogs,
  comments, // 👈 add this line
};

export default db;
