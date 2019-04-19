<template>
  <div>
    <grid-view-toolbar :locale="locale" :backstage="backstage" @create="create" @delete="deleteRows" @recover="recover" @update="update" />
    <table :class="{'table-hover': !backstage}">
      <thead>
        <tr>
          <th v-for="col in filteredColumns" :id="col.name" :key="col.id" :class="{ 'select-none': 'true', center: col.center}">
            {{ $i18n(col.name, locale) }}
            <span v-if="col.remark" style="white-space:nowrap;text-align:center;">({{ $i18n(col.remark, locale) }})</span>
          </th>
        </tr>
      </thead>
      <tbody v-show="!filteredSource.some(group => group.date === selectedDates[0])" align="center">
        <tr style="border:0px">
          <td :colspan="backstage ? 9 : 7">
            <b-spinner v-if="loading" variant="warning" />
            <span v-else>{{ $i18n("nodatamessage") }}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-for="dateGroup in filteredSource" :key="dateGroup.date">
        <template is="tbody" v-if="!dateGroup.hidden">
          <tr>
            <td :colspan="columns.length" class="date-title">
              {{ formatDDate($dayjs(new Date(dateGroup.date))) }}
            </td>
          </tr>
          <tr v-for="item in dateGroup.list" v-show="!item.hidden" :key="item.id" :class="{ pointer: backstage, selected: isRowSelected(item), 'new':item.state==='new', deleted: item.state==='deleted' }" @click="selectRow(item)">
            <td v-for="col in filteredColumns" :key="col.name" :class="{ center: col.center, }">
              <div v-if="backstage && col.type.startsWith('input')">
                <b-form-input v-model="item[col.name]" :type="col.type.split(':')[1]" :class="{ 'changed': isValueChanged(item, col) }" @click.stop @change="rowChanged(item)" />
              </div>
              <div v-else-if="backstage && col.type==='textarea'">
                <b-form-textarea v-model="item[col.name].content" rows="5" type="textarea" :style="{ color: item[col.name].color }" :class="{ 'changed': isValueChanged(item, col) }" @click.stop @change="rowChanged(item)" />
                <colorpicker v-model="item[col.name].color" @change="rowChanged(item)" />
              </div>
              <div v-else-if="backstage && col.type==='select'">
                <select v-model="item[col.name]" :class="{ 'changed': isValueChanged(item, col) }" @click.stop @change="rowChanged(item)">
                  <option v-for="importance in ['高', '中', '低']" :key="importance" :value="importance">
                    {{ $i18n(importance, locale) }}
                  </option>
                </select>
              </div>
              <div v-else-if="backstage && col.name==='state'">
                <b-badge v-if="item[col.name]=== 'new'" variant="primary">
                  NEW
                </b-badge>
                <b-badge v-else-if="item[col.name]==='deleted'" variant="danger">
                  DELETED
                </b-badge>
                <b-badge v-else-if="!item[col.name]" variant="secondary">
                  NONE
                </b-badge>
                <b-badge v-else-if="item[col.name]==='updated'" variant="warning">
                  UPDATED
                </b-badge>
              </div>
              <div v-if="!backstage">
                <div v-if="col.name=== 'country'" class="country">
                  <div :class="toCountryClass(item[col.name])" /> {{ item[col.name] }}
                </div>
                <div v-else-if="col.name ==='importance'">
                  <div :class="toImportanceClass(item[col.name])">
                    {{ item[col.name] }}
                  </div>
                </div>
                <div v-else-if="col.type === 'textarea'" :class="col.name">
                  <div v-html="item[col.name].tag" />
                </div>
                <div v-else>
                  {{ item[col.name] }}
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import GridViewToolbar from "~/components/GridView/Toolbar.vue";
import data from "~/components/grid-view-static-data.js";
import Colorpicker from "~/components/GridView/Colorpicker.vue";
import countrySelectData from "~/components/Toolbar/country-select-static-data.js";
import weekCalendarData from "~/components/week-calendar-static-data.js";
import { _ } from "vue-underscore";

