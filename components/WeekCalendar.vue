<template>
  <div class="week-calendar-container">
    <div class="week-calendar">
      <div class="week-calendar__item week-calendar__control select-none" @click="toLastWeek">
        <span>{{ $i18n('preweek', locale) }}</span>
      </div>
      <div v-for="(weekddate, index) in weekddates" :key="index" :class="['week-calendar__item', 'select-none', isSelected(weekddate) ? 'active' : '', ]" @click="select1WeekDate(weekddate)">
        <div class="item-box">
          <div class="item-box__day-and-month-slot">
            <strong>{{ weekddate.format('ddd') }}</strong>
            <div>{{ weekddate.format('MMM') }}</div>
          </div>
          <div class="item-box__date-slot">
            {{ weekddate.format('D') }}
          </div>
        </div>
      </div>
      <div :class="['week-calendar__item', 'week-calendar__control', 'select-none', disabledClass]" @click="toNextWeek">
        <span>{{ $i18n('nextweek', locale) }}</span>
      </div>
    </div>
    <div>
      <div class="info">
        <p>
          {{ $i18n("from", locale) }}
          <span class="info__date-label">{{ formatddate(from) }}</span>
          {{ $i18n("to", locale) }}
          <span class="info__date-label">{{ formatddate(to) }}</span>
        </p>
      </div>
      <div class="week-toggle">
        <b-button :variant="allSelected ? 'secondary' : 'outline-secondary'" @click="toggle">
          {{ $i18n("weeklyview", locale) }}
        </b-button>
      </div>
      <div class="calendar-input">
        <datepicker calendar-class="calendar" input-class="datepicker" :value="selecteddates[0]" :open-date="selecteddates[0]" format="yyyy-MM-dd" typeable :highlighted="highlighteddates" :disabled-dates="disabledDates" @selected="pick1Date" />
        <font-awesome-icon icon="calendar-alt" />
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import data from "~/components/week-calendar-static-data.js";

export default {
  components: {
    Datepicker
  },
  props: {
    latestDates: {
      type: Object,
      default() {
        return undefined;
      }
    },
    locale: {
      type: String,
      default: "zh-tw"
    },
    backstage: {
      type: Boolean,
      default: false
    },
    weekSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ddate: this.$dayjs(),
      selectedddates: []
    };
  },
  computed: {
    latestEndOfWeekDates() {
      const endOfWeekDates = {};
      Object.keys(this.latestDates).forEach(key => {
        const latestDate = this.latestDates[key];
        let latestDDate = latestDate ? this.$dayjs(latestDate) : undefined;
        if (latestDDate) {
          latestDDate = latestDDate.endOf("week");
          latestDDate =
            latestDDate.day() === 6 ? latestDDate.add(1, "day") : latestDDate;
        }
        endOfWeekDates[key] = latestDDate;
      });
      return endOfWeekDates;
    },
    disabledDates() {
      if (!this.backstage) {
        const latestDate = this.latestEndOfWeekDates
          ? new Date(this.latestEndOfWeekDates[data.localeMap[this.locale]])
          : "";
        return { from: latestDate };
      } else {
        return {};
      }
    },
    disabledClass() {
      let className;
      if (!this.backstage && this.latestEndOfWeekDates) {
        const locale = data.localeMap[this.locale];
        const latestDate = this.latestEndOfWeekDates[locale];
        if (latestDate) {
          if (this.weekddates.some(ddate => ddate.isSame(latestDate, "date"))) {
            className = "disabled";
          }
        }
      }
      return className;
    },
    from() {
      const date =
        this.selecteddates.length > 0 ? this.selecteddates[0] : new Date();
      const startddate = this.$dayjs(date).startOf("week");
      return startddate.day() === 0 ? startddate.add(1, "day") : startddate;
    },
    to() {
      const date =
        this.selecteddates.length > 0 ? this.selecteddates[0] : new Date();
      const endddate = this.$dayjs(date).endOf("week");
      return endddate.day() === 6 ? endddate.add(1, "day") : endddate;
    },
    highlighteddates() {
      return this.selecteddates.length > 0 ? { dates: this.selecteddates } : {};
    },
    selecteddates() {
      return this.selectedddates.map(ddate => ddate.toDate());
    },
    selecteddatestrings() {
      return this.selectedddates.map(ddate => ddate.format("YYYY-MM-DD"));
    },
    weekddates() {
      let startddate = this.ddate.startOf("week");
      startddate =
        this.ddate.day() === 0 ? startddate.subtract(1, "week") : startddate;
      // the start day of week might be Sunday in some of locales.
      const mondayddate =
        startddate.day() === 0 ? startddate.add(1, "day") : startddate;
      return [...Array(7)].map((item, index) =>
        mondayddate.add(index, "day").locale(this.locale)
      );
    },
    allSelected() {
      return this.selecteddates.length === 7;
    }
  },
  mounted() {
    this.ddate = this.$dayjs();
    if (this.weekSelected) {
      this.select1Week();
    } else {
      this.select1WeekDate(this.ddate);
    }
  },
  methods: {
    pick1Date(dateStr) {
      this.ddate = this.$dayjs(new Date(dateStr));
      this.select1WeekDate(this.ddate);
    },
    formatddate(ddate) {
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
    isSelected(ddate) {
      return this.selectedddates.some(x => x.isSame(ddate, "date"));
    },
    toLastWeek() {
      this.ddate = this.ddate.subtract(1, "week");
      this.select1Week(true);
    },
    toNextWeek() {
      this.ddate = this.ddate.add(1, "week");
      this.select1Week(true);
    },
    select1WeekDate(ddate) {
      this.selectedddates = ddate ? [ddate] : [this.weekddates[0]];
      this.$emit("change", this.selecteddatestrings);
    },
    select1Week(refetch) {
      this.selectedddates = [...this.weekddates];
      this.$emit("change", this.selecteddatestrings, refetch);
    },
    toggle() {
      if (this.allSelected) {
        this.select1WeekDate();
      } else {
        this.select1Week();
      }
    }
  }
};
</script>
<style scoped>
.week-calendar-container {
  min-height: 180px;
}
.week-calendar {
  margin-top: 15px;
  margin-bottom: 20px;
  float: left;
  width: 100%;
}
.week-calendar__item {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  width: 12%;
  height: 60px;
  float: left;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.week-calendar__item.active {
  background-color: #e8c40e;
  color: #fff;
}
.week-calendar__item span {
  width: 100%;
}
.week-calendar__control {
  width: 8%;
  height: 60px;
  vertical-align: middle;
  border: 1px solid #ddd;
}
.week-calendar__control.disabled {
  color: #fff;
  background-color: #000000;
  opacity: 0.5;
  pointer-events: none;
}
.week-calendar__control:hover {
  background-color: #f9f9f9;
}
.item-box {
  margin: 0 auto;
}
.item-box__day-and-month-slot {
  line-height: 20px;
  display: inline-block;
}
.item-box__date-slot {
  font-size: 3em;
  font-weight: bold;
  display: inline-block;
  margin-left: 2px;
}
.info {
  display: inline-block;
  width: 400px;
}
.info p {
  width: 50rem;
  font-weight: bold;
  color: #000000;
}
.info__date-label {
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 0px 5px;
}
.calendar-input {
  position: relative;
  width: 130px;
}
.week-toggle,
.calendar-input,
.calendar-input svg {
  float: right;
}
.calendar-input svg {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
