import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)
  const user = ref({})

  function login() {
    isLoggedin.value = true
  }

  function logout() {
    localStorage.removeItem('pkace')
    localStorage.removeItem('access_token')
    isLoggedin.value = false
  }

  function setUser(jwt) {
    user.value = {
      name: jwt.sub,
      roles: jwt.roles
    }
  }

  return { isLoggedin,user, login, logout, setUser }
})
