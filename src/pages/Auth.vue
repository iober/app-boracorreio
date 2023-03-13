<template>
  <q-page class="flex justify-center q-pa-md">
    <q-card class="full-width login-card shadow-5">
      <q-form @submit="submitForm">
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="login" label="Login" />
          <q-tab name="registrar" label="Registrar" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab">
          <q-tab-panel name="login">
            <div
              class="col-12 q-pa-xs"
              :class="tab == 'register' && 'col-md-6'"
            >
              <q-input
                v-model="formData.email"
                class="q-mb-md"
                type="email"
                dense
                :rules="[
                  (val) => !!val || 'Campo obrigatório!',
                  (val) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                    'E-mail inválido!',
                ]"
                label="E-mail"
              />
            </div>
            <div
              class="col-12 q-pa-xs"
              :class="tab == 'register' && 'col-md-6'"
            >
              <q-input
                v-model="formData.password"
                dense
                class="q-mb-md"
                type="password"
                :rules="[
                  (val) => !!val || 'Campo obrigatório!',
                  (val) =>
                    (val.length >= 6 && val.length <= 20) ||
                    'Entre 6 e 20 caracteres!',
                ]"
                label="Senha"
              />
            </div>
            <div align="center">
              <div class="col-12">
                <q-btn
                  dense
                  color="primary"
                  type="submit"
                  class="full-width"
                  :label="tab"
                  style="max-width: 40%"
                />
              </div>
              <q-btn
                flat
                dense
                color="primary"
                @click="recoverDialog = true"
                class="q-mt-sm"
                label="Esqueci a senha"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="registrar">
            <div class="col-12 q-pa-xs">
              <q-input
                v-model="formData.name"
                dense
                class="q-mb-md"
                :rules="[(val) => !!val || 'Campo obrigatório!']"
                label="Nome"
              />
            </div>
            <div
              class="col-12 q-pa-xs"
              :class="tab == 'registrar' && 'col-md-6'"
            >
              <q-input
                v-model="formData.email"
                dense
                class="q-mb-md"
                type="email"
                :rules="[
                  (val) => !!val || 'Campo obrigatório!',
                  (val) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                    'E-mail inválido!',
                ]"
                label="E-mail"
              />
            </div>
            <div class="col-12 col-md-6 q-pa-xs">
              <q-input
                v-model="formData.emailConfirmation"
                dense
                class="q-mb-md"
                :rules="[
                  (val) =>
                    val === formData.email || 'Os E-mails dever sem iguais!',
                ]"
                label="Confirmar e-mail"
              />
            </div>
            <div
              class="col-12 q-pa-xs"
              :class="tab == 'registrar' && 'col-md-6'"
            >
              <q-input
                v-model="formData.password"
                dense
                class="q-mb-md"
                type="password"
                :rules="[
                  (val) => !!val || 'Campo obrigatório!',
                  (val) =>
                    (val.length >= 6 && val.length <= 20) ||
                    'Entre 6 e 20 caracteres!',
                ]"
                label="Senha"
              />
            </div>
            <div class="col-12 col-md-6 q-pa-xs">
              <q-input
                v-model="formData.passwordConfirmation"
                dense
                class="q-mb-md"
                type="password"
                :rules="[
                  (val) =>
                    val === formData.password || 'A senha deve ser igual!',
                ]"
                label="Confirmar senha"
              />
            </div>
            <div align="right">
              <q-btn color="primary" type="submit" :label="tab" dense />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-form>
      <!-- <section id="firebaseui-auth-container" flat></section> -->
    </q-card>

    <q-dialog v-model="recoverDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Informe seu e-mail</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="emailRecover"
            autofocus
            :rules="[
              (val) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                'Invalid email format!',
            ]"
            @keyup.enter="recoverDialog = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            :disable="!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRecover)"
            flat
            label="Recuperar"
            @click="sendRecoverEmail"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
export default {
  data() {
    return {
      tab: "login",
      user: null,
      googleAcesso: false,
      recoverDialog: false,
      emailRecover: "",
      formData: {
        name: "",
        email: "",
        emailConfirmation: "",
        password: "",
        passwordConfirmation: "",
      },
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$q.loading.show();
        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        });
      } else {
        this.$q.loading.show();
        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        });
      }
    });
  },
  methods: {
    ...mapActions("auth", [
      "registerUser",
      "loginUser",
      "loginUserWithGoogleAuth",
      "loginUserWithFacebookAuth",
      "recoverPasswordWithEmail",
    ]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else if (this.tab == "registrar") {
        this.registerUser(this.formData);
      }
    },
    loginWithFacebook() {
      this.loginUserWithFacebookAuth();
    },
    loginWithGoogle() {
      this.loginUserWithGoogleAuth();
    },
    sendRecoverEmail() {
      this.recoverPasswordWithEmail({ email: this.emailRecover });
      this.emailRecover = "";
    },
    login() {
      var vm = this;
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      // var ui = new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            vm.user = authResult.user;
            firebase
              .auth()
              .currentUser.updateProfile()
              .then((res) => {
                vm.$router.go();
              });
          },
          signInFailure: function (error) {
            console.log("signInFailure", error);
            alert(error.message);
            vm.$router.go();
          },
        },
        autoUpgradeAnonymousUsers: true,
        // signInFlow: "popup",
        // signInSuccessUrl: "/#/todo",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      };
      // ui.start("#firebaseui-auth-container", uiConfig);
    },
    logout() {
      var vm = this;
      this.user = undefined;
      if (!firebase.auth().currentUser) {
        alert("signOut 1", this.user);
        return;
      }
      firebase
        .auth()
        .signOut()
        .then(function (res) {
          vm.login();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.login();
  },
};
</script>

<style lang="scss">
.login-card {
  max-width: 600px;
}
</style>
