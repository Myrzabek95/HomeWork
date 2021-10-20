<template>
  <div>
    {{min}}
    <input type="range" :min="min" :max="max" step="1" v-model="value" v-on:change="onChanged" />
    {{max}}
    <p >{{label}} - {{value}} {{labelAdd}}</p>
  </div>
</template>

<script>
export default {
  name: 'Range',
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    startValue: {
      type: Number,
      required: true,
      default: 1
    },
    label: {
      type: String,
      required: true
    },
    labelAdd: {
      type: String
    }
  },
  data () {
    return {
      value: this.startValue
    }
  },
  methods: {
    onChanged: function () {
      this.$emit('range-changed', this.value)
    }
  }
}
</script>

<style scoped>
</style>
