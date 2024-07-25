<script setup lang="ts">
import Footer from '~/components/footer.vue'
</script>

<template>
  <div class="container">
    <div class="content">
      <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_1aae9eb771af4fc5995b48e2c2caec6a/default/dark/2.0" alt="404" />
      <p>il n'y a rien à voir ici petit margoulin</p>
    </div>
    <Footer />
  </div>
</template>

<style>
  @import '../../css/app.css';

  .container {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100vh;
    width: 100vw;
    grid-template-areas:
    'content'
    'footer';

  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    grid-area: content;
  }

  h1 {
    margin: 1rem;
    font-size: 2rem;
  }
</style>
