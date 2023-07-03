<script>
import moment from 'moment';
export default {
  data() {
    return {
      initialDateOfWeek: '',
      weekdates: [],
    };
  },
  methods: {
    thisWeek() {
      this.initialDateOfWeek = moment().day(0); //this sunday
      this.setWeekDates();
    },
    lastWeek() {
      this.initialDateOfWeek = moment(this.initialDateOfWeek).subtract(
        7,
        'days'
      );
      this.setWeekDates();
    },
    nextWeek() {
      this.initialDateOfWeek = moment(this.initialDateOfWeek).add(7, 'days');
      this.setWeekDates();
    },
    setWeekDates() {
      this.weekdates = [];
      for (let i = 0; i < 7; i++) {
        this.weekdates.push(
          moment(this.initialDateOfWeek).day(i).format('MM/DD')
        );
      }
    },
  },
  mounted() {
    this.thisWeek();
  },
};
</script>
<template>
  <div>
    <section class="teacher-detail header-space container-fluid">
      <div class="container p-5">
        <div class="information p-5">
          <div class="row mb-5">
            <div class="col-12 col-xl-4 d-none d-xl-block">
              <img
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Tammy"
                class="mx-auto w-100 mb-3"
              />
              <button class="btn btn-warning w-100 text-light">
                <font-awesome-icon icon="far fa-heart"></font-awesome-icon> 收藏
              </button>
            </div>
            <div class="col-12 col-md-8 col-xl-6">
              <img
                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Tammy"
                class="mx-auto w-100 mb-3 d-block d-xl-none"
              />
              <h2 class="fs-3 text-primary">
                <span class="underline">Tammy | 職場英文讓您無往不利</span>
              </h2>
              <p>
                <span class="badge text-bg-warning text-light">商業英文</span>
                <span class="badge text-bg-warning text-light">口説</span>
              </p>
              <p class="content">
                英文是當今世界上最重要的語言之一，尤其是在職場上。無論是在國際公司中工作，還是在海外出差，英文都是必須掌握的溝通工具。但是，對於許多人來說，學習英文並不是一件容易的事。除了要掌握基礎的英文知識外，還需要在實際應用中磨練口語能力。
                這就是我們進行英文家教的原因：幫助學生提升職場英文技能，並進行口說訓練。我們是一群專業的英文老師，擁有豐富的教學經驗。我們深知，在職場上使用英文的能力不僅僅是掌握單詞和文法的問題，還需要在實際應用中磨練口語能力。因此，我們的課程不僅僅是傳授基礎知識，還會教授學生如何在商務環境中使用英文，以及實用的英文口語技巧。
                我們的課程是非常實用的，旨在幫助學生在職場上更加流利地使用英文。我們會根據學生的學習需求和水平，設計適合的課程。無論是基礎英文知識還是職場英文技巧，我們都有專業的教學。
              </p>
            </div>
            <div class="col-12 col-md-4 col-xl-2">
              <div class="dollar">
                <p class="fs-2 fw-bolder w-100 text-primary">
                  1000點 <br />
                  <span class="w-100 fs-6 text-center d-block">/50分鐘</span>
                </p>
              </div>
              <button class="btn btn-primary text-light w-100 mt-3">
                <font-awesome-icon
                  icon="fas fa-calendar-day"
                ></font-awesome-icon>
                立即預約
              </button>
              <button
                class="btn btn-warning w-100 my-2 text-light d-block d-xl-none"
              >
                <font-awesome-icon icon="far fa-heart"></font-awesome-icon> 收藏
              </button>
            </div>
          </div>
          <hr class="w-75 mx-auto" />
          <div class="row schedule mt-5 justify-content-center">
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
      </div>
    </section>
  </div>
</template>
