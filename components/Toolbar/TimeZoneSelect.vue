<template>
  <div :class="['filter-form', floatClass]">
    <b-form-select v-model="selectedTimeZone" :disabled="disabled" :options="formattedTimeZones" :class="['filter-form__menu', positionClass]" @change="selectTimeZone" />
  </div>
</template>

<script>
import data from "~/components/Toolbar/time-zone-select-static-data.js";

export default {
  props: {
    locale: {
      type: String,
      default: "zh-tw"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    first: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    },
    middle: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      selectedTimeZone: "",
      timeZones: data.timeZones
    };
  },
  computed: {
    formattedTimeZones() {
      return this.timeZones.map(tz => {
        return {
          value: tz.gmt,
          text: `(GMT${tz.gmt}) ${this.$i18n(tz.capital, this.locale)}`
        };
      });
    },
    positionClass() {
      if (this.first) {
        return "filter-form__menu_position_first";
      } else if (this.last) {
        return "filter-form__menu_position_last";
      } else if (this.middle) {
        return "filter-form__menu_position_middle";
      } else {
        return "";
      }
    },
    floatClass() {
      if (this.right) {
        return "filter-form_float_right";
      } else if (this.left) {
        return "filter-form_float_left";
      } else {
        return "";
      }
    },
    selectedTimeZoneInteger() {
      const res = /([+-])(\d{2}):00/.exec(this.selectedTimeZone);
      let tz = parseInt(res[2]);
      tz = res[1] === "+" ? tz : -tz;
      return tz;
    }
  },
  mounted() {
    const tz = -(new Date().getTimezoneOffset() / 60);
    this.selectedTimeZone = `${tz > 0 ? "+" : "-"}${
      tz < 10 ? "0" : ""
    }${tz}:00`;
    this.$emit("change", this.selectedTimeZoneInteger);
  },
  methods: {
    selectTimeZone() {
      this.$emit("change", this.selectedTimeZoneInteger);
    }
  }
};
</script>

<style scoped>
.filter-form_float_right {
  float: right;
}
.filter-form_float_left {
  float: left;
}
.filter-form__menu {
  height: 35px;
}
.filter-form__menu_position_first {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.filter-form__menu_position_last {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.filter-form__menu_position_middle {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
