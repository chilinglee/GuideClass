export default defineNuxtConfig({
  build: { transpile: ['@fortawesome/vue-fontawesome'] },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/style/main.css',
  ],
  plugins: [
    {
      src: '~/plugins/bootstrap.js',
      mode: 'client',
    },
    {
      src: '~/plugins/fontawesome.js',
    },
  ],
  components: true,
  compilerOptions: {
    isCustomElement: (tag) => {
      return ['font-awesome-icon'].includes(tag);
    },
  },
});
