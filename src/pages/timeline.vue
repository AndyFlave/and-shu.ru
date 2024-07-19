<template>
  <div class="timeline-page">
    <div class="container timeline-page__container">
      <div class="timeline-page__content">
        <h1 class="timeline-page__title">Lifetime Timeline Visualization</h1>
        <p class="timeline-page__subtitle">
          Lifetime visualization <br />
          Each cell represents one week. There are 52 weeks in each row, which
          equals 1 year. <br />
          Past weeks are painted in orange. Current week is marked in green
        </p>

        <div>
          <ul>
            <li>My lifetime: {{ name }}</li>
            <li>Date of birth: {{ date }}</li>
            <li>Years of live: {{ yearsOfLife }}</li>
            <li v-if="lifePercentage">
              Lived vs. Remaining Life (%):
              <span class="yellow">{{ lifePercentage.lived }}</span> /
              <span class="green">{{ lifePercentage.remaining }}</span>
            </li>
          </ul>
        </div>

        <BaseButton @click="openPanel()" class="timeline-page__panel-trigger">
          {{ isOpenPanel ? 'Fill the folowing fields:' : 'TRY' }}
        </BaseButton>

        <div v-if="isOpenPanel" class="panel">
          <input type="text" placeholder="Your name" class="panel__input" />
          <input type="date" @change="change($event)" class="panel__input" />

          <BaseButton @click="closePanel()" class="panel__button">
            OK
          </BaseButton>
        </div>
      </div>

      <TimeLine
        :birth-date="date"
        :years-of-life="yearsOfLife"
        @life-percentage="test($event)"
      />
    </div>
  </div>
</template>

<script>
  import BaseButton from '@/components/ui/base/BaseButton'
  import TimeLine from '@/components/ui/TimeLine'

  export default {
    name: 'TimeLinePage',

    layout: 'fullpage',

    components: {
      BaseButton,
      TimeLine,
    },

    data() {
      return {
        name: 'Andrey',
        date: '1994-02-26',
        yearsOfLife: 80,
        lifePercentage: null,
        isOpenPanel: false,
      }
    },

    methods: {
      change(event) {
        this.date = event.target.value
        console.log('this.date: ', this.date)
      },

      openPanel() {
        this.isOpenPanel = true
      },

      closePanel() {
        this.isOpenPanel = false
      },

      test(event) {
        this.lifePercentage = event
      },
    },
  }
</script>

<style scoped>
  .timeline-page {
    padding: 40px 0;
  }

  .timeline-page__container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  .timeline-page__panel-trigger {
    margin-bottom: 20px;
  }

  .panel {
    display: grid;
    gap: 8px;
  }

  .panel__input {
    padding: 8px 12px;
  }

  .panel__button {
    margin-top: 8px;
  }

  .yellow {
    color: var(--color-yellow-1);
  }
  .green {
    color: var(--color-green-1);
  }
</style>
