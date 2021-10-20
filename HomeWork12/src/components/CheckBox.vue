<template>
  <label>
    <input type="checkbox" v-model="value" v-on:change="onChanged" />
    {{label}}
    <br/>
  </label>
</template>

<script>

export default {
  name: 'CheckBox',
  props: {
    paramValue: {
      type: Boolean,
      required: true,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      value: this.paramValue
    }
  },
  methods: {
    onChanged: function () {
      this.$emit('checkbox-changed', this.value)
    }
  }
}
</script>

<style scoped>

</style>
