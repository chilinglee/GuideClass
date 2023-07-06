<script setup>
import moment from 'moment';
const { $bootstrap } = useNuxtApp();
const reservations = ref([]);
let modal = '';
const reservationId = ref('');

await useFetch('/api/users/userSchedule', {
  method: 'get',
}).then((response) => {
  const data = response.data.value;
  const error = response.error.value;
  if (error) {
  } else {
    reservations.value = data;
  }
});

const showModal = (id) => {
  reservationId.value = id;
  modal.show();
};

const hideModal = () => {
  modal.hide();
};

onMounted(() => {
  modal = new $bootstrap.Modal(commentModal, {
    backdrop: 'static',
  });
});
</script>
<template>
  <div class="myschedule">
    <div class="container-fluid header-space">
      <div class="container">
        <div class="row pt-5 justify-content-center">
          <MemberTabComponent></MemberTabComponent>
          <section class="main col-lg-10 col-12 mt-5">
            <div class="row px-5">
              <h2 class="text-center">
                <span class="underline">我的課表</span>
              </h2>
              <div class="table-responsive">
                <table class="table myschedule-table">
                  <thead>
                    <tr class="text-center">
                      <th class="col-1">上課日期</th>
                      <th class="col-1">上課時間</th>
                      <th class="col-3">授課講師</th>
                      <th class="col-1">狀態</th>
                      <th class="col-1">購課點數</th>
                      <th class="col-2">購課時間</th>
                      <th class="col-1">評價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in reservations"
                      :key="item.reservation_id"
                      class="text-center"
                    >
                      <td>{{ item.reservation_date }}</td>
                      <td>
                        {{
                          moment(new Date(item.full_reservation_time)).format(
                            'HH:mm'
                          )
                        }}
                      </td>
                      <td>
                        {{ `${item.teacher_name} | ${item.teacher_title}` }}
                      </td>
                      <td>{{ item.status }}</td>
                      <td>{{ item.class_fee }}</td>
                      <td>
                        {{
                          moment(new Date(item.created_on)).format(
                            'YYYY/MM/DD HH:mm'
                          )
                        }}
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning"
                          @click="showModal(item.reservation_id)"
                          v-if="
                            item.is_commented == '0' && item.status == '已完成'
                          "
                        >
                          評價
                        </button>
                        <p
                          class="mb-0 text-primary"
                          v-else-if="
                            item.is_commented == '1' && item.status == '已完成'
                          "
                        >
                          已評價
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <CommentModalComponent
      :reservation-id="reservationId"
      @hide-modal="hideModal"
    ></CommentModalComponent>
  </div>
</template>
