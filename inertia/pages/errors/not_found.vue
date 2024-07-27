<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components';
import ContentContainer from '~/components/content_container.vue'
import MainContainer from '~/components/main_container.vue'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  p {
    text-align: center;
  }
`
</script>

<template>
  <MainContainer>
    <ContentContainer title="Woops" with-return-link>
      <Container>
        <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_1aae9eb771af4fc5995b48e2c2caec6a/default/dark/2.0" height="56" width="56" alt="404" />
        <p>il n'y a rien à voir ici petit margoulin</p>
      </Container>
    </ContentContainer>
  </MainContainer>
</template>
