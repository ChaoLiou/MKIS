<template>
  <div class="body">
    <toolbar :locale="locale" :backstage="backstage" @import="importFiles" @change="(value) => query = value" @relocale="(value) => locale = value" />
    <week-calendar :week-selected="weekSelected" :backstage="backstage" :latest-dates="latestDates" :locale="locale" @change="change" />
    <grid-view :loading="loading" :locale="locale" :source="source" :query="query" :selected-dates="selectedDates" :backstage="backstage" @update="update" />
  </div>
</template>

<script>
import Toolbar from "~/components/Toolbar.vue";
import WeekCalendar from "~/components/WeekCalendar.vue";
import GridView from "~/components/GridView.vue";
import { _ } from "vue-underscore";
import data from "~/components/grid-view-static-data.js";
import util from "~/modules/utils.js";
import Cookies from "js-cookie";
import weekCalendarData from "~/components/week-calendar-static-data.js";

export default {
  components: {
    Toolbar,
    WeekCalendar,
    GridView
  },
  data() {
    return {
      query: {},
      selectedDates: [],
      events: [],
      columns: data.columns,
      backstage: false,
      locale: this.$qs.locale,
      weekSelected: this.$qs.week, // √
      localeMap: weekCalendarData.localeMap,
      latestDates: {},
      loading: true
    };
  },
  computed: {
    source() {
      return this.groupByDate(
        this.events.map(this.changeEventKey).map(this.changeTimeZone)
      );
    }
  },
  beforeMount() {},
  mounted() {
    this.fetch(this.selectedDates[0]);
    this.fetchLatestDates();
    const username = this.$route.params.username
      ? this.$route.params.username
      : Cookies.get("username");
    const token = this.$route.params.token
      ? this.$route.params.token
      : Cookies.get("token");
    this.backstage =
      (this.$route.params.backstage
        ? this.$route.params.backstage
        : Cookies.get("backstage") === "true") &&
      util.validation(username, token);
  },
  methods: {
    groupByDate(list) {
      const groups = _.groupBy(list, "date");
      return Object.keys(groups).map(key => {
        return {
          date: key,
          list: groups[key]
        };
      });
    },
    changeEventKey(event) {
      const item = {};
      Object.keys(event).map(key => {
        const col = _.findWhere(this.columns, { _name: key });
        if (col) {
          item[col.name] = event[key];
        } else {
          item[key] = event[key];
        }
      });
      return item;
    },
    changeTimeZone(event) {
      const time = event.time;
      const date = event.date;
      if (time && time !== "--") {
        const timezone = this.query.timeZone;
        const ddate = this.$dayjs(date + " " + time).add(
          timezone >= 8
            ? timezone - 8
            : timezone > 0 ? -8 - timezone : -8 + timezone,
          "hour"
        );
        return {
          ...event,
          date: ddate.format("YYYY-MM-DD"),
          time: ddate.format("HH:mm")
        };
      } else {
        return event;
      }
    },
    change(dates, refetch) {
      this.selectedDates = dates;
      if (refetch) {
        this.fetch(this.selectedDates[0]);
      }
    },
    async fetch(date) {
      const url = "/MKIS/query.do?date=" + date;
      console.log(url);
      this.events = await this.$axios.$get("http://localhost:3001/events");
      this.loading = false;
    },
    async fetchLatestDates() {
      const url = "/MKIS/getLatestDisplayDate.do";
      console.log(url);
      const latestDatesList = await this.$axios.$get(
        "http://localhost:3001/latest"
      );
      this.latestDates = latestDatesList[0];
    },
    importFiles(value) {
      const url = "/MKIS/fileUpload.do";
      console.log(url);
      console.log(value);
    },
    update(json) {
      const url = "/MKIS/update.do" + (this.backstage ? "mode=backend" : "");
      console.log(url);
      console.log(json);
      this.fetch(this.selectedDates[0]);
    }
  }
};
</script>

<style>
.body {
  font-family: "Noto Sans TC", Arial, sans-serif;
  font-size: 14px;
}
.body.ja {
  font-family: "メイリオ", Meiryo, "Meiryo UI", "游ゴシック", "Yu Gothic",
    "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Arial, sans-serif;
}
.flag-20 {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.flag-us {
  background: url("/flag/all.png") no-repeat -1px -160px;
}
.flag-uk {
  background: url("/flag/all.png") no-repeat -1px -140px;
}
.flag-ca {
  background: url("/flag/all.png") no-repeat -1px -20px;
}
.flag-jp {
  background: url("/flag/all.png") no-repeat -1px -120px;
}
.flag-au {
  background: url("/flag/all.png") no-repeat -1px -180px;
}
.flag-cn {
  background: url("/flag/all.png") no-repeat -1px 0px;
}
.flag-eu {
  background: url("/flag/all.png") no-repeat -1px -80px;
}
.flag-ch {
  background: url("/flag/all.png") no-repeat -1px -40px;
}
.flag-de {
  background: url("/flag/all.png") no-repeat -1px -60px;
}
.flag-fr {
  background: url("/flag/all.png") no-repeat -1px -100px;
}
.select-none {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
}
.datepicker {
  display: inline-block;
  width: 120px;
  height: 38px;
}
.calendar {
  left: -55px;
}
.pointer {
  cursor: pointer;
}
</style>
