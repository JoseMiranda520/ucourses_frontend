<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-6">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Menú </q-toolbar-title>

        <div>Hola {{ this.username }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <q-item clickable tag="a" @click="this.$router.push('/index')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Inicio</q-item-label>
            <q-item-label caption> regresar al inicio </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" @click="this.$router.push('/viajes')">
          <q-item-section avatar>
            <q-icon name="drive_eta" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Viajes</q-item-label>
            <q-item-label caption> Gestión de viajes </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" href="http://127.0.0.1:8004/admin/">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
            <q-item-label caption> Administrar usuarios </q-item-label>
          </q-item-section>
        </q-item>

          {{this.$utils.authenticated}}
        <q-item clickable tag="a" @click="this.$router.push('/'), this.$utils.authenticated = false">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption> Cerrar Sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      username: sessionStorage.getItem("username"),
    };
  },
});
</script>
