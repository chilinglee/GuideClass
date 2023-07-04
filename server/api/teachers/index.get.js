import { TeacherModel } from '../../models/teacher.model';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 10, lang, sort } = getQuery(event);
  let pageN = Number(page);
  const limitN = Number(limit);

  let teachers = await TeacherModel.findAll();
  if (lang) {
    teachers = teachers.filter((x) => x.language == lang.toUpperCase());
  }

  if (sort === 'sort-hot') {
    teachers.sort((a, b) => {
      return b.reservationCount - a.reservationCount;
    });
  } else if (sort === 'sort-new') {
    teachers.sort((a, b) => {
      return a.updated_on - b.updated_on;
    });
  } else if (sort === 'sort-senior') {
    teachers.sort((a, b) => {
      return b.updated_on - a.updated_on;
    });
  } else if (sort === 'sort-price-low') {
    teachers.sort((a, b) => {
      return a.price / a.price_minutes - b.price / b.price_minutes;
    });
  } else if (sort === 'sort-price-high') {
    teachers.sort((a, b) => {
      return b.price / b.price_minutes - a.price / a.price_minutes;
    });
  }

  const totalDataCount = teachers.length;
  const totalPages = Math.ceil(teachers.length / limitN);
  if (pageN > totalPages) {
    pageN = 1;
  }
  const items = teachers.slice((pageN - 1) * limitN, pageN * limitN);
  const startNth = (pageN - 1) * limitN + 1;
  const endNth = (pageN - 1) * limitN + items.length;

  return {
    page: pageN,
    totalDataCount,
    totalPages,
    pageLimit: limitN,
    currentPage: pageN,
    startNth,
    endNth,
    items,
  };
});
