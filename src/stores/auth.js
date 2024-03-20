import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)
  
  function login() {
    isLoggedin.value = true
  }

  function logout() {
    localStorage.removeItem('pkace')
    localStorage.removeItem('access_token')
    isLoggedin.value = false
  }

  return { isLoggedin, login, logout }
})
