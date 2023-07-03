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
  runtimeConfig: {
    DATABASE: process.env.DATABASE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_ACCOUNT: process.env.DATABASE_ACCOUNT,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  },
});
