<template>
<div>
  <div class="timer">
    <div class="progressing" :style="{ width: Width() }">{{ TimerText() }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    secondsTotal: {
      type: Number,
      required: true,
      validator (value) {
        return value > 0
      }
    },
    secondsLeft: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    TimerText () {
      const minutes = Math.floor(this.secondsLeft / 60)

      const seconds = (
        this.secondsLeft - minutes * 60
      ).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      return `${minutes}:${seconds}`
    },
    Width () {
      let percent = (this.secondsLeft / this.secondsTotal) * 100

      percent = 100 - percent

      return `${percent}%`
    }
  }
}
</script>

<style scoped>
.timer {
  border-width: 1px;
  border-color:skyblue;
  background-color: skyblue;
  width: 100px;
  height: 40px;
  float:right;
  margin-left: 200px;
}
.progressing {
  background-color:thistle;
  height: 40px;
  text-align: center;
}
</style>
