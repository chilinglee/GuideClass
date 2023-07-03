<script setup>
import moment from 'moment';
const initialDateOfWeek = ref('');
const weekdates = ref([]);

const thisWeek = () => {
  initialDateOfWeek.value = moment().day(0)._d; //this sunday
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

watch(initialDateOfWeek, (_new) => {
  weekdates.value = [];
  for (let i = 0; i < 7; i++) {
    weekdates.value.push(moment(_new).day(i).format('MM/DD'));
  }
});

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
                <div>09:00</div>
                <div>10:00</div>
                <div>11:00</div>
                <div>12:00</div>
                <div>13:00</div>
                <div>14:00</div>
                <div>15:00</div>
                <div>16:00</div>
              </td>
              <td id="mon">
                <div>07:00</div>
                <div>08:00</div>
                <div>19:00</div>
                <div>20:00</div>
                <div>21:00</div>
                <div>22:00</div>
              </td>
              <td id="tue">
                <div>07:00</div>
                <div>08:00</div>
                <div>19:00</div>
                <div>20:00</div>
                <div>21:00</div>
                <div>22:00</div>
              </td>
              <td id="wed">
                <div>07:00</div>
                <div>08:00</div>
                <div>19:00</div>
                <div>20:00</div>
                <div>21:00</div>
                <div>22:00</div>
              </td>
              <td id="thur">
                <div>07:00</div>
                <div>08:00</div>
                <div>19:00</div>
                <div>20:00</div>
                <div>21:00</div>
                <div>22:00</div>
              </td>
              <td id="fri">
                <div>07:00</div>
                <div>08:00</div>
                <div>19:00</div>
                <div>20:00</div>
                <div>21:00</div>
                <div>22:00</div>
              </td>
              <td id="sat">
                <div>09:00</div>
                <div>10:00</div>
                <div>11:00</div>
                <div>12:00</div>
                <div>13:00</div>
                <div>14:00</div>
                <div>15:00</div>
                <div>16:00</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
