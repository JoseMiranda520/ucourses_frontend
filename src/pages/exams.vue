<template>
  <div class="body-exams">
    <section class="section1">
      <h1>EXÁMENES</h1>
    </section>
    <section class="section2">
      <div
        class="exam-box"
        v-for="link in exams_link"
        :key="link.pk"
        v-bind="link"
      >
        <img
          loading="lazy"
          class="logo-python"
          src="../assets/logo-python.png"
          alt=""
        />
        <h5 class="title">{{ link.fields.title }}</h5>
        <!-- <p>Tiempo limite: {{ link.fields.time }}</p> -->
        <p>
          Mínimo de preguntas correctas:
          {{ link.fields.minimun_correct_answers }}
        </p>
        <router-link
          style="
            text-decoration: none;
            color: white;
            background-color: green;
            padding: 2% 5%;
          "
          class=".r-link"
          v-if="link.pk == 1"
          to="/basico"
        >
          Realizar Examen
        </router-link>
        <router-link
          style="
            text-decoration: none;
            color: white;
            background-color: green;
            padding: 2% 5%;
          "
          class=".r-link"
          v-if="link.pk == 2"
          to="/intermedio"
        >
          Realizar Examen
        </router-link>
        <router-link
          style="
            text-decoration: none;
            color: white;
            background-color: green;
            padding: 2% 5%;
          "
          class=".r-link"
          v-if="link.pk == 3"
          to="/avanzado"
        >
          Realizar Examen
        </router-link>
      </div>
    </section>
  </div>
</template>

<script defer>
export default {
  name: "exam",

  created() {},

  data() {
    return {
      exams_link: [],
    };
  },
  methods: {
    exams() {
      this.$axios
        .get(this.$utils.api_backend + "exams/", {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            this.exams_link = response.data.detail;
          } else if (response.data.type == "error") {
            this.notification(response.data.detail);
          } else {
            this.notification("Algo esta salio mal, contacta al administrador");
          }
        })
        .catch((error) => {
          "PAGE ERROR: ", error;
          this.notification(error.message);
        });
    },
  },
  mounted() {
    this.exams();
  },
};
</script>
<style scoped>
h1 {
  color: orangered;
}

.title {
  color: orangered;
}

.section1 {
  width: auto;
  margin: 0px;
  padding: 0% 5%;
  text-align: center;
}
.exam-box {
  background-color: white;
  width: 30%;
  display: inline-block;
  margin: 0% 1%;
  text-align: center;
  border-radius: 1em;
}

.r-link {
  width: 30%;
  color: black;
}
.r-link > h5 {
  color: orangered;
  font-weight: bold;
  margin: 4% 0%;
}
.r-link > p {
  color: black;
}
</style>
