<template>
  <div class="game-page">
    <div class="header">
      <button class="cancel" @click="cancel">
        <span>&times;</span>ОТМЕНА
      </button>
      <Timer class="right"
        :seconds-total="secondsTotal"
        :seconds-left="secondsLeft"
      />
    </div>
    <div class="quizNumber">
      Задача №{{quizNumber}}
    </div>
    <div class="quiz">
      <span id="num1">{{firstOperand}}</span>
        {{mathOperation1}}
      <input id="num2" type="text" v-model="answer1" v-bind:class="num2Class"/>
        {{mathOperation2}}
      <input id="num3" type="text" v-model="answer2" v-bind:class="num3Class"/>
      <span id="question">
        = {{supposedAnswer}}?
      </span>
    </div>
    <div class="buttons">
      <div class="numberPad">
        <div class="numberButtons">
          <div>
            <input
              type="button"
              class="numberButton"
              v-for="num in [1, 2, 3]"
              :key="num"
              :value="num"
              :text="num.toString()"
              @click="btNumber(num)"
            />
          </div>
          <div>
            <input
              type="button"
              class="numberButton"
              v-for="num in [4, 5, 6]"
              :key="num"
              :value="num"
              :text="num.toString()"
              @click="btNumber(num)"
            />
          </div>
          <div>
            <input
              type="button"
              class="numberButton"
              v-for="num in [7, 8, 9]"
              :key="num"
              :value="num"
              :text="num.toString()"
              @click="btNumber(num)"
            />
          </div>
          <div class="zeroButton">
            <input class="numberButton" type="button" value="0"  v-on:click="btNumber(0)" />
          </div>
        </div>
        <div class="specialButtons">
          <input class="specialButton" type="button" value="<" v-on:click="btLess" />
          <input class="specialButton" type="button" value=">" v-on:click="btMore" />
          <input class="specialButton" type="button" value="?" v-on:click="btQuestion" />
          <input class="specialButton" type="button" value="=" v-on:click="btEqual" />
        </div>
      </div>
    </div>
    <div id="lastAnswerStat" v-bind:class="lastAnswerStatClass">
      <p><span class="parameter">Ваш ответ на задачу №{{quizNumber}}:</span> {{userLastAnswer}}</p>
      <p><span class="parameter">Целевое значение:</span> {{lastSupposedAnswer}}</p>
      <p><span class="parameter">Точность ответа, %:</span> {{lastAnswerAccuracy}}</p>
    </div>
  </div>
</template>

<script>
import Timer from '../components/Timer.vue'
import store from '../store'

const INPUT1 = 'num2'
const INPUT2 = 'num3'
const ANSWER_VAR1 = 'answer1'
const ANSWER_VAR2 = 'answer2'
const NO_ANSWER_YET = -0.5

