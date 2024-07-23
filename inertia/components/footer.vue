<script setup lang="ts">
import { styled } from '@vvibe/vue-styled-components'

const Footer = styled.p`
  text-align: center;

  grid-area: footer;

  img {
    width: 18px;
    height: 18px;
    margin: 0 0.25rem;
    vertical-align: middle;
  }
`
</script>

<template>
  <Footer
    >Fait avec
    <img
      src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_83f6dbec91334a44bc65578f3cc79c94/default/dark/1.0"
    />
    par <a target="_blank" href="https://github.com/volchan">Volchan</a></Footer
  >
</template>
