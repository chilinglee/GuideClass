import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faStar,
  faStarHalfStroke,
  faCoins,
  faChalkboardUser,
  faCalendarCheck,
  faBookOpenReader,
  faQuoteLeft,
  faSackDollar,
  faCalendarDay,
  faClipboardUser,
  faArrowDown,
  faCircleCheck,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faFacebook,
  faInstagram,
  faEnvelope,
  faHeart,
  faStar,
  faStarHalfStroke,
  faCoins,
  faChalkboardUser,
  faCalendarCheck,
  faBookOpenReader,
  faQuoteLeft,
  faSackDollar,
  faCalendarDay,
  faClipboardUser,
  faArrowDown,
  faCircleCheck,
  faMagnifyingGlass
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
});
