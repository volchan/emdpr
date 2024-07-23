<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components'

import Title from '~/components/title.vue'
import Footer from '~/components/footer.vue'

const Container = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content;
  gap: 10px 0px;
  grid-template-areas:
    'title'
    'content'
    'footer';
`
</script>

<template>
  <Container>
    <Title />
    <slot />
    <Footer />
  </Container>
</template>
