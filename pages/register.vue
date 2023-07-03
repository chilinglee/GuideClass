<script setup>
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const register = async () => {
  const { data } = await useFetch('/api/auth/register', {
    method: 'post',
    body: {
      name,
      email,
      password,
      confirmPassword,
    },
  });
};
</script>
<template>
  <div>
    <section class="login-register header-space container-fluid">
      <div class="container p-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="member-form p-4 p-lg-5">
              <h3 class="text-primary text-center my-3">
                <span class="underline">會員註冊</span>
              </h3>
              <form>
                <div class="mb-3">
                  <label for="" class="form-label">帳號名稱</label>
                  <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">電子郵箱</label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">確認密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirmPassword"
                  />
                </div>
                <div class="w-100 text-center">
                  <button
                    type="button"
                    class="btn btn-warning text-light"
                    @click="register"
                  >
                    註冊
                  </button>
                  <p class="mt-2 mb-0">
                    <a href="/login">登入</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