export default {
  name: 'Game',
  data () {
    return {
      secondsTotal: 0,
      secondsLeft: 0,
      interval: null,
      answer1: '',
      answer2: '',
      firstOperand: 13,
      supposedAnswer: 84240,
      mathOperation1: '*',
      mathOperation2: '+',
      currentInput: INPUT1,
      quizNumber: 1,
      quizesNumber: store.getVal('quizesNumber'),
      quizesAccuracy: store.getVal('quizesAccuracy'),
      userLastAnswer: NO_ANSWER_YET,
      lastAnswerAccuracy: 0,
      lastSupposedAnswer: 0,
      thisSessionQuizNumber: 0,
      thisSessionQuizSolved: 0
    }
  },
  components: {
    Timer
  },
  methods: {
    cancel () {
      this.$router.push('/')
    },
    switchInput: function () {
      if (this.currentInput === INPUT1) {
        this.currentInput = INPUT2
        this.answer2 = ''
      } else {
        this.currentInput = INPUT1
        this.answer1 = ''
      }
    },
    op: function (mathOperationCode, operand1, operand2) {
      switch (mathOperationCode) {
        case '*':
          return operand1 * operand2
        case '+':
          return operand1 + operand2
        case '-':
          return operand1 - operand2
        case '/':
          return operand1 / operand2
      }

      return 0
    },
    btNumber: function (param) {
      let targetAnswerVar = ANSWER_VAR1

      if (this.currentInput !== INPUT1) {
        targetAnswerVar = ANSWER_VAR2
      }

      this[targetAnswerVar] = '' + this[targetAnswerVar] + param
    },
    btLess: function (param) {
      this.switchInput()
    },
    btMore: function () {
      this.switchInput()
    },
    btQuestion: function () {
      this.reQuiz()
    },
    btEqual: function () {
      const userAnswer = this.getUserAnswer()

      const answerAccuracy = this.getAnswerAccuracy(userAnswer)

      this.quizesNumber++

      this.quizesAccuracy.push(answerAccuracy)

      store.setVal('quizesAccuracy', this.quizesAccuracy)

      this.userLastAnswer = userAnswer

      this.lastAnswerAccuracy = answerAccuracy

      this.lastSupposedAnswer = this.supposedAnswer

      this.thisSessionQuizNumber++

      store.setVal('lastTotal', this.thisSessionQuizNumber)

      if (answerAccuracy !== 0) {
        this.thisSessionQuizSolved++
      }

      store.setVal('successCount', this.thisSessionQuizSolved)

      this.nextQuiz()
    },
    getUserAnswer: function () {
      let answer1 = parseInt(this.answer1)

      let answer2 = parseInt(this.answer2)

      if (isNaN(answer1)) {
        answer1 = 0
      }

      if (isNaN(answer2)) {
        answer2 = 0
      }

      let userAnswer = this.op(this.mathOperation1, this.firstOperand, answer1)

      userAnswer = this.op(this.mathOperation2, userAnswer, answer2)

      return userAnswer
    },
    getAnswerAccuracy: function (userAnswer) {
      const deviation = Math.abs(userAnswer - this.supposedAnswer) / this.supposedAnswer

      let answerAccuracy = 100 - Math.round(deviation * 100)

      if (answerAccuracy < 0) {
        answerAccuracy = 0
      }

      return answerAccuracy
    },
    nextQuiz: function () {
      this.quizNumber++

      this.reQuiz()
    },
    reQuiz: function () {
      this.firstOperand = Math.round(100 * Math.random())

      this.supposedAnswer = Math.round(100000 * Math.random())

      this.answer1 = ''

      this.answer2 = ''

      const ops = []

      if (store.getVal('summ')) {
        ops.push('+')
      }

      if (store.getVal('subs')) {
        ops.push('-')
      }

      if (store.getVal('multi')) {
        ops.push('*')
      }

      if (store.getVal('divide')) {
        ops.push('/')
      }

      let op1 = ops[Math.floor(ops.length * Math.random())]

      let op2 = ops[Math.floor(ops.length * Math.random())]

      if ((op2 === '*') || (op2 === '/')) {
        const tmp = op1

        op1 = op2

        op2 = tmp
      }

      this.mathOperation1 = op1
      this.mathOperation2 = op2
    }
  },
  computed: {
    num2Class: function () {
      let newClass = ''

      if (this.currentInput === INPUT1) {
        newClass = 'cur'
      }

      return newClass
    },
    num3Class: function () {
      let newClass = ''

      if (this.currentInput === INPUT2) {
        newClass = 'cur'
      }

      return newClass
    },
    lastAnswerStatClass: function () {
      let newClass = ''

      if (this.userLastAnswer === NO_ANSWER_YET) {
        newClass = 'hideme'
      }

      return newClass
    }
  },
  mounted () {
    this.secondsTotal = store.getVal('duration') * 60

    this.secondsLeft = this.secondsTotal

    this.interval = setInterval(() => {
      this.secondsLeft--

      if (this.secondsLeft === 0) {
        clearInterval(this.interval)
        this.interval = null
      }
    }, 1000)

    this.reQuiz()
  },
  unmounted () {
    if (this.interval) clearInterval(this.interval)
  }
}
</script>

<style scoped>
.game-page {
  width: 400px;
  margin: 0 auto;
  padding-top: 50px;
  text-align: left;
  font-style: normal;
  font-weight: 400;
}

#num2, #num3 {
  width: 100px;
}

.header {
  width: 300px;
  display: flex;
}

.right{
  float: right;
}

.cancel {
  width: 100px;
  height: 40px;
  font-size: 18px;
  background-color: #fff;
  border: 1px solid #eeeeee;
  box-shadow: 0 2px #ddd;
  cursor: pointer;
}

.cancel:active {
  box-shadow: none;
  transform: translateY(2px);
}

.progress {
  width: 50%;
  flex-grow: 0;
  text-align: right;
  padding: 15px;
}

.quiz {
  text-align: center;
  margin: 20px;
}

.buttons {
  width: 400px;
  display: flex;
  flex-direction: column;
}

.zeroButton {
  text-align: center;
}

.numberButtons {
  flex-grow: 0;
  width: 100%;
  text-align: center;
}

.numberButton {
  border-radius: 40px;
  width: 40px;
  height: 40px;
  margin: 20px;
  background-color:coral;
}
.specialButton {
  border-radius: 40px;
  width: 40px;
  height: 40px;
  margin: 20px;
  background-color:dimgray;
}
.specialButtons {
  flex-grow: 0;
  display: flex;
  flex-direction: column;
}

.numberPad {
  width: 400px;
  margin: 20px auto 20px auto;
  display: flex;
  flex-direction: row;
}

.quizNumber {
  margin-top: 20px;
  text-align: center;
}

#lastAnswerStat {
  margin-left: 100px;
}

#lastAnswerStat p {
  margin: 0px;
}

#lastAnswerStat .parameter {
  display: block;
  width: 200px;
  float: left;
}

.hideme {
  display: none;
}
</style>
