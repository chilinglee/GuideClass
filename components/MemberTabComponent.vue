<script setup>
const routeName = useRoute().name;
const isMembership = routeName === 'member-membership';
const isMypoint = routeName === 'member-mypoint';
const isMyschedule = routeName === 'member-myschedule';

import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user.store.js';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

if (!user.value?.isLogin) {
  await navigateTo('/login');
}
</script>
<template>
  <div class="tab col-lg-9 col-12">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          href="/member/membership"
          :class="{ active: isMembership }"
          >會籍資料</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/member/mypoint"
          :class="{ active: isMypoint }"
          >點數查詢</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="/member/myschedule"
          :class="{ active: isMyschedule }"
          >我的課表</a
        >
      </li>
    </ul>
  </div>
</template>