export default {
  components: {
    GridViewToolbar,
    Colorpicker
  },
  props: {
    source: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedDates: {
      type: Array,
      default() {
        return [];
      }
    },
    query: {
      type: Object,
      default() {
        return { countries: [], timeZone: "" };
      }
    },
    backstage: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    },
    locale: {
      type: String,
      default: "zh-tw"
    }
  },
  data() {
    return {
      columns: data.columns,
      flagIconMap: countrySelectData.flagIconMap,
      countries: countrySelectData.countries,
      localeMap: weekCalendarData.localeMap,
      filteredSource: [],
      selectedRows: []
    };
  },
  computed: {
    filteredColumns() {
      return this.columns.filter(
        col =>
          (col.type !== "hidden" &&
            col.name !== "state" &&
            col.name !== "validdate") ||
          ((col.type !== "hidden" || col.name === "state") && this.backstage)
      );
    }
  },
  watch: {
    query() {
      this.filteredSource = this.filter(this.source);
    },
    selectedDates() {
      this.filteredSource = this.filter(this.source);
    },
    source() {
      this.filteredSource = this.filter(this.source);
    },
    locale() {
      this.filteredSource = this.filter(this.source);
    }
  },
  mounted() {
    this.filteredSource = this.filter(this.source);
  },
  updated() {
    if (this.filteredSource.length > 0) {
      const visibleDateGroup = _.filter(
        this.filteredSource,
        row => !row.hidden
      );
      const visibleRows = _.filter(
        _.flatten(_.map(visibleDateGroup, row => row.list)),
        row => !row.hidden
      );
      const table = document.querySelector("table");
      const tr = document.querySelector("tr");
      if (table && tr) {
        const tableTop = table.offsetTop;
        const eachRowHeight = tr.clientHeight;
        const contentHeight =
          tableTop +
          (visibleDateGroup.length + visibleRows.length + 1) * eachRowHeight +
          200;
        if (parent && parent.document) {
          const iframe = parent.document.getElementById("mainframe");
          if (iframe) {
            iframe.height = contentHeight;
          }
        }
      }
    }
  },
  methods: {
    isRowSelected(row) {
      return _.contains(this.selectedRows.map(r => r.id), row.id);
    },
    selectRow(row) {
      if (this.isRowSelected(row)) {
        this.selectedRows = _.without(
          this.selectedRows,
          _.findWhere(this.selectedRows, { id: row.id })
        );
      } else {
        this.selectedRows.push(row);
      }
    },
    isValueChanged(row, col) {
      if (row.state === "updated") {
        const rawColumnName = col.name + "_raw";
        if (col.type === "textarea") {
          const value = row[col.name];
          const rawValue = row[rawColumnName];
          const isContentChanged = value.content !== rawValue.content;
          const isColorChanged = value.color !== rawValue.color;
          return isContentChanged || isColorChanged;
        } else {
          return row[col.name] !== row[rawColumnName];
        }
      } else {
        return false;
      }
    },
    rowChanged(row) {
      if (!row.state || row.state !== "new") {
        const availableCols = _.filter(this.columns, col => col.backup);
        const valueChangedCols = _.filter(availableCols, col => {
          const rawColumnName = col.name + "_raw";
          if (col.type === "textarea") {
            const value = row[col.name];
            const rawValue = row[rawColumnName];
            const isContentChanged = value.content !== rawValue.content;
            const isColorChanged = value.color !== rawValue.color;
            return isContentChanged || isColorChanged;
          } else {
            return row[col.name] !== row[rawColumnName];
          }
        });
        row.state = valueChangedCols.length > 0 ? "updated" : "";
      }
    },
    formatEvent(event) {
      return {
        ...event,
        event: this.htmlExtract(event.event),
        previous: this.htmlExtract(event.previous),
        forecast: this.htmlExtract(event.forecast),
        actual: this.htmlExtract(event.actual),
        state: event.state ? event.state : ""
      };
    },
    backupEvent(event) {
      const item = {};
      Object.keys(event).forEach(key => {
        const col = _.findWhere(this.columns, { name: key });
        if (col && col.backup) {
          item[key + "_raw"] =
            typeof event[key] === typeof {} ? { ...event[key] } : event[key];
        }
      });
      return {
        ...event,
        ...item
      };
    },
    filter(list) {
      return list.map(dateGroup => {
        const dateGroupList = dateGroup.list
          .map(this.formatEvent)
          .map(this.backupEvent)
          .map(event => {
            const country = this.flagIconMap[event.country];
            const isCountryOfEventSelected =
              this.query.countries.indexOf(country) >= 0 ||
              this.countries.indexOf(country) < 0;
            return {
              ...event,
              hidden:
                !isCountryOfEventSelected ||
                event.locale !== this.localeMap[this.locale]
            };
          });
        return {
          ...dateGroup,
          list: dateGroupList,
          hidden:
            this.selectedDates.indexOf(dateGroup.date) < 0 ||
            _.every(dateGroupList, event => event.hidden)
        };
      });
    },
    toImportanceClass(importance) {
      const classes = ["badge", "importance"];
      switch (importance.replace(/^\s+|\s+$/g, "")) {
        case "低":
        case "LOW":
          classes.push("badge-success");
          break;
        case "中":
        case "MEDIUM":
          classes.push("badge-warning");
          break;
        case "高":
        case "HIGH":
          classes.push("badge-danger");
          break;
        default:
          break;
      }
      return classes;
    },
    toCountryClass(country) {
      const flagKey = this.flagIconMap[country];
      return flagKey ? ["flag-20", "flag-" + flagKey.toLowerCase()] : [];
    },
    htmlExtract(html) {
      let content = html;
      let color = "";
      let tag = "";
      if (html && typeof html === typeof "") {
        content = html.replace(/<[^>]*>/g, "");
        color = /'([^']*)'/.exec(html)[1].split(":")[1];
        tag = html;
      }
      color = color || "#000000";
      return { content: content, color: color, tag: tag };
    },
    formatDDate(ddate) {
      const dateString = ddate.locale(this.locale).format("LLLL");
      const result = /^\d+.\d+.\d+.\s*.../.exec(dateString);
      if (result) {
        const date = /^\d+.\d+.\d+.\s*/.exec(dateString);
        const week = result[0].substring(date[0].length);
        return "".concat(
          date[0].replace(/^\s+|\s+$/g, ""),
          " ",
          week.replace(/^\s+|\s+$/g, "")
        );
      }
      return dateString;
    },
    create() {
      const dateGroup = _.findWhere(this.filteredSource, {
        date: this.selectedDates[0]
      });
      const rowTemplate = {
        id: Date.now(),
        date: this.selectedDates[0],
        time: new Date().toTimeString().substr(0, 5),
        country: "",
        event: { content: "", color: "#000000", tag: "" },
        importance: "",
        actual: { content: "", color: "#000000", tag: "" },
        forecast: { content: "", color: "#000000", tag: "" },
        previous: { content: "", color: "#000000", tag: "" },
        state: "new",
        locale: this.localeMap[this.locale],
        validdate: ""
      };

      if (dateGroup) {
        dateGroup.list.unshift(rowTemplate);
        dateGroup.hidden = false;
      } else {
        this.rows.unshift({
          date: this.selectedDates[0],
          list: [rowTemplate]
        });
      }
      this.$emit("create");
    },
    recover() {
      const textareaColumns = _.filter(
        this.columns,
        col => col.type === "textarea"
      );
      const textareaNames = _.map(textareaColumns, col => col.name);
      if (this.selectedRows.length > 0) {
        this.filteredSource.forEach(dateGroup => {
          dateGroup.list.forEach(event => {
            const row = _.findWhere(this.selectedRows, { id: event.id });
            if (row && event.state !== "new") {
              event.state = "";
              Object.keys(row).forEach(key => {
                if (key.indexOf("_raw") >= 0) {
                  const nameWithoutRaw = key.replace("_raw", "");
                  if (_.some(textareaNames, name => name === nameWithoutRaw)) {
                    row[nameWithoutRaw].content = row[key].content;
                    row[nameWithoutRaw].color = row[key].color;
                  } else {
                    row[nameWithoutRaw] = row[key];
                  }
                }
              });
            }
          });
        });
        this.selectedRows = [];
        this.$emit("recover");
      }
    },
    deleteRows() {
      if (this.selectedRows.length > 0) {
        this.filteredSource.forEach(dateGroup => {
          const ids = [];
          dateGroup.list.forEach(item => {
            const row = _.findWhere(this.selectedRows, { id: item.id });
            if (row) {
              if (item.state === "new") {
                ids.push(item.id);
              } else {
                item.state = "deleted";
              }
            }
          });
          dateGroup.list = _.filter(
            dateGroup.list,
            item => ids.indexOf(item.id) < 0
          );
        });
        this.selectedRows = [];
        this.$emit("delete");
      }
    },
    update() {
      const json = _.flatten(this.filteredSource.map(group => group.list))
        .map(event => {
          const availableKeys = _.filter(
            Object.keys(event),
            key => key.indexOf("_raw") < 0
          );
          const newEvent = {};
          availableKeys.map(key => {
            const col = _.findWhere(this.columns, { name: key });
            if (col) {
              if (col.type === "textarea") {
                const html = event[key];
                const content = html.content;
                const color = html.color;
                const tag = content
                  ? `<span style='color:${color}'>${content}</span>`
                  : "";
                newEvent[col.name] = tag;
              } else {
                newEvent[col.name] = event[key];
              }
            }
          });
          return newEvent;
        })
        .filter(event => event.state);
      this.$emit("update", json);
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
  text-align: left;
}
tr {
  border-bottom: 1px solid #dddddd;
}
th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
  color: #aaaaaa;
}
th,
td {
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
}
th.center,
td.center {
  text-align: center;
}
th span {
  white-space: nowrap;
  text-align: center;
}
#time {
  width: 6%;
  white-space: nowrap;
}
#validdate {
  width: 90px;
}
#country {
  width: 11%;
  min-width: 100px;
  text-align: center;
}
#event {
  width: 35%;
  max-width: 35%;
}
#importance {
  width: 7%;
  white-space: nowrap;
}
#actual {
  width: 14%;
  max-width: 14%;
  white-space: nowrap;
}
#forecast {
  width: 14%;
  max-width: 14%;
  white-space: nowrap;
}
#previous {
  width: 14%;
  max-width: 14%;
}
#state {
  width: 90px;
}
.importance {
  width: 100%;
}
input,
select {
  font-size: 13px;
  min-width: 55px;
}
select {
  padding: 0.375rem 0.75rem;
  border-radius: 5px;
}
select:focus {
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
input[type="time"] {
  width: 125px;
}
input[type="date"] {
  width: 130px;
}
input[type="text"] {
  width: 60px;
}
textarea[type="textarea"] {
  width: 190px;
}
.date-title {
  background-color: #f0f0f0;
}
input.changed,
textarea.changed,
select.changed {
  border-color: #ffc107;
}
tr td div.actual {
  word-break: break-all;
  word-wrap: break-word;
}
tr.new {
  background-color: #6baef7;
}
tr.deleted {
  background-color: #da848d;
}
tr.selected {
  background-color: #ececec;
}
</style>
