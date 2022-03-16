<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" dense>
      <q-toolbar dense>
        <q-avatar>
          <img stretch flat src="../statics/logo.png" />
        </q-avatar>
        <q-toolbar-title style="font-size: 16px" class="text-subtitle2"
          >Rastreamento de Objetos</q-toolbar-title
        >
        <div v-if="this.$route.name == 'index'">
          <q-avatar @click="logoutUser" class="cursor-pointer">
            <q-icon name="logout" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="desktop"
      elevated
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";
import { firebase } from "boot/firebase";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      visible: ref(false),
      essentialLinks: linksList,
      leftDrawerOpen,
      user: ref("OFF"),
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$q.sessionStorage.set("uid_c", user.uid);
      this.$q.sessionStorage.set("name_c", user.displayName);
    });
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
});
</script>
