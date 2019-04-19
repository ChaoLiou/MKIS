<template>
  <div :class="['body', floatClass]">
    <b-form-select v-model="selectedLocale" :options="formatedLocales" :class="['body__menu', positionClass]" @change="change" />
  </div>
</template>
<script>
export default {
  props: {
    locale: {
      type: String,
      default: "zh-tw"
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
  data() {
    return {
      selectedLocale: this.locale,
      locales: [
        { text: "enUSLocale", value: "en" },
        { text: "zhTWLocale", value: "zh-tw" },
        { text: "zhCNLocale", value: "zh-cn" },
        { text: "jaLocale", value: "ja" }
      ]
    };
  },
  computed: {
    formatedLocales() {
      return this.locales.map(l => {
        return {
          text: this.$i18n(l.text, this.locale),
          value: l.value
        };
      });
    },
    positionClass() {
      if (this.first) {
        return "body__menu_position_first";
      } else if (this.last) {
        return "body__menu_position_last";
      } else if (this.middle) {
        return "body__menu_position_middle";
      } else {
        return "";
      }
    },
    floatClass() {
      if (this.right) {
        return "body_float_right";
      } else if (this.left) {
        return "body_float_left";
      } else {
        return "";
      }
    }
  },
  mounted() {},
  methods: {
    change() {
      this.$emit('change', this.selectedLocale);
    }
  }
};
</script>
<style scoped>
.body_float_right {
  float: right;
}
.body_float_left {
  float: left;
}
.body__menu {
  height: 35px;
}
.body__menu_position_first {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.body__menu_position_last {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.body__menu_position_middle {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
