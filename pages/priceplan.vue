<script setup>
const { $bootstrap } = useNuxtApp();
const planPoint = ref(0);
const planPrice = ref(0);
let modal = '';

const showModal = (point, price) => {
  planPoint.value = point;
  planPrice.value = price;
  modal.show();
};

const hideModal = () => {
  modal.hide();
};

onMounted(() => {
  modal = new $bootstrap.Modal(paymentModal, {
    backdrop: 'static',
  });
});
</script>
<template>
  <div>
    <section class="priceplan header-space container-fluid">
      <div class="container">
        <h3 class="text-primary fw-bolder fs-1 text-center py-5">點數方案</h3>
        <div class="row">
          <div class="col-12 col-lg-4 package-max p-5 order-lg-1">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-primary">
                  <span class="underline">激省方案</span>
                </h4>
                <h6 class="card-subtitle mb-2 text-danger">買!到!賺!到!</h6>
                <hr />
                <p class="card-text py-5">
                  <span class="point fs-1 text-primary">20,000 點 </span>
                  <br />
                  <span class="price fs-1 text-danger">/ 16,000 元</span>
                </p>
              </div>
              <div class="card-footer text-muted d-flex justify-content-center">
                <button
                  class="btn btn-warning text-light"
                  type="button"
                  @click="showModal(20000, 16000)"
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-lg-4 package-normal p-5 align-self-lg-end order-lg-2"
          >
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">超值方案</h4>
                <h6 class="card-subtitle mb-2 text-muted">9折</h6>
                <hr />
                <p class="card-text py-3">
                  <span class="point fs-1 text-primary">3,000 點 </span>
                  <span class="price fs-3">/ 2,700 元</span>
                </p>
              </div>
              <div class="card-footer text-muted d-flex justify-content-center">
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click="showModal(3000, 2700)"
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-lg-4 package-none p-5 align-self-lg-end order-lg-0"
          >
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">一般方案</h4>
                <h6 class="card-subtitle mb-2 text-muted">買多少算多少</h6>
                <hr />
                <p class="card-text py-3">
                  <span class="point fs-1">1 點 </span>
                  <span class="price fs-3">/ 1 元</span>
                </p>
              </div>
              <div class="card-footer text-muted d-flex justify-content-center">
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click="showModal(1, 1)"
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <PaymentModalComponent
    :plan-point="planPoint"
    :plan-price="planPrice"
    @hide-modal="hideModal"
  ></PaymentModalComponent>
</template>
