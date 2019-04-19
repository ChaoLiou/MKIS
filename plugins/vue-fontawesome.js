import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt, faFilter, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendarAlt);
library.add(faFilter);
library.add(faUser);
library.add(faLock);

Vue.component("font-awesome-icon", FontAwesomeIcon);
