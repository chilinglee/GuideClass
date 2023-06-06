<template>
  <div>
    <div class="container-fluid header-space myschedule">
      <div class="container">
        <div class="row pt-5 justify-content-center">
          <MemberTabComponent></MemberTabComponent>
          <section class="main col-lg-9 col-12 mt-5">
            <div class="row px-5">
              <h2 class="text-center">
                <span class="underline">我的課表</span>
              </h2>
              <div
                class="w-100 d-flex justify-content-center"
                style="padding: 50%; background-color: lightgray"
              >
                <p class="position">串接 Full Calendar</p>
              </div>
              <div>
                <table></table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
