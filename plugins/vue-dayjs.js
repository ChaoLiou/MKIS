import Vue from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)
Vue.prototype.$dayjs = dayjs;
