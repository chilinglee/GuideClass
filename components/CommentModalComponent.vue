<script setup>
const { $swal } = useNuxtApp();
const commentModal = ref(null);
const props = defineProps(['reservationId']);
const rate = ref(0);
const comment = ref('');
const emit = defineEmits(['hideModal']);

const reset = () => {
  rate.value = 0;
  comment.value = '';
};

const sendComment = async () => {
  const toast = $swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  await useFetch('/api/comment', {
    method: 'post',
    body: {
      reservation_id: props.reservationId,
      rate: Number(rate.value),
      comment: comment.value,
    },
  }).then((res) => {
    emit('hideModal');
    reset();

    const data = res.data.value;
    const error = res.error.value;
    if (error) {
      toast.fire({
        icon: 'error',
        title: error.message,
      });
    } else {
      toast.fire({
        icon: 'success',
        title: '評價成功',
      });
    }
  });
};
</script>
<template>
  <div>
    <div
      class="modal fade commentModal"
      id="commentModal"
      tabindex="-1"
      ref="commentModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">評價課程</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="reset"
            ></button>
          </div>
          <div class="modal-body">
            <div class="rate pb-2">
              <input
                type="radio"
                id="start5"
                class="d-none"
                value="5"
                name="rate"
                v-model.number="rate"
              /><label for="start5" class="star"
                ><font-awesome-icon icon="fas fa-star"></font-awesome-icon
              ></label>
              <input
                type="radio"
                id="start4"
                class="d-none"
                value="4"
                name="rate"
                v-model.number="rate"
              /><label for="start4" class="star"
                ><font-awesome-icon icon="fas fa-star"></font-awesome-icon
              ></label>
              <input
                type="radio"
                id="start3"
                class="d-none"
                value="3"
                name="rate"
                v-model.number="rate"
              /><label for="start3" class="star"
                ><font-awesome-icon icon="fas fa-star"></font-awesome-icon
              ></label>
              <input
                type="radio"
                id="start2"
                class="d-none"
                value="2"
                name="rate"
                v-model.number="rate"
              /><label for="start2" class="star"
                ><font-awesome-icon icon="fas fa-star"></font-awesome-icon
              ></label>
              <input
                type="radio"
                id="start1"
                class="d-none"
                value="1"
                name="rate"
                v-model.number="rate"
              /><label for="start1" class="star"
                ><font-awesome-icon icon="fas fa-star"></font-awesome-icon
              ></label>
            </div>
            <div class="rate-comment">
              <textarea
                class="form-control"
                id="comment"
                rows="5"
                v-model="comment"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-warning text-white"
              @click="sendComment"
            >
              送出評價
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="reset"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
