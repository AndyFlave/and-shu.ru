<template>
  <button :class="buttonClasses" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'BaseButton',

    props: {
      type: {
        type: String,
        required: false,
        default: 'primary',
        validator: (value) => {
          return ['primary', 'disabled'].includes(value)
        },
      },
    },

    computed: {
      buttonClasses() {
        return ['base-button', `base-button_${this.type}`]
      },
    },
  }
</script>

<style scoped>
  .base-button {
    min-width: 220px;
    padding: 13px 15px 11px;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    letter-spacing: 1px;
    transition-property: border-color;
    transition-duration: var(--duration-1);
  }

  .base-button_primary {
    background-color: var(--color-yellow-1);
    color: var(--color-white-1);
    border: 1px solid var(--color-white-1);
  }

  .base-button_primary:hover {
    border-color: var(--color-yellow-1);
  }
</style>
