<script setup>
const router = useRouter();
const { $swal } = useNuxtApp();
const email = ref('');
const password = ref('');
const login = async () => {
  const { data } = await useFetch('/api/auth/login', {
    method: 'post',
    body: {
      email,
      password,
    },
  }).then((response) => {
    const data = response.data.value;
    const error = response.error.value;
    if (error) {
      $swal.fire({
        title: error.data.message,
        text: '',
        icon: 'error',
        confirmButtonText: '確認',
      });
    } else {
      $swal
        .fire({
          title: '登入成功',
          text: '',
          icon: 'success',
          confirmButtonText: '確認',
        })
        .then((result) => {
          if (result.isConfirmed) {
            location.href = '/';
          }
        });
    }
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
                <span class="underline">會員登入</span>
              </h3>
              <form>
                <div class="mb-3">
                  <label for="" class="form-label">電子郵箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id=""
                    v-model="email"
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id=""
                    v-model="password"
                  />
                </div>
                <div class="w-100 text-center">
                  <button
                    type="button"
                    class="btn btn-warning text-light"
                    @click="login"
                  >
                    登入
                  </button>
                  <p class="mt-2 mb-0">
                    <a href="/register">註冊</a>
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
