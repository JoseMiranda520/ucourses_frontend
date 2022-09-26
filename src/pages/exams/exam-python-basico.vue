<template>
  <div>
    <section class="section1">
      <h1>{{ this.exam_title }}</h1>
    </section>
    <section class="section2">
      <div>
        <h5 class="title">{{ question1 }}</h5>
        <ul>
          <li>
            <q-radio
              v-model="selected1"
              :val="options1.option1.value"
              :label="options1.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected1"
              :val="options1.option2.value"
              :label="options1.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected1"
              :val="options1.option3.value"
              :label="options1.option3.value"
            />
          </li>
        </ul>
      </div>
      <!-- q2 -->
      <div>
        <h5 class="title">{{ question2 }}</h5>
        <ul>
          <li>
            <q-radio
              v-model="selected2"
              :val="options2.option1.value"
              :label="options2.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected2"
              :val="options2.option2.value"
              :label="options2.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected2"
              :val="options2.option3.value"
              :label="options2.option3.value"
            />
          </li>
        </ul>
      </div>
      <!-- q3 -->
      <div>
        <h5 class="title">{{ question3 }}</h5>
        <ul>
          <li>
            <q-radio
              v-model="selected3"
              :val="options3.option1.value"
              :label="options3.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected3"
              :val="options3.option2.value"
              :label="options3.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected3"
              :val="options3.option3.value"
              :label="options3.option3.value"
            />
          </li>
        </ul>
      </div>
      <!-- q4 -->
      <div>
        <h5 class="title">{{ question4 }}</h5>
        <ul>
          <li>
            <q-radio
              v-model="selected4"
              :val="options4.option1.value"
              :label="options4.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected4"
              :val="options4.option2.value"
              :label="options4.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected4"
              :val="options4.option3.value"
              :label="options4.option3.value"
            />
          </li>
        </ul>
      </div>
      <!-- q5 -->
      <div>
        <h5 class="title">{{ question5 }}</h5>
        <ul>
          <li>
            <q-radio
              v-model="selected5"
              :val="options5.option1.value"
              :label="options5.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected5"
              :val="options5.option2.value"
              :label="options5.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="selected5"
              :val="options5.option3.value"
              :label="options5.option3.value"
            />
          </li>
        </ul>
      </div>
    </section>
    <section class="section3">
      <q-btn
        style="margin: 5% 40%"
        color="green"
        text-color="white"
        @click="this.send_answers()"
        label="Enviar respuestas"
      />
    </section>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="green" text-color="white" />
          <span class="q-ml-sm"
            >Gracias por participar, ve a la opcion de perfil para ver los
            resultados.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="green"
            v-close-popup
            @click="this.$router.push('/exams')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script defer>
export default {
  data() {
    return {
      username: sessionStorage.getItem("username"),
      min_corrects: 2,
      total_corrects: 0,
      confirm: false,
      exam_title: "Examen de Python Básico",
      question1: "¿que siginifica str?",
      question2: "¿que siginifica int?",
      question3: "¿como se crea y asigna un valor a una variable?",
      question4: "¿como se agregan elementos a una lista?",
      question5: "¿es posible anidar listas en otras?",
      options1: {
        option1: { value: "string" },
        option2: { value: "strong" },
        option3: { value: "state rest" },
      },
      options2: {
        option1: { value: "international" },
        option2: { value: "int" },
        option3: { value: "interval" },
      },
      options3: {
        option1: { value: "str x = 'hola mundo'" },
        option2: { value: "String x = new 'hola mundo'" },
        option3: { value: "x = 'hola mundo'" },
      },
      options4: {
        option1: { value: "lista += 'elemento'" },
        option2: { value: "lista.append('elemento')" },
        option3: { value: "lista.add('elemento')" },
      },
      options5: {
        option1: { value: "Si" },
        option2: { value: "No" },
        option3: { value: "Ninguna de las anteriores" },
      },
      selected1: "",
      selected2: "",
      selected3: "",
      selected4: "",
      selected5: "",
      correct1: "string",
      correct2: "int",
      correct3: "x = 'hola mundo'",
      correct4: "lista.append('elemento')",
      correct5: "Si",
    };
  },
  methods: {
    send_answers() {
      if (
        this.selected1 == "" ||
        this.selected1 == "" ||
        this.selected3 == "" ||
        this.selected4 == "" ||
        this.selected5 == "" ||
        this.selected1 == null ||
        this.selected1 == null ||
        this.selected3 == null ||
        this.selected4 == null ||
        this.selected5 == null
      ) {
        this.notification(
          "Por favor selecciona una respuesta para cada pregunta."
        );
      } else {
        const result = [
          {
            user: parseInt(sessionStorage.getItem("id")),
            course: 1,
            exam_name: this.exam_title,
            question: this.question1,
            is_correct: this.selected1 == this.correct1 ? 1 : 0,
          },
          {
            user: parseInt(sessionStorage.getItem("id")),
            course: 1,
            exam_name: this.exam_title,
            question: this.question2,
            is_correct: this.selected2 == this.correct2 ? 1 : 0,
          },
          {
            user: parseInt(sessionStorage.getItem("id")),
            course: 1,
            exam_name: this.exam_title,
            question: this.question3,
            is_correct: this.selected3 == this.correct3 ? 1 : 0,
          },
          {
            user: parseInt(sessionStorage.getItem("id")),
            course: 1,
            exam_name: this.exam_title,
            question: this.question4,
            is_correct: this.selected4 == this.correct4 ? 1 : 0,
          },
          {
            user: parseInt(sessionStorage.getItem("id")),
            course: 1,
            exam_name: this.exam_title,
            question: this.question5,
            is_correct: this.selected5 == this.correct5 ? 1 : 0,
          },
        ];

        for (var x = 0; x <= 3; x++) {
          this.$axios
            .post(
              this.$utils.api_backend + "user-answers/",
              { result: result[x] },
              {
                headers: {
                  Authorization: "Token " + sessionStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        this.confirm = true;
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
  mounted() {},
};
</script>

<style scoped>
.title {
  color: orangered;
}
h1 {
  color: orangered;
  margin: 5% 0%;
  font-weight: bold;
}
.section1 {
  padding: 0% 5%;
  text-align: left;
}
.section2 {
  width: auto;
  padding: 0% 5%;
  text-align: left;
}
li {
  list-style: none;
}
</style>
