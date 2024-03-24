<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  const message = ref('Login')

  function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }

  function generateCodeVerifier() {
      var array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec2hex).join("");
  }

  //Generate code challenge from code verifier
  function sha256(plain) {
      // returns promise ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
  }

  function base64urlencode(a) {
      var str = "";
      var bytes = new Uint8Array(a);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          str += String.fromCharCode(bytes[i]);
      }
      return btoa(str)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
  }

  async function generateCodeChallengeFromVerifier(v) {
      var hashed = await sha256(v);
      var base64encoded = base64urlencode(hashed);
      return base64encoded;
  }

  const oauthLogin = () => {
    const codeVerifier = generateCodeVerifier();

    generateCodeChallengeFromVerifier(codeVerifier)
        .then(codeChallenge => {
            console.log(codeVerifier, codeChallenge);
            localStorage.setItem('pkace', JSON.stringify({codeVerifier, codeChallenge}))
            window.location.href = `http://localhost:8080/oauth2/authorize?response_type=code&client_id=spa-client&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256&code_verifier=${codeVerifier}&redirect_uri=http://localhost:5173/callback`;
        })
  }
</script>

<template>
  <main>
    <p>{{ message }}</p>
    
    <button @click="oauthLogin">Login with Oauth2</button>
  </main>
</template>
