<template>
  <div class="settings-page">
    <h1>Привет!</h1>
    <p>
      <span>Добро пожаловать на {{currentDate}} тренировачный день</span>
      <br />
      <span>Ваш последний результат - решено {{successCount}} из {{tryCounts}}</span>
      <br />
      <span>Общая точность {{successCounter}}%</span>
    </p>
    <div>
      <Range :min="minDuration" :max="maxDuration" :startValue="duration" label="Длительность" labelAdd="минут" v-on:range-changed="onParamChanged('duration', $event)"></Range>
      <Range :min="minDifficulty" :max="maxDifficulty" :startValue="difficulty" label="Сложность" labelAdd="" v-on:range-changed="onParamChanged('difficulty', $event)"></Range>
      <CheckBox label="Суммирование" :paramValue="summ" v-on:checkbox-changed="onParamChanged('summ', $event)"></CheckBox>
      <CheckBox label="Разность" :paramValue="subs" v-on:checkbox-changed="onParamChanged('subs', $event)"></CheckBox>
      <CheckBox label="Умножение" :paramValue="multi" v-on:checkbox-changed="onParamChanged('multi', $event)"></CheckBox>
      <CheckBox label="Деление" :paramValue="divide" v-on:checkbox-changed="onParamChanged('divide', $event)"></CheckBox>
      <CheckBox label="Возведение в степень" :paramValue="pwr" v-on:checkbox-changed="onParamChanged('pwr', $event)"></CheckBox>
    </div>
    <div class="btn-group">
      <button class="play" @click="play">
        Play!
      </button>
    </div>
  </div>
</template>

<script>
import Range from '../components/Range.vue'
import CheckBox from '../components/CheckBox.vue'
import store from '../store'

export default {
  name: 'Settings',
  data () {
    return {
      duration: store.getVal('duration'),
      difficulty: store.getVal('difficulty'),
      summ: Boolean(store.getVal('summ')),
      subs: Boolean(store.getVal('subs')),
      multi: Boolean(store.getVal('multi')),
      divide: Boolean(store.getVal('divide')),
      pwr: Boolean(store.getVal('pwr')),
      day: store.getVal('day'),
      successCount: store.getVal('successCount'),
      tryCounts: store.getVal('tryCounts'),
      accuracy: store.getVal('accuracy'),
      minDuration: 1,
      maxDuration: 15,
      minDifficulty: 1,
      maxDifficulty: 10
    }
  },
  components: {
    Range,
    CheckBox
  },
  computed: {
    currentDate () {
      const startDate = new Date('2021-10-21')
      const currentDate = new Date()
      return new Date(currentDate - startDate).getDay()
    },
    successCounter () {
      return (this.successCount / this.tryCounts * 100)
    }
  },
  methods: {
    play: function () {
      this.$router.push('/game/')
    },
    onParamChanged: function (paramName, val) {
      this[paramName] = val
      store.setVal(paramName, val)
    }
  }
}
</script>

<style scoped>
.settings-page {
  width: 400px;
  margin: 0 auto;
  padding-top: 50px;
  text-align: left;
  font-style: normal;
  font-weight: 400;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.play {
  width: 80px;
  height: 40px;
  font-size: 18px;
  background-color: #fff;
  border: 1px solid #eeeeee;
  box-shadow: 0 2px #ddd;
  cursor: pointer;
}

.play:active {
  box-shadow: none;
  transform: translateY(2px);
}
</style>
