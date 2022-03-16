<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" flat>
      <div class="text-center">
        <span class="text-light-blue-9 text-bold"
          >Acesse com sua conta Google</span
        >
        <section id="firebaseui-auth-container" flat></section>
      </div>
      <!-- <div class="text-center q-pt-lg">
        <q-btn
          color="grey-8"
          icon-right="login"
          label="Acessar sem Logar"
          @click="logarSemConta()"
          class="q-pl-md"
          dense
        />
        <section id="firebaseui-auth-container" flat></section>
      </div> -->
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
export default {
  data() {
    return {
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
    if (this.$q.localStorage.getItem("loginOFF") === "S") {
      this.$router.push("/index");
    }
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
    logarSemConta() {
      this.$q.localStorage.set("loginOFF", "S");
      this.$router.push("/index");
    },
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
      } else if (this.tab == "register") {
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
      ui.start("#firebaseui-auth-container", uiConfig);
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
