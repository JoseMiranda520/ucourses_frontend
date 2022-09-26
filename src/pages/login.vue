<template>
  <div class="body-login">
    <div class="container">
      <div class="autenticacion">
        <h2 class="text-light-blue-8">Login</h2>
        <q-input v-model="username" label="User" />
        <br />
        <q-input v-model="password" label="Password" type="password" />
        <br />
        <q-btn
          :loading="loading4"
          @click="simulateProgress(4)"
          style="width: 150px"
        >
          Start Session
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Cargando...
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: "login",
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      progress: false,
      error_message: "",
      username: "",
      password: "",
    };
  },
  methods: {
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
      this.login();
    },
    login() {
      if (
        (this.usename !== "" && this.username !== null) ||
        (this.passsword !== "" && this.passsword !== null)
      ) {
        this.$axios
          .post(this.$utils.api_backend + "login/", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            console.log(response)
            if (response.data.token) {
              this.$utils.authenticated = true;
              this.$utils.permisos = response.data.permissions
              this.$utils.token = response.data.token
              this.$utils.username = response.data.user.username
              // sessionStorage.setItem("username", this.username);
              // sessionStorage.setItem("id", response.data.detail.id);
              // sessionStorage.setItem("token", response.data.detail.token);
              this.$router.push("/index");
            } else if (response.data.type == "error") {
              this.notification(response.data.detail);
            } else {
              this.notification(
                "Algo esta salio mal, contacta al administrador"
              );
            }
          })
          .catch((error) => {
            console.log("PAGE ERROR: ", error);
          });
      } else {
        console.log("no se enviaron las credenciales de acceso");
      }
    },
    notification(text) {
      this.$q.notify({
        message: text,
        icon: "announcement",
        color: "red",
      });
    },
  },
};
</script>
<style scoped>
.body-login {
  height: 100vh;
  width: 100vw;
  padding: 4%;
}

.container {
  /* margin: 3%; */
  padding: 1%;
  display: flex;
  border-radius: 1rem;
}

.autenticacion {
  display: inline-block;
  width: 100%;
  padding: 1% 2%;
  text-align: center;
  border-radius: 1rem;
}

.autenticacion > h2 {
  font-weight: bold;
}
</style>
