<script setup>
import { computed } from 'vue';

const direction = ref('it-es'); // 'it-es' | 'es-it'
 
import { resetProgress } from './services/storage';
import StatsBar from './components/StatsBar.vue';
import { ref, onMounted } from 'vue';
import { generateQuestion } from './services/quizEngine';
import { loadProgress, saveProgress, updateProgress } from './services/storage';

const selectedOption = ref(null);
const onlyFailed = ref(false);
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
  question.value = generateQuestion(
    vocab.value,
    progress.value,
    direction.value,
    onlyFailed.value
  );

  selectedOption.value = null;

  
  feedback.value = null;
}


function answer(option) {
  if (feedback.value) return;

  selectedOption.value = option;

  const isCorrect = option === question.value.correct;
  feedback.value = isCorrect ? 'correct' : 'wrong';

  updateProgress(
    progress.value,
    question.value.word.id,
    isCorrect
  );

  saveProgress(progress.value);
}



function resetAll() {
  const ok = confirm(
    '¿Seguro que quieres reiniciar todo el progreso?\nEsta acción no se puede deshacer.'
  );

  if (!ok) return;

  progress.value = resetProgress();
  nextQuestion();
}

function toggleDirection() {
  direction.value = direction.value === 'it-es' ? 'es-it' : 'it-es';
  nextQuestion();
}

function toggleFailed() {
  onlyFailed.value = !onlyFailed.value;
  nextQuestion();
}


</script>

<template>
  <h1>VocApp</h1>

  <StatsBar
  :stats="progress.stats"
  :total="vocab.length"
  />

  <div class="controls">
    <button class="secondary small" @click="resetAll">
      Reiniciar
    </button>

    <button class="secondary small" @click="toggleDirection">
      {{ direction === 'it-es' ? 'IT→ES' : 'ES→IT' }}
    </button>

    <button class="secondary small" @click="toggleFailed">
      {{ onlyFailed ? 'Normal' : 'Falladas' }}
    </button>
  </div>


  <div v-if="question">
    <p class="word">
      {{ direction === 'it-es' ? question.word.it : question.word.es }}
    </p>

    <div>
      <button
        v-for="opt in question.options"
        :key="opt"
        @click="answer(opt)"
        :class="{
          correct: feedback && opt === question.correct,
          wrong: feedback && opt === selectedOption && opt !== question.correct
        }">
        {{ opt }}
      </button>

    </div>

    <p v-if="feedback">{{ feedback }}</p>

    <button v-if="feedback" @click="nextQuestion">
      Siguiente
    </button>
  </div>
</template>
