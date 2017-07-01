module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Lynk Education',
    titleTemplate: 'Lynk - %s',
    meta: [
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.',
      },
    ],
  },
};
