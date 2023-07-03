<script setup>
const teacher_id = useRoute().params.id;
const teacher = ref({});
const teacherSchedule = ref([]);
await useFetch(`/api/teachers/${teacher_id}`, {
  method: 'get',
}).then((response) => {
  teacher.value = response.data.value;
});
</script>
<template>
  <div>
    <section class="teacher-detail header-space container-fluid">
      <div class="container p-5">
        <div class="information p-5">
          <div class="row mb-5">
            <div class="col-12 col-xl-4 d-none d-xl-block">
              <img
                :src="teacher.teacher_photo"
                :alt="teacher.name"
                class="mx-auto w-100 mb-3"
              />
              <button class="btn btn-warning w-100 text-light">
                <font-awesome-icon icon="far fa-heart"></font-awesome-icon> 收藏
              </button>
            </div>
            <div class="col-12 col-md-8 col-xl-6">
              <img
                :src="teacher.teacher_photo"
                :alt="teacher.name"
                class="mx-auto w-100 mb-3 d-block d-xl-none"
              />
              <h2 class="fs-3 text-primary">
                <span class="underline"
                  >{{ teacher.name }} | {{ teacher.title }}</span
                >
              </h2>
              <p>
                <span
                  class="badge text-bg-warning text-light"
                  v-for="i in teacher.tags"
                  >{{ i }}</span
                >
              </p>
              <p class="content">
                {{ teacher.introduction }}
              </p>
            </div>
            <div class="col-12 col-md-4 col-xl-2">
              <div class="dollar">
                <p class="fs-2 fw-bolder w-100 text-primary">
                  {{ new Intl.NumberFormat().format(teacher.price) }}點 <br />
                  <span class="w-100 fs-6 text-center d-block"
                    >/{{ teacher.price_minutes }}分鐘</span
                  >
                </p>
              </div>
              <a class="btn btn-primary text-light w-100 mt-3" href="#schedule">
                <font-awesome-icon
                  icon="fas fa-calendar-day"
                ></font-awesome-icon>
                立即預約
              </a>
              <button
                class="btn btn-warning w-100 my-2 text-light d-block d-xl-none"
              >
                <font-awesome-icon icon="far fa-heart"></font-awesome-icon> 收藏
              </button>
            </div>
          </div>
          <hr class="w-75 mx-auto" />
          <TeacherScheduleComponent
            :teacher-id="teacher.teacher_id"
            :teacher-name="teacher.name"
          ></TeacherScheduleComponent>
        </div>
      </div>
    </section>
  </div>
</template>
