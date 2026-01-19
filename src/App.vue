<script setup>
import StatsBar from './components/StatsBar.vue';
import { ref, onMounted } from 'vue';
import { generateQuestion } from './services/quizEngine';
import { loadProgress, saveProgress, updateProgress } from './services/storage';



const vocab = ref([]);
const question = ref(null);
const feedback = ref(null);
const progress = ref(loadProgress());

onMounted(async () => {
  const res = await fetch('/vocab.json');
  vocab.value = await res.json();
  nextQuestion();
});

function nextQuestion() {
  question.value = generateQuestion(vocab.value, progress.value);
  
  feedback.value = null;
}

function answer(option) {
  const isCorrect = option === question.value.correct;
  feedback.value = isCorrect ? '✅ Correcto' : '❌ Incorrecto';

  updateProgress(
    progress.value,
    question.value.word.id,
    isCorrect
  );

  progress.value.lastWords.push(question.value.word.id);
  if (progress.value.lastWords.length > 5) {
    progress.value.lastWords.shift();
  }

  saveProgress(progress.value);
}

</script>

<template>
  <h1>VocApp</h1>

  <StatsBar
  :stats="progress.stats"
  :total="vocab.length"
  />


  <div v-if="question">
    <p style="font-size: 2rem;">
      {{ question.word.it }}
    </p>

    <div>
      <button
        v-for="opt in question.options"
        :key="opt"
        @click="answer(opt)"
        style="display:block; margin:0.5rem 0;"
      >
        {{ opt }}
      </button>
    </div>

    <p v-if="feedback">{{ feedback }}</p>

    <button v-if="feedback" @click="nextQuestion">
      Siguiente
    </button>
  </div>
</template>
