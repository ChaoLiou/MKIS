<template>
  <div class="picker-container" @mouseover="show = true" @mouseleave="show = false">
    <span class="current-color" :style="{ 'background-color': value }" />
    <compact v-show="show" :value="value" class="color-picker" @input="input" />
  </div>
</template>
<script>
import { Compact } from "vue-color";

export default {
  components: {
    Compact
  },
  props: {
    value: {
      type: String,
      default: "#000000"
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    input(value) {
      this.$emit("input", value.hex);
      this.$emit("change");
    }
  }
};
</script>
<style scoped>
.picker-container {
  position: relative;
}
.current-color {
  float: right;
  width: 10px;
  height: 10px;
  cursor: pointer;
  border-radius: 5px;
}
.color-picker {
  position: absolute;
  right: 0px;
}
</style>
