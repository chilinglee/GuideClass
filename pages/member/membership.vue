<script setup>
const { $swal } = useNuxtApp();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const getUser = async () => {
  await useFetch('/api/users/membership', {
    method: 'get',
  }).then((response) => {
    const data = response.data.value;
    name.value = data.name;
    email.value = data.email;
  });
};

const updateMemberInfo = async () => {
  await useFetch(`/api/users/membership`, {
    method: 'put',
    body: {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    },
  }).then((res) => {
    const data = res.data.value;
    const error = res.error.value;
    console.log(res);
    if (error) {
      $swal.fire({
        title: '更新失敗，請稍後再試',
        text: error,
        confirmButtonText: '確認',
      });
    } else {
      getUser();
      $swal
        .mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        .fire({
          icon: 'success',
          title: '更新成功',
        });
    }
  });
};

getUser();
</script>
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
                      :value="name"
                      id="name"
                      @input="(event) => (name = event.target.value)"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">電子郵箱</label>
                    <input
                      type="email"
                      class="form-control"
                      :value="email"
                      id="email"
                      @input="(event) => (email = event.target.value)"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">修改密碼</label>
                    <input
                      type="password"
                      class="form-control"
                      :value="password"
                      id="password"
                      @input="(event) => (password = event.target.value)"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">確認密碼</label>
                    <input
                      type="password"
                      class="form-control"
                      :value="confirmPassword"
                      id="confirmPassword"
                      @input="(event) => (confirmPassword = event.target.value)"
                    />
                  </div>
                  <div class="w-100 text-center">
                    <button
                      type="button"
                      class="btn btn-success text-light"
                      @click="updateMemberInfo()"
                    >
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
