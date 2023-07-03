<script setup>
const route = useRoute();
const page = ref(1);
const sort = ref('');
const lang = ref(route.query.lang ?? '');
const { data } = await useFetch('/api/teachers', {
  methods: 'get',
  query: {
    page,
    sort,
    lang,
  },
  watch: [page, sort, lang],
  onResponse({ request, response, options }) {
    page.value = response._data.page;
  },
});
</script>
<template>
  <div>
    <section class="teacher">
      <div class="container header-space">
        <div class="row pt-5 justify-content-center">
          <div class="col-lg-9 col-12">
            <div class="teacher-nav py-3 w-50 ms-auto me-0">
              <div class="row">
                <div class="col">
                  <select
                    name="teacher-lang"
                    id="teacher-lang"
                    class="form-select"
                    v-model="lang"
                  >
                    <option value="">語言</option>
                    <option value="eng">英語</option>
                    <option value="jap">日語</option>
                    <option value="kor">韓語</option>
                    <option value="spa">西班牙語</option>
                    <option value="dut">德語</option>
                  </select>
                </div>
                <div class="col">
                  <select
                    name="teacher-sort"
                    id="teacher-sprt"
                    class="form-select"
                    v-model="sort"
                  >
                    <option value="">排序</option>
                    <option value="sort-hot">人氣度</option>
                    <option value="sort-price-low">價格低</option>
                    <option value="sort-price-high">價格高</option>
                    <option value="sort-new">新加入</option>
                    <option value="sort-senior">資深</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              class="teacher-info"
              v-for="item in data.items"
              :key="item.teacher_id"
            >
              <div class="row p-5">
                <div
                  class="col-md-3 col-12 d-flex flex-column justify-content-center align-items-center mb-3"
                >
                  <img
                    :src="item.teacher_photo"
                    :alt="item.name"
                    class="mx-aut"
                  />
                  <p
                    class="fs-4 mb-3 price text-secondary fw-bolder text-center"
                  >
                    {{ item.price }} 點
                    <span class="fs-6">/ {{ item.price_minutes }} min</span>
                  </p>
                  <a
                    class="btn btn-warning text-light mb-3 w-100"
                    :href="`/teacherDetails/${item.teacher_id}#schedule`"
                  >
                    <font-awesome-icon
                      icon="fas fa-calendar-day"
                    ></font-awesome-icon>
                    立即預約
                  </a>
                  <a
                    class="btn btn-secondary text-light w-100"
                    :href="`/teacherDetails/${item.teacher_id}`"
                  >
                    <font-awesome-icon
                      icon="fas fa-clipboard-user"
                    ></font-awesome-icon>
                    瞭解老師
                  </a>
                </div>
                <div
                  class="col-md-9 col-12 d-flex flex-column justify-content-evenly"
                >
                  <p class="teacher-title mb-0 fs-3 fw-bolder text-primary">
                    {{ item.name }} | {{ item.title }}
                  </p>
                  <p class="text-secondary text-decoration-underline fs-6">
                    <span
                      class="badge rounded-pill text-bg-secondary"
                      v-for="t in item.tags"
                      :key="t"
                      >{{ t }}</span
                    >
                  </p>
                  <p class="fs-6 d-none d-md-block teacher-intro">
                    {{ item.introduction }}
                  </p>
                </div>
              </div>
            </div>
            <div class="teacher-pagination text-center">
              <nav>
                <ul class="pagination justify-content-center">
                  <li class="page-item" :class="{ disabled: page == 1 }">
                    <a class="page-link" @click="if (page > 1) page--;">
                      <span>&laquo;</span>
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="i in data.totalPages"
                    :class="{ active: page == i }"
                  >
                    <a class="page-link" @click="page = i">{{ i }}</a>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: page == data.totalPages }"
                  >
                    <a
                      class="page-link"
                      @click="if (page < data.totalPages) page++;"
                    >
                      <span>&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
