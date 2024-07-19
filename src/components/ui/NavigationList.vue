<template>
  <ul class="navigation-list">
    <li v-for="route in routes" :key="route.to" class="navigation-list__unit">
      <router-link :to="route.to" class="navigation-list__link">
        <span class="navigation-list__link-text">{{ route.text }}</span>
      </router-link>

      <img
        v-if="route.img"
        :src="route.img?.src"
        :alt="route.img?.alt"
        class="navigation-list__image"
      />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'NavigationList',

    props: {
      /**
       * Represents navigation links for the component. Each link is an object that includes a route, display text, and optionally an image.
       * @type {Array<{ to: string, text: string, img?: { src: string, alt: string } }>}
       * @property {string} to - The target URL or path that the router link navigates to.
       * @property {string} text - The text displayed for the navigation link.
       * @property {Object} [img] - Optional image details for the navigation link.
       *   @property {string} img.src - Source URL of the image.
       *   @property {string} img.alt - Alternative text for the image if it cannot be displayed.
       * @example
       * [
       *   { to: '/home', text: 'Home', img: { src: '/images/home-icon.png', alt: 'Home Icon' } },
       *   { to: '/about', text: 'About' },
       *   { to: '/contact', text: 'Contact', img: { src: '/images/contact-icon.png', alt: 'Contact Icon' } }
       * ]
       */
      routes: {
        type: Array,
        required: true,
        default: null,
      },
    },
  }
</script>

<style scoped>
  .navigation-list {
    display: grid;
    grid-auto-flow: column;
    justify-content: flex-start;
    gap: 10px;
  }

  .navigation-list__unit {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 14px;
  }

  .navigation-list__link:hover {
    border-color: var(--color-yellow-1);
  }

  .navigation-list__unit:hover .navigation-list__link-text {
    color: var(--color-yellow-1);
  }

  .navigation-list__link:hover:before {
    background-color: rgba(23, 23, 23, 0);
  }

  .navigation-list__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

  .navigation-list__link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid;
    transition-property: border-color;
    transition-duration: 0.3s;
    z-index: 1;
  }

  .navigation-list__link:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(23, 23, 23, 0.7);
    transition-property: background-color;
    transition-duration: 0.3s;
    z-index: 1;
  }

  .navigation-list__link.nuxt-link-exact-active {
    border-color: var(--color-yellow-1);
    cursor: default;
  }

  .navigation-list__link.nuxt-link-exact-active .navigation-list__link-text {
    color: var(--color-yellow-1);
  }

  .navigation-list__link.nuxt-link-exact-active:before {
    background-color: rgba(23, 23, 23, 0);
  }

  .navigation-list__link-text {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding-top: 2px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.85px;
    line-height: 1.4;
    transition-property: color;
    transition-duration: 0.3s;
  }
</style>
