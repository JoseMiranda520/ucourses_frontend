<template>
  <div class="body-profile">
    <section class="section1">
      <h1>Resultados de exámenes</h1>
    </section>
    <section class="section2">
      <table>
        <tr>
          <th class="t-header">Curso</th>
          <th class="t-header">Respuestas correctas</th>
          <th class="t-header">Estado</th>
        </tr>
        <tr>
          <td>Python Basico</td>
          <td>
            {{ this.python_basico_correctas }}
          </td>
          <!-- <td
            v-if="this.python_basico_estado == 'REPROBADO'"
            style="color: red; font-weight: bold"
          >
            {{ this.python_basico_estado }}
          </td> -->
          <!-- <td
            v-else-if="this.python_basico_estado == 'APROBADO'"
            style="color: green; font-weight: bold"
          >
            {{ this.python_basico_estado }}
          </td> -->
          <!-- <td v-else style="color: grey; font-weight: bold">
            {{ this.python_basico_estado }}
          </td> -->
        </tr>
        <tr>
          <td>Python Intermedio</td>
          <td>
            {{ this.python_intermedio_correctas }}
          </td>
          <!-- <td
            v-if="this.python_intermedio_estado == 'REPROBADO'"
            style="color: red; font-weight: bold"
          >
            {{ this.python_intermedio_estado }}
          </td>
          <td
            v-else-if="this.python_intermedio_estado == 'APROBADO'"
            style="color: green; font-weight: bold"
          >
            {{ this.python_intermedio_estado }}
          </td>
          <td v-else style="color: grey; font-weight: bold">
            {{ this.python_intermedio_estado }}
          </td> -->
        </tr>
        <tr>
          <td>Python Avanzado</td>
          <td>
            {{ this.python_avanzado_correctas }}
          </td>
          <!-- <td
            v-if="this.python_avanzado_estado == 'REPROBADO'"
            style="color: red"
          >
            {{ this.python_avanzado_estado }}
          </td>
          <td
            v-else-if="this.python_avanzado_estado == 'APROVADO'"
            style="color: green"
          >
            {{ this.python_avanzado_estado }}
          </td>
          <td v-else style="color: grey; font-weight: bold">
            {{ this.python_avanzado_estado }}
          </td> -->
        </tr>
      </table>
    </section>
  </div>
</template>

<script defer>
export default {
  name: "profile",

  created() {},

  data() {
    return {
      name: sessionStorage.getItem("username"),
      python_basico_correctas: 0,
      python_basico_estado: "NO REALIZADO",
      python_intermedio_correctas: 0,
      python_intermedio_estado: "NO REALIZADO",
      python_avanzado_correctas: 0,
      python_avanzado_estado: "NO REALIZADO",
    };
  },
  methods: {
    get_results() {
      // OBTENCION DE DATOS DEL CURSO BASICO
      this.$axios
        .get(this.$utils.api_backend + "user-answers/?course=1", {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            var c1 = response.data.detail;

            c1.forEach((element) => {
              if (element.fields.is_correct == true) {
                this.python_basico_correctas += 1;
              }
            });

            if (this.python_basico_correctas >= 3) {
              this.python_basico_estado = "APROBADO";
            } else {
              this.python_basico_estado = "REPROBADO";
            }
          } else if (response.data.type == "error") {
            this.notification("python basico" + response.data.detail);
          } else {
            this.notification("Algo esta salio mal, contacta al administrador");
          }
        })
        .catch((error) => {
          this.notification(error.message);
        });

      // OBTENCION DE DATOS DE CURSO INTERMEDIO

      this.$axios
        .get(this.$utils.api_backend + "user-answers/?course=2", {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            var c2 = response.data.detail;

            c2.forEach((element) => {
              if (element.fields.is_correct == true) {
                this.python_intermedio_correctas += 1;
              }
            });

            if (this.python_intermedio_correctas >= 2) {
              this.python_intermedio_estado = "APROBADO";
            } else {
              this.python_intermedio_estado = "REPROBADO";
            }
          } else if (response.data.type == "error") {
            this.notification("python intermedio" + response.data.detail);
          } else {
            this.notification("Algo esta salio mal, contacta al administrador");
          }
        })
        .catch((error) => {
          this.notification(error.message);
        });

      // OBTENCION DE DATOS DE CURSO AVANZADO
      this.$axios
        .get(this.$utils.api_backend + "user-answers/?course=3", {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            var c2 = response.data.detail;

            c2.forEach((element) => {
              if (element.fields.is_correct) {
                this.python_avanzado_correctas += 1;
              }
            });

            if (this.python_avanzado_correctas >= 3) {
              this.python_avanzado_estado = "APROBADO";
            } else {
              this.python_avanzado_estado = "REPROBADO";
            }
          } else if (response.data.type == "error") {
            this.notification("python avanzado: " + response.data.detail);
          } else {
            this.notification("Algo esta salio mal, contacta al administrador");
          }
        })
        .catch((error) => {
          this.notification(error.message);
        });
    },
    notification(text) {
      this.$q.notify({
        message: text,
        icon: "announcement",
        color: "red",
      });
    },
  },
  mounted() {
    this.get_results();
  },
};
</script>
<style scoped>
.body-profile {
  background-color: antiquewhite;

  height: 100vh;
}

table {
  width: 100%;
  border: 1px solid orangered;
  font-size: 2em;
  background-color: white;
  text-align: left;
  padding: 0% 0.5%;
}

th,
td {
  /* border-radius: 2em; */
  border-bottom: 1px solid orangered;
  padding: 0%;
}
th {
  color: white;
}
.section1 {
  width: auto;
  margin: 0px;
  padding: 0% 5%;
  text-align: center;
}
.section2 {
  width: auto;
  padding: 5% 0%;
  text-align: center;
}
.image-profile {
  margin: 0%;
}
.t-header {
  background-color: orangered;
  padding-left: 2%;
}
</style>
