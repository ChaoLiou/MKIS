<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="6">
        <b-list-group>
          <b-list-group-item v-for="(page, index) in pages" :key="`page_${index}`" :href="`/${page}`" target="_blank">
            {{ `/${page}` }}
          </b-list-group-item>
        </b-list-group>
        <b-list-group v-for="(qs, qs_index) in querystrings" :key="`qs_${qs_index}`">
          <b-list-group-item v-for="(value, val_index) in qs.values" :key="`val_${val_index}`" :href="`/?${qs.key}=${value}`" target="_blank">
            {{ `/?${qs.key}=${value}` }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      pages: ["", "login", "parent", "urllist"],
      querystrings: [
        {
          key: "locale",
          values: ["zh-tw", "zh-cn", "en-us", "ja"]
        },
        {
          key: "week",
          values: ["", "√"]
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.body {
  background-color: black;
  min-height: 800px;
}
</style>
