import Vue from "vue";
const qs = {
  locale: "zh-tw"
};
location.search
  .substr(1)
  .split("&")
  .forEach(qspair => {
    const items = qspair.split("=");
    if (items.length > 1) {
      if (items[0] === "locale" && items[1] === "en-us") {
        // hard code
        qs.locale = "en";
      } else if (items[0] === "week") {
        // √
        qs.week = items[1] === "%E2%88%9A";
      } else {
        qs[items[0]] = items[1];
      }
    }
  });
Vue.prototype.$qs = qs;
