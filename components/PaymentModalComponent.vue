<script setup>
const { $swal } = useNuxtApp();
const router = useRouter();
const props = defineProps(['planPoint', 'planPrice']);
const emit = defineEmits(['hideModal']);
const paymentModal = ref(null);
const count = ref(1);

//userStore
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user.store.js';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const resetCount = () => {
  count.value = 1;
};

const buy = async () => {
  if (!user.value.isLogin) {
    $swal
      .fire({
        title: '請先登入',
        text: '即將導向登入頁',
        icon: 'error',
        comfirmButtonText: '確認',
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          router.replace('/login');
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          router.replace('/login');
        }
      });
  }
  await useFetch('/api/auth/checkAuth', {
    method: 'get',
  }).then(async (response) => {
    const data = response.data.value;
    if (!data || !data.isLogin) {
    }
  });

  await useFetch('/api/order', {
    method: 'post',
    body: {
      plan: `${props.planPoint}-${props.planPrice}`,
      count: count.value,
      totalPrice: props.planPrice * count.value,
      totalPoint: props.planPoint * count.value,
    },
  }).then((response) => {
    emit('hideModal');
    resetCount();
    const data = response.data.value;
    const error = response.error.value;
    if (error) {
      $swal
        .fire({
          title: error.data.message,
          icon: 'error',
          confirmButtonText: '確認',
        })
        .then((res) => {
          location.reload();
        });
    } else {
      $swal
        .fire({
          title: '訂購成功',
          text: `${data.total_point} 點 / ${data.total_point} 元 `,
          icon: 'success',
          confirmButtonText: '確認',
        })
        .then((res) => {
          location.reload();
        });
    }
  });
};
</script>
<template>
  <div>
    <div
      class="modal fade payment-modal"
      id="paymentModal"
      tabindex="-1"
      ref="paymentModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="paymentModalLabel">購買資訊</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-center">
              方案：{{ planPoint }} 點 / {{ planPrice }} 元
            </p>
            <div class="row mb-3 justify-content-center">
              <label for="count" class="col-sm-2 col-form-label">組數：</label>
              <div class="col-sm-3">
                <input
                  type="number"
                  class="form-control"
                  id="count"
                  min="1"
                  v-model.number="count"
                />
              </div>
            </div>
            <p class="fw-bold text-center">
              總計：{{ `${count * planPoint} 點 / ${count * planPrice} 元` }}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="buy">
              購買
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetCount"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
