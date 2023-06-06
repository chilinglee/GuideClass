export default defineNuxtConfig({
  build: { transpile: ['@fortawesome/vue-fontawesome'] },
  css: [
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '~/node_modules/@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/style/main.css',
  ],
  plugins: [
    {
      src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
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
