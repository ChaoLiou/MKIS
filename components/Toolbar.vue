<template>
  <div>
    <time-zone-select :locale="locale" :disabled="backstage" right last @change="(value) => change('timeZone', value)" />
    <country-select :locale="locale" right first @change="(value) => change('country', value)" />
    <files-import v-if="backstage" :locale="locale" left first @import="importFiles" />
    <locale-select v-if="backstage" :locale="locale" left middle @change="(value) => change('locale', value)" />
    <logout v-if="backstage" :locale="locale" left last />
  </div>
</template>

<script>
import CountrySelect from "~/components/Toolbar/CountrySelect.vue";
import TimeZoneSelect from "~/components/Toolbar/TimeZoneSelect.vue";
import FilesImport from "~/components/Toolbar/FilesImport.vue";
import Logout from "~/components/Toolbar/Logout.vue";
import LocaleSelect from "~/components/Toolbar/LocaleSelect.vue";

export default {
  components: {
    CountrySelect,
    TimeZoneSelect,
    FilesImport,
    Logout,
    LocaleSelect
  },
  props: {
    locale: {
      type: String,
      default: "zh-tw"
    },
    backstage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedCountries: [],
      selectedTimeZone: ""
    };
  },
  methods: {
    change(type, value) {
      if (type === "timeZone") {
        this.selectedTimeZone = value;
        this.$emit("change", {
          countries: this.selectedCountries,
          timeZone: this.selectedTimeZone
        });
      } else if (type === "country") {
        this.selectedCountries = value;
        this.$emit("change", {
          countries: this.selectedCountries,
          timeZone: this.selectedTimeZone
        });
      } else if (type === "locale") {
        this.$emit("relocale", value);
      }
    },
    importFiles: function(value) {
      this.$emit("import", value);
    }
  }
};
</script>
<style scoped>
</style>
