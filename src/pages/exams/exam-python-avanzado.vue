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
              v-model="correct1"
              :val="options1.option1.value"
              :label="options1.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct1"
              :val="options1.option2.value"
              :label="options1.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct1"
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
              v-model="correct2"
              :val="options2.option1.value"
              :label="options2.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct2"
              :val="options2.option2.value"
              :label="options2.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct2"
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
              v-model="correct3"
              :val="options3.option1.value"
              :label="options3.option1.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct3"
              :val="options3.option2.value"
              :label="options3.option2.value"
            />
          </li>
          <li>
            <q-radio
              v-model="correct3"
              :val="options3.option3.value"
              :label="options3.option3.value"
            />
          </li>
        </ul>
      </div>
    </section>
    <section class="section3">
      <q-btn
        style="margin-top: 5%; margin-left: 40%"
        color="white"
        text-color="black"
        @click="this.$router.push('/exams')"
        label="Enviar respuestas"
      />
    </section>
  </div>
</template>

<script defer>
export default {
  data() {
    return {
      exam_title: "Examen de Python Avanzado",
      question1: "¿que siginifica str?",
      question2: "¿que siginifica int?",
      question3: "¿como se crea y asigna un valor a una variable?",
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
      correct1: "string",
      correct2: "int",
      correct3: "x = 'hola mundo'",
      correct4: "string",
      correct5: "string",
    };
  },
  methods: {
    async send_answers() {
      await this.$axios.post(this.$utils.api_backend + "", {
        headers: {
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
      });
    },
  },
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
