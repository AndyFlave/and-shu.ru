<template>
  <div class="time-line-form">
    <div class="time-line-form__data-panel">
      <h2 class="time-line-form__title">
        {{ isMyGraph ? 'My' : 'Your' }} lifetime
      </h2>

      <ul class="time-line-form__list">
        <li class="time-line-form__item">
          Date of birth: <span class="bold">{{ date }}</span>
        </li>
        <li class="time-line-form__item">
          Expected lifespan: <span class="bold">{{ yearsOfLife }}</span>
        </li>
        <li class="time-line-form__item">
          Lived vs. Remaining Life (%):
          <span class="bold">
            <span class="yellow">{{ lifePercentage?.lived || 0 }}</span> /
            <span class="green">{{ lifePercentage?.remaining || 0 }}</span>
          </span>
        </li>
      </ul>
    </div>

    <BaseButton @click="openPanel()" class="time-line-form__panel-trigger">
      {{
        isOpen
          ? 'Please fill in your date of birth and the expected number of years of life:'
          : 'Create your own timeline'
      }}
    </BaseButton>

    <div v-if="isOpen" class="panel time-line-form__panel">
      <input
        v-model="localExprectedYears"
        type="number"
        class="panel__input"
        min="0"
      />
      <v-date-picker
        v-model="selectedDate"
        :locale="'en-US'"
        @input="onDateSelected($event)"
      />

      <div class="panel__data">
        <span v-if="localExprectedYears" class="panel__data-unit">
          Your expected years of life: {{ localExprectedYears }}
        </span>
        <span v-if="formattedDate" class="panel__data-unit">
          Your date of birth: {{ formattedDate }}
        </span>
      </div>

      <BaseButton @click="closePanel()" class="panel__button"> OK </BaseButton>
    </div>
  </div>
</template>

<script>
  import BaseButton from '@/components/ui/base/BaseButton'

  export default {
    name: 'TimeLineForm',

    components: {
      BaseButton,
    },

    props: {
      name: {
        type: String,
        required: false,
        default: '',
      },

      date: {
        type: String,
        required: false,
        default: '',
      },

      yearsOfLife: {
        type: Number,
        required: false,
        default: 80,
      },

      lifePercentage: {
        type: Object,
        required: false,
        default: null,
      },

      isMyGraph: {
        type: Boolean,
        required: false,
        default: true,
      },
    },

    data() {
      return {
        isOpen: false,
        selectedDate: '',
        localExprectedYears: '',
      }
    },

    computed: {
      formattedDate() {
        if (!this.selectedDate) return ''
        const date = new Date(this.selectedDate)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      },
    },

    methods: {
      openPanel() {
        this.isOpen = true
      },

      closePanel() {
        this.isOpen = false

        this.$emit('selected', {
          date: this.formattedDate,
          yearsOfLife: +this.localExprectedYears,
        })
      },

      onDateSelected(date) {
        this.selectedDate = date
      },
    },
  }
</script>

<style scoped>
  .time-line-form__title {
    margin-bottom: 10px;
  }

  .time-line-form__panel {
    margin-top: 20px;
  }

  .time-line-form__list {
    display: grid;
    gap: 6px;
    margin-bottom: 20px;
  }

  .panel {
    display: grid;
    row-gap: 8px;
    column-gap: 20px;
    grid-template-columns: 250px 1fr;
  }

  .panel__data {
    display: grid;
    grid-column: 2;
    grid-row: 1 / span 2;
    gap: 4px;
  }

  .panel__input {
    padding: 8px 12px;
    max-width: 250px;
    width: 100%;
  }

  .panel__button {
    grid-column: 1 / span 2;
    grid-row: 3;
    margin-top: 12px;
  }

  .yellow {
    color: var(--color-yellow-1);
  }
  .green {
    color: var(--color-green-1);
  }
  .bold {
    font-weight: 600;
  }

  .vc-container {
    max-width: 250px;
    width: 100%;
    border-radius: 0;
  }

  @media (max-width: 480px) {
    .panel {
      column-gap: 8px;
    }

    .panel__data-unit {
      font-size: 12px;
    }
  }
</style>
