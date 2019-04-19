<template>
  <div :class="['filter-form', floatClass]">
    <b-button variant="outline-secondary" :class="['filter-form__menu-button', positionClass]">
      <font-awesome-icon icon="filter" />{{ $i18n("filter", locale) }}
    </b-button>
    <div class="filter-form__menu menu">
      <div>
        <b-button variant="outline-secondary" @click="selectAll">
          {{ $i18n("selectall", locale) }}
        </b-button>
        <b-button variant="outline-secondary" @click="clearAll">
          {{ $i18n("clearall", locale) }}
        </b-button>
      </div>
      <div class="menu__desc">
        {{ $i18n("countrychoises", locale) }}:
      </div>
      <div>
        <ul class="menu__country-list">
          <li v-for="(country, index) in countries" :key="index" class="menu__country-item country-item">
            <b-form-checkbox v-model="selectedCountries" name="country-list" :value="country" @change="selectCountry(country)">
              <div class="select-none country-item__name">
                <div :class="toCountryClass(country)" />{{ $i18n(country, locale) }}
              </div>
            </b-form-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import data from "~/components/Toolbar/country-select-static-data.js";

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
      selectedCountries: [],
      countries: data.countries,
      flagIconMap: data.flagIconMap
    };
  },
  computed: {
    positionClass() {
      if (this.first) {
        return "filter-form__menu-button_position_first";
      } else if (this.last) {
        return "filter-form__menu-button_position_last";
      } else if (this.middle) {
        return "filter-form__menu-button_position_middle";
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
    }
  },
  mounted() {
    this.selectAll();
  },
  methods: {
    selectAll() {
      this.selectedCountries = this.countries;
      this.$emit("change", [...this.selectedCountries]);
    },
    clearAll() {
      this.selectedCountries = [];
      this.$emit("change", [...this.selectedCountries]);
    },
    toCountryClass(country) {
      const flagKey = this.flagIconMap[country];
      return flagKey ? ["flag-20", "flag-" + flagKey.toLowerCase()] : [];
    },
    selectCountry(country) {
      if (this.selectedCountries.includes(country)) {
        // uncheck this country
        this.$emit("change", this.selectedCountries.filter(c => c !== country));
      } else {
        // check this country
        this.$emit("change", [country, ...this.selectedCountries]);
      }
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
  min-width: 250px;
  padding: 10px;
  display: none;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1;
}
.filter-form__menu-button {
  height: 35px;
}
.filter-form__menu-button_position_first {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.filter-form__menu-button_position_last {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.filter-form__menu-button_position_middle {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.filter-form:hover .filter-form__menu {
  display: block;
}
.menu__desc {
  margin: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}
.menu__country-list {
  margin: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}
.menu__country-item {
  list-style: none;
  display: inline-block;
  padding-right: 10px;
}
.country-item__name {
  min-width: 90px;
}
</style>
