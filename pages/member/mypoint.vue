<script setup>
import moment from 'moment';
const { $swal } = useNuxtApp();
const router = useRouter();
const histories = ref([]);
const user = ref({});

onMounted(async () => {
  await useFetch('/api/auth/checkAuth', {
    method: 'get',
  }).then(async (response) => {
    const data = response.data.value;
    const error = response.error.value;
    user.value = data;

    if (!user.isLogin) {
      await navigateTo('/login');
    }
  });

  await useFetch('/api/order/histories', {
    method: 'get',
  }).then((response) => {
    const data = response.data.value;
    const error = response.error.value;

    histories.value = data;
  });
});
</script>
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
                  {{ new Intl.NumberFormat().format(user.point) }}點
                </p>
                <p class="text-center">
                  <a class="btn btn-buy" href="/priceplan">立即購買點數</a>
                </p>
              </div>
              <div>
                <div class="table-responsive">
                  <table class="table mypoint-table">
                    <thead>
                      <tr>
                        <th>日期</th>
                        <th>項目</th>
                        <th>點數數量</th>
                        <th>剩餘點數</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in histories" :key="item.created_on">
                        <td>
                          {{
                            moment(
                              new Date(item.created_on).toISOString()
                            ).format('yyyy/MM/DD HH:mm')
                          }}
                        </td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.point }}</td>
                        <td>{{ item.subtotal }}</td>
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
