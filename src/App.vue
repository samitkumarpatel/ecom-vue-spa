<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia'
  const auth = useAuthStore()
  const { isLoggedin } = storeToRefs(auth)
  const { login, logout } = auth

  const access_token = localStorage.getItem('access_token')
  if(access_token) {
    login()
  }
</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">| About</RouterLink>
        <RouterLink to="/logout" v-if="isLoggedin">| Logout</RouterLink>
      </nav>
    </div>
  </header>
  <hr/>
  <RouterView />
</template>

<style scoped>
 header {
  margin-bottom: 20px;
 }

</style>
