<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  grid-area: title;
`

const MainTitle = styled.h1`
  font-size: 4rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-style: normal;

  @media (max-width: 500px) {
    font-size: 2.5rem;
  }
`

const SubTitle = styled.h2`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-style: normal;

  @media (max-width: 500px) {
    font-size: 1.75rem;
  }
`
</script>

<template>
  <Container>
    <MainTitle class="title">EncreMecanique</MainTitle>
    <SubTitle class="subtitle">Double Pipe Reader</SubTitle>
  </Container>
</template>
