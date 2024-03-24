<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia'
  const auth = useAuthStore()
  const { isLoggedin, user } = storeToRefs(auth)

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<style scoped>

</style>
