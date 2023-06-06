<template>
  <div>
    <div class="container-fluid header-space membership">
      <div class="container">
        <div class="row pt-5 justify-content-center">
          <MemberTabComponent></MemberTabComponent>
          <section class="main col-lg-9 col-12 mt-5">
            <div class="row px-5">
              <h2 class="text-center">
                <span class="underline">會籍資料修改</span>
              </h2>
              <div class="membership-form">
                <form>
                  <div class="mb-3">
                    <label for="" class="form-label">帳號名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      aria-describedby=""
                    />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">電子郵箱</label>
                    <input
                      type="email"
                      class="form-control"
                      id=""
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">修改密碼</label>
                    <input type="password" class="form-control" id="" />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">確認密碼</label>
                    <input type="password" class="form-control" id="" />
                  </div>
                  <div class="w-100 text-center">
                    <button type="submit" class="btn btn-success text-light">
                      更新資料
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
