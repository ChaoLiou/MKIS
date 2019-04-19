<template>
  <div :class="['body', floatClass]">
    <b-button v-b-modal.modal variant="outline-secondary" :class="['body__import-btn', positionClass]">
      {{ $i18n("multiimport", locale) }}
    </b-button>
    <b-modal id="modal" :title="$i18n('multiimport', locale)" @ok="importFiles">
      <div>{{ $i18n('validdate', locale) }}</div>
      <b-form-input v-model="validdate" type="date" />
      <div>{{ $i18n('import', locale) }}</div>
      <b-form-file v-model="files" multiple plain />
      <template slot="modal-ok">
        {{ $i18n('import', locale) }}
      </template>
      <template slot="modal-cancel">
        {{ $i18n('closemodal', locale) }}
      </template>
    </b-modal>
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
      validdate: "",
      files: []
    };
  },
  computed: {
    positionClass() {
      if (this.first) {
        return "body__import-btn_position_first";
      } else if (this.last) {
        return "body__import-btn_position_last";
      } else if (this.middle) {
        return "body__import-btn_position_middle";
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
  methods: {
    importFiles() {
      const formData = new FormData();
      this.files.forEach(file => {
        formData.append(this.validdate + "_" + file.name, file);
      });
      this.$emit("import", formData);
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
.body__import-btn {
  height: 35px;
}
.body__import-btn_position_first {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.body__import-btn_position_last {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.body__import-btn_position_middle {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
