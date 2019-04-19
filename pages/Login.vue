<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="6">
        <div class="form">
          <div class="form__title">
            <h1>
              <b-link href="/" target="_blank">
                <b-badge variant="light">
                  {{ name }}
                </b-badge>
              </b-link>
            </h1>
            <div class="info-box">
              <b-badge pill variant="success" class="float-right">
                Ver: {{ version }}
              </b-badge>
            </div>
            <div class="info-box">
              <b-badge pill variant="info" class="float-right">
                Build At {{ buildtime }}
              </b-badge>
            </div>
          </div>
          <b-form-group label="User Name" label-for="username">
            <font-awesome-icon icon="user" class="input-pre-icon" />
            <b-form-input id="username" v-model="username" trim type="text" @keyup="invalid = false" @keyup.enter="login" />
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <font-awesome-icon icon="lock" class="input-pre-icon" />
            <b-form-input id="password" v-model="password" trim type="password" @keyup="invalid = false" @keyup.enter="login" />
          </b-form-group>
          <b-button class="float-right login-btn" @click="login">
            {{ $i18n("login") }}
          </b-button>
          <b-alert class="validation-message" :show="invalid" variant="danger">
            Login Failed!
          </b-alert>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import util from "~/modules/utils.js";
import { version, name, buildtime } from "~/revision.json";
import Cookies from "js-cookie";

export default {
  props: {},
  data() {
    return {
      username: "",
      password: "",
      invalid: false,
      name: name,
      version: version,
      buildtime: buildtime
    };
  },
  computed: {},
  mounted() {},
  methods: {
    login() {
      const token = util.hexEncode(this.password);
      if (util.validation(this.username, token)) {
        const hour = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set("username", this.username, { expires: hour });
        Cookies.set("token", token, { expires: hour });
        Cookies.set("backstage", true, { expires: hour });

        this.$router.push({
          name: "index",
          params: {
            username: this.username,
            token: token,
            backstage: true
          }
        });
      } else {
        this.invalid = true;
      }
    }
  }
};
</script>
<style scoped>
select {
  width: 120px;
}
input {
  padding-left: 30px;
}
.input-pre-icon {
  position: absolute;
  margin-left: 10px;
  margin-top: 10px;
}
.form {
  height: 350px;
  padding: 10px;
  background-color: #e8c40e;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
    0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);
}
.form__title {
  text-align: center;
}
.validation-message {
  width: 450px;
}
.login-btn {
  margin-top: 10px;
}
.info-box {
  height: 20px;
}
</style>
