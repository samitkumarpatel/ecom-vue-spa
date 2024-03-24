<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useRouter } from 'vue-router'
    
    import { useAuthStore } from '@/stores/auth';
    import { storeToRefs } from 'pinia'
    const auth = useAuthStore()
    const { isLoggedin } = storeToRefs(auth)
    const { login, logout, setUser } = auth

    const router = useRouter()
    
     
    const e = ref('')
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    if(code){
        const pkace = JSON.parse(localStorage.getItem("pkace"));

        const formData = new URLSearchParams();
        formData.append('client_id', 'spa-client');
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('code_challenge', pkace['codeChallenge']);
        formData.append('code_verifier', pkace['codeVerifier']);
        formData.append('code_challenge_method', 'S256');
        formData.append('redirect_uri', 'http://localhost:5173/callback');

        fetch('http://localhost:8080/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to obtain access token');
            }
            return response.json();
        })
        .then(data => {
            const access_token = data.access_token
            localStorage.setItem('access_token', access_token);
            const jwt = parseJwt(access_token)
            login()
            setUser(jwt)
            router.push({ path: '/about'})
        })
        .catch(error => {
            e.value = error.message;
            console.error('Failed to obtain access token:', error);
        });
    }
</script>
<template>
    <p v-if="!e">Please Wait! we are logging you in ...</p>
    <p v-else>{{ e }}</p>
</template>