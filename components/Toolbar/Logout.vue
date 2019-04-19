<template>
  <div :class="['body', floatClass]">
    <b-button variant="outline-secondary" :class="['body__logout-btn', positionClass]" @click="logout">
      {{ $i18n('logout', locale) }}
    </b-button>
  </div>
</template>
<script>
import Cookies from "js-cookie";

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
    return {};
  },
  computed: {
    positionClass() {
      if (this.first) {
        return "body__logout-btn_position_first";
      } else if (this.last) {
        return "body__logout-btn_position_last";
      } else if (this.middle) {
        return "body__logout-btn_position_middle";
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
    logout() {
      Cookies.remove("username");
      Cookies.remove("token");
      Cookies.remove("backstage");
      this.$router.push({ name: "Login" })
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
.body__logout-btn {
  height: 35px;
}
.body__logout-btn_position_first {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.body__logout-btn_position_last {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.body__logout-btn_position_middle {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
