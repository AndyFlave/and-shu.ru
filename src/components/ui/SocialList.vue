<template>
  <ul class="social-list">
    <li class="social-list__item" v-for="net in nets" :key="net.src">
      <a
        :href="net.link"
        :target="net.target"
        :rel="net.rel"
        class="social-list__link"
      >
        <img
          class="social-list__icon"
          :src="net.icon"
          :alt="net.alt"
          width="52"
          height="52"
        />
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'SocialList',

    props: {
      nets: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
  }
</script>

<style scoped>
  .social-list {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .social-list:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0px;
    width: 100%;
    height: 3px;
    background-color: var(--color-yellow-1);
    border-radius: 20px;
  }

  .social-list__item {
    overflow: hidden;
    border-radius: 12px;
    filter: grayscale(1);
    transition-property: filter;
    transition-duration: 0.25s;
  }

  .social-list__item:hover {
    filter: grayscale(0);
  }

  @media (max-width: 767px) {
    .social-list {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(4, 52px);
    }

    .social-list:after {
      content: none;
    }

    .social-list__item {
      filter: grayscale(0);
    }
  }
</style>
