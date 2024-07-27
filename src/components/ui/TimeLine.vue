<template>
  <div>
    <div class="time-line">
      <span
        v-for="(week, index) in weeks"
        :key="week.weekRange"
        :title="week.weekRange"
        :class="[
          'time-line__week',
          { 'time-line__week_current': week.status === 'current' },
          { 'time-line__week_past': week.status === 'past' },
        ]"
      >
        <span
          v-if="index % 208 === 0 && index !== 0"
          class="time-line__year-numer"
        >
          {{ index / 52 }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimeLine',

    props: {
      birthDate: {
        type: String,
        required: false,
        default: '',
      },

      yearsOfLife: {
        type: Number,
        required: false,
        default: 80,
      },
    },

    data() {
      return {
        weeks: null,
      }
    },

    created() {
      this.weeks = this.generateWeekArray(this.birthDate, this.yearsOfLife)
    },

    methods: {
      generateWeekArray(birthDate, years) {
        const startDate = this.resetTime(new Date(birthDate))
        const endDate = new Date(startDate)
        endDate.setFullYear(startDate.getFullYear() + years)
        const today = this.resetTime(new Date())
        const weeks = []

        let currentWeekStart = this.startOfWeek(startDate)
        const totalWeeks = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24 * 7)
        )
        const livedWeeks = Math.floor(
          (today - startDate) / (1000 * 60 * 60 * 24 * 7)
        )

        while (currentWeekStart <= endDate) {
          let weekStatus = ''

          const currentWeekEnd = new Date(currentWeekStart)
          currentWeekEnd.setDate(currentWeekStart.getDate() + 6)

          if (currentWeekStart <= today && today <= currentWeekEnd) {
            weekStatus = 'current'
          } else if (currentWeekEnd < today) {
            weekStatus = 'past'
          }

          const weekRange = `${this.formatDate(
            currentWeekStart
          )} — ${this.formatDate(currentWeekEnd)}`

          weeks.push({
            weekRange,
            status: weekStatus,
          })

          currentWeekStart.setDate(currentWeekStart.getDate() + 7)
          currentWeekStart = this.resetTime(currentWeekStart)
        }

        this.emitLifePercentage(livedWeeks, totalWeeks)

        return weeks
      },

      emitLifePercentage(livedWeeks, totalWeeks) {
        const livedPercentage = ((livedWeeks / totalWeeks) * 100).toFixed(2)
        const remainingPercentage = (100 - livedPercentage).toFixed(2)
        this.$emit('life-percentage', {
          lived: livedPercentage,
          remaining: remainingPercentage,
        })
      },

      resetTime(date) {
        date.setHours(0, 0, 0, 0)
        return date
      },

      startOfWeek(date) {
        const resultDate = new Date(date)
        const day = resultDate.getDay()
        const diff = resultDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
        resultDate.setDate(diff)
        return this.resetTime(resultDate)
      },

      formatDate(date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      },
    },

    watch: {
      birthDate() {
        this.weeks = this.generateWeekArray(this.birthDate, this.yearsOfLife)
      },
      yearsOfLife() {
        this.weeks = this.generateWeekArray(this.birthDate, this.yearsOfLife)
      },
    },
  }
</script>

<style scoped>
  .time-line {
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    gap: 2px;
  }

  .time-line__week {
    position: relative;
    display: block;
    width: 6px;
    height: 6px;
    background-color: var(--color-white-2);
  }

  .time-line__week:first-child:before {
    content: 'Years';
    position: absolute;
    top: -50%;
    right: calc(100% + 4px);
    font-size: 10px;
  }

  .time-line__week_past {
    background-color: var(--color-yellow-1);
  }

  .time-line__week_current {
    background-color: var(--color-green-1);
  }

  .time-line__week_current:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0.5px solid var(--color-green-1);
    opacity: 0;
    animation: scaler 1.8s linear infinite;
  }

  .time-line__year-numer {
    position: absolute;
    top: -3px;
    right: calc(100% + 5px);
    font-size: 10px;
    min-width: 10px;
    text-align: right;
  }

  @keyframes scaler {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(8);
    }
  }

  @media (max-width: 1023px) {
    .time-line__week {
      width: 5px;
      height: 5px;
    }
  }

  @media (max-width: 560px) {
    .time-line__week {
      width: 4px;
    }
  }

  @media (max-width: 425px) {
    .time-line__week {
      width: 3px;
      height: 4px;
    }
  }
</style>
