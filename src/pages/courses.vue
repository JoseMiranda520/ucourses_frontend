<template>
  <div class="body-courses">
    <section class="section1">
      <h1>CURSOS</h1>
    </section>
    <section class="section2">
      <div
        class="course-box"
        v-for="link in courses_link"
        :key="link.pk"
        v-bind="link"
      >
        <router-link
          :to="{ name: 'anycourse', params: { id: link.pk } }"
          style="text-decoration: none"
          class="r-link"
        >
          <img
            loading="lazy"
            class="logo-python"
            src="../assets/logo-python.png"
            alt=""
          />
          <h5 class="title">{{ link.fields.title }}</h5>
          <p>Horas: {{ link.fields.duration }}.0</p>
        </router-link>
      </div>
    </section>
    <section class="section3">
      <h2>File Upload</h2>
      <hr />
      <label for=""
        >File
        <input type="file" @change="handleFileUpload($event)" />
      </label>
      <br />
      <button v-on:click="submitFile">Submit</button>
    </section>
  </div>
</template>

<script defer>
export default {
  data: () => {
    return {
      courses_link: [],
      file: "",
    };
  },
  methods: {
    courses() {
      this.$axios
        .get(this.$utils.api_backend + "courses/", {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            this.courses_link = response.data.detail;
          } else if (response.data.type == "error") {
            this.notification(response.data.detail);
          } else {
            this.notification("Algo esta salio mal, contacta al administrador");
          }
        })
        .catch((error) => {
          this.notification(error.message);
        });
    },
    user_by_id(id) {
      let username = "";
      this.$axios
        .get(this.$utils.api_backend + "user/?pk=" + id, {
          headers: {
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.data.type == "ok") {
            username = response.data.detail[0].fields.username;
            return username;
          } else if (response.data.type == "error") {
            this.notification(response.data.detail);
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
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      this.$axios
        .post(this.$utils.api_backend + "practice/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Success");
          console.log(response.data.detail);
          this.file = "";
        })
        .catch(function () {
          console.log("Failure");
        });
    },
  },
  mounted() {
    this.courses();
  },
};
</script>

<style scoped>
h1 {
  color: orangered;
}

.language-card {
  display: inline-block;
  background-color: white;
  border-radius: 1rem;
  width: max-content;
  height: min-content;
  padding: 1% 5%;
  text-align: center;
  margin: 0% 2%;
}
.language-card > .title {
  font-size: 2em;
}

.section1 {
  padding: 0% 5%;
}
.course-box {
  background-color: white;
  width: 30%;
  display: inline-block;
  margin: 0% 1%;
  text-align: center;
  border-radius: 1em;
}

.r-link {
  width: 30%;
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
