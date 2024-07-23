<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { styled } from '@vvibe/vue-styled-components'

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  grid-area: content;

  padding: 2rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  background-color: #18181b;

  border-radius: 0.5rem;
  border: 0.3rem solid #000;
  border-top: 0;

  h3 {
    background-color: black;
    padding: 0.5rem 1rem;
    text-align: center;
    position: relative;

    span {
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;

      display: flex;
      align-items: center;

      a {
        font-size: 0.9rem;
        &::before {
          content: '◄ ';
        }
      }
    }
  }
`

defineProps<{
  title: string,
  withReturnLink?: boolean
}>()
</script>

<template>
  <GridContainer>
    <Content>
      <h3><span><Link v-if="withReturnLink" href="/">Retour</Link></span>{{ title }}</h3>
      <slot />
    </Content>
  </GridContainer>
</template>
