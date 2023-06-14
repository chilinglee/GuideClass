<template>
  <div>
    <div class="container-fluid header-space mypoint">
      <div class="container">
        <div class="row pt-5 justify-content-center">
          <MemberTabComponent></MemberTabComponent>
          <section class="main col-lg-9 col-12 mt-5">
            <div class="row px-5">
              <h2 class="text-center">
                <span class="underline">點數查詢</span>
              </h2>
              <div class="remians p-5">
                <p class="icon-point">
                  <font-awesome-icon
                    icon="fas fa-sack-dollar"
                  ></font-awesome-icon>
                </p>
                <p class="wording-point">
                  剩餘 <br />
                  26,000點
                </p>
              </div>
              <div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>日期</th>
                        <th>項目</th>
                        <th>點數數量</th>
                        <th>剩餘點數</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2022/12/28</td>
                        <td>購課</td>
                        <td>-1,000</td>
                        <td>26,000</td>
                      </tr>
                      <tr>
                        <td>2022/12/24</td>
                        <td>購課</td>
                        <td>-1,500</td>
                        <td>27,000</td>
                      </tr>
                      <tr>
                        <td>2022/12/21</td>
                        <td>購課</td>
                        <td>-1,500</td>
                        <td>28,500</td>
                      </tr>
                      <tr>
                        <td>2022/12/21</td>
                        <td>購買點數</td>
                        <td>30,000</td>
                        <td>30,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
