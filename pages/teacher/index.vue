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
                  >
                    <option selected>語言</option>
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
                  >
                    <option selected>排序</option>
                    <option value="sort-hot">人氣度</option>
                    <option value="sort-new">新加入</option>
                    <option value="sort-senior">資深</option>
                    <option value="sort-price-low">價格低</option>
                    <option value="sort-price-hight">價格高</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="teacher-info">
              <div class="row p-5">
                <div
                  class="col-md-3 col-12 d-flex flex-column justify-content-center align-items-center mb-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Tammy"
                    class="mx-aut"
                  />
                  <p
                    class="fs-4 mb-3 price text-secondary fw-bolder text-center"
                  >
                    1000 點 <span class="fs-6">/ 50min</span>
                  </p>
                  <button class="btn btn-warning text-light mb-3 w-100">
                    <font-awesome-icon
                      icon="fas fa-calendar-day"
                    ></font-awesome-icon>
                    立即預約
                  </button>
                  <button class="btn btn-secondary text-light w-100">
                    <font-awesome-icon
                      icon="fas fa-clipboard-user"
                    ></font-awesome-icon>
                    瞭解老師
                  </button>
                </div>
                <div
                  class="col-md-9 col-12 d-flex flex-column justify-content-evenly"
                >
                  <p class="teacher-title mb-0 fs-3 fw-bolder text-primary">
                    Tammy | 職場英文讓您無往不利
                  </p>
                  <p class="text-secondary text-decoration-underline fs-6">
                    <span>口説</span> | <span>商業英語</span>
                  </p>
                  <p class="fs-6 d-none d-md-block">
                    我是一名英文家教，曾在加拿大溫哥華大學留學，主修外語教學。在我的教學中，我主要教授多益英文，幫助學生聼懂不同口音的英語，復習多益常考單詞，增加閲讀測驗能力，以期在多益考試中獲得高分。我的教學方法靈活多變，可以適應不同學生的需要，幫助他們在學習英文的過程中有效地提升能力。我相信，透過不斷的努力和決心，每一位學生都能在英文學習上取得成功.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
