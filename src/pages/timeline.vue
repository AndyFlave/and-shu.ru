<template>
  <div class="timeline-page">
    <div class="container timeline-page__container">
      <div class="timeline-page__content">
        <h1 class="timeline-page__title">Lifetime Timeline Visualization</h1>
        <p class="timeline-page__subtitle">
          Lifetime visualization <br />
          Each cell represents one week, with 52 weeks in each row, equaling one
          year. <br />
          Past weeks are shown in orange, and the current week is marked in
          green.
        </p>

        <TimeLineForm
          :name="name"
          :date="date"
          :yearsOfLife="yearsOfLife"
          :lifePercentage="lifePercentage"
          :isMyGraph="isMyGraph"
          @change="change($event)"
          @selected="selected($event)"
        />
      </div>

      <TimeLine
        :birth-date="date"
        :years-of-life="yearsOfLife"
        class="timeline-page__unit"
        @life-percentage="updatePercentageLife($event)"
      />
    </div>
  </div>
</template>

<script>
  import TimeLine from '@/components/ui/TimeLine'
  import TimeLineForm from '@/components/ui/TimeLineForm'

  export default {
    name: 'TimeLinePage',
    layout: 'fullpage',

    components: {
      TimeLine,
      TimeLineForm,
    },

    head() {
      return {
        title:
          "Lifetime Visualization Service by Andrey Shushunov - Track Your Life's Journey",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Discover how much time you have left with our Lifetime Visualization tool. Enter your birth year and desired lifespan to generate a unique timeline. See your life in percentages and a progress bar widget. Perfect for tracking life, understanding the brevity of existence, and answering questions like "How much time do I have left?" or "How can I track my life in percentages?" Start visualizing your life\'s journey today and embrace the concept of "memento mori" | Personal website of Andrey Shushunov',
          },
        ],
      }
    },

    data() {
      return {
        name: 'Andrey',
        date: '1994-02-26',
        yearsOfLife: 80,
        lifePercentage: null,
        isMyGraph: true,
      }
    },

    methods: {
      selected(event) {
        this.date = event.date
        this.yearsOfLife = event.yearsOfLife

        this.isMyGraph = false
      },

      updatePercentageLife(event) {
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

  .timeline-page__title {
    font-size: 48px;
  }

  .timeline-page__subtitle {
    margin-top: 16px;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .timeline-page__unit {
    max-width: 420px;
  }

  @media (max-width: 1199px) {
    .timeline-page {
      padding: 32px 0;
    }

    .timeline-page__container {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .timeline-page__title {
      font-size: 36px;
    }
  }

  @media (max-width: 1199px) {
    .timeline-page__title {
      font-size: 30px;
    }
  }
</style>
