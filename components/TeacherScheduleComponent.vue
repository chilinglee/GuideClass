<script setup>
import moment from 'moment';
const { $swal } = useNuxtApp();
const router = useRouter();
const initialDateOfWeek = ref('');
const weekdates = ref([]);
const teacherSchedule = ref([]);
const props = defineProps(['teacherId', 'teacherName']);

const thisWeek = () => {
  initialDateOfWeek.value = moment()
    .day(0)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })._d; //this sunday
};

const lastWeek = () => {
  initialDateOfWeek.value = moment(initialDateOfWeek.value).subtract(
    7,
    'days'
  )._d;
};

const nextWeek = () => {
  initialDateOfWeek.value = moment(initialDateOfWeek.value).add(7, 'days')._d;
};

watch(initialDateOfWeek, async (_new) => {
  weekdates.value = [];
  for (let i = 0; i < 7; i++) {
    weekdates.value.push(moment(_new).day(i).format('MM/DD'));
  }

  await useFetch(
    `/api/teacherSchedules/${
      props.teacherId
    }?initDate=${_new}&lastDate=${moment(_new).add(7, 'd')}`,
    {
      method: 'get',
    }
  ).then((response) => {
    teacherSchedule.value = response.data.value;
  });
});

const reserve = async (reserve_time) => {
  $swal
    .fire({
      title: '確認預約課程',
      html: `<p>教師：${props.teacherName}</p>
    <p>時間：${moment(new Date(reserve_time).toISOString()).format(
      'YYYY/MM/DD HH:mm'
    )}</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        checkAndReserve(reserve_time);
      }
    });
};

const checkAndReserve = async (reserve_time) => {
  const { data } = await useFetch(`/api/auth/checkAuth`, {
    method: 'get',
  });

  if (data.value.isLogin) {
    await useFetch(`/api/teacherSchedules/reserve`, {
      method: 'post',
      body: {
        teacher_id: props.teacherId,
        reserve_time,
      },
    }).then((response) => {
      const data = response.data.value;
      const error = response.error.value;
      if (error) {
        $swal.fire({
          title: '預約失敗',
          text: error.data.message,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: '確認',
        });
      } else if (data) {
        $swal.fire({
          title: '預約成功',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: '確認',
          didClose() {
            location.reload();
          },
        });
      }
    });
  } else {
    $swal
      .fire({
        title: '尚未登入',
        text: '即將導向登入頁',
        icon: 'warning',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: '登入頁',
        didClose: () => {
          router.replace('/login');
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.replace('/login');
        }
      });
  }
};

thisWeek();
</script>
<template>
  <div>
    <div class="row schedule mt-5 justify-content-center" id="schedule">
      <h3 class="text-center">
        <span class="underline text-primary">上課時間</span>
      </h3>
      <div class="table-responsive">
        <table class="mt-4 col-12 col-lg-8 table">
          <thead>
            <tr>
              <td colspan="7" class="text-end">
                <button
                  type="button"
                  class="btn schedule-btn"
                  @click="thisWeek"
                >
                  本周
                </button>
                <button
                  type="button"
                  class="btn schedule-btn"
                  @click="lastWeek"
                >
                  <font-awesome-icon
                    icon="fas fa-chevron-left"
                  ></font-awesome-icon>
                  上一周
                </button>
                <button
                  type="button"
                  class="btn schedule-btn"
                  @click="nextWeek"
                >
                  下一周
                  <font-awesome-icon
                    icon="fas fa-chevron-right"
                  ></font-awesome-icon>
                </button>
              </td>
            </tr>
            <tr>
              <th class="day col-1">
                <p>Sun.</p>
                <p>{{ weekdates[0] }}</p>
              </th>
              <th class="day col-1">
                <p>Mon.</p>
                <p>{{ weekdates[1] }}</p>
              </th>
              <th class="day col-1">
                <p>Tue.</p>
                <p>{{ weekdates[2] }}</p>
              </th>
              <th class="day col-1">
                <p>Wed.</p>
                <p>{{ weekdates[3] }}</p>
              </th>
              <th class="day col-1">
                <p>Thur.</p>
                <p>{{ weekdates[4] }}</p>
              </th>
              <th class="day col-1">
                <p>Fri.</p>
                <p>{{ weekdates[5] }}</p>
              </th>
              <th class="day col-1">
                <p>Sat.</p>
                <p>{{ weekdates[6] }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="sun">
                <div
                  v-for="item in teacherSchedule[weekdates[0]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="mon">
                <div
                  v-for="item in teacherSchedule[weekdates[1]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="tue">
                <div
                  v-for="item in teacherSchedule[weekdates[2]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="wed">
                <div
                  v-for="item in teacherSchedule[weekdates[3]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="thur">
                <div
                  v-for="item in teacherSchedule[weekdates[4]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="fri">
                <div
                  v-for="item in teacherSchedule[weekdates[5]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
              <td id="sat">
                <div
                  v-for="item in teacherSchedule[weekdates[6]]"
                  :key="item"
                  @click="reserve(item)"
                >
                  {{ moment(new Date(item).toISOString()).format('HH:mm') }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
