export default {
  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '~/assets/style/main.css',
  ],
  plugins: [
    {
      src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      mode: 'client',
    },
  ],
  components: true,
};
