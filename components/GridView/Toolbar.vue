<template>
  <div>
    <div v-if="backstage" class="control">
      <b-button-group>
        <b-button variant="outline-secondary" @click="createRow">
          {{ $i18n('create', locale) }}
        </b-button>
        <b-button variant="outline-secondary" @click="deleteRows">
          {{ $i18n('delete', locale) }}
        </b-button>
        <b-button variant="outline-secondary" @click="recoverRows">
          {{ $i18n('restore', locale) }}
        </b-button>
        <b-button variant="secondary" @click="updateGrid">
          {{ $i18n('update', locale) }}
        </b-button>
      </b-button-group>
    </div>
    <div>
      <h1>
        <strong class="title">{{ $i18n('ecostatistics', locale) }}</strong>
      </h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backstage: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: "zh-tw"
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    createRow() {
      this.$emit("create");
    },
    deleteRows() {
      this.$emit("delete");
    },
    recoverRows() {
      this.$emit("recover");
    },
    updateGrid() {
      this.$emit("update");
    }
  }
};
</script>
<style scoped>
.control {
  float: right;
}
</style>
