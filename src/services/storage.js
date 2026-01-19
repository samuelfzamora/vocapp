const STORAGE_KEY = 'vocapp_progress';

function defaultProgress() {
  return {
    stats: {
      asked: 0,
      correct: 0,
      incorrect: 0
    },
    words: {},
    lastWords: []
  };
}

export function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = defaultProgress();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    const fresh = defaultProgress();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  const fresh = defaultProgress();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

export function updateProgress(progress, wordId, isCorrect) {
  progress.stats.asked++;

  if (!progress.words[wordId]) {
    progress.words[wordId] = {
      correct: 0,
      incorrect: 0,
      lastSeen: Date.now()
    };
  }

  const word = progress.words[wordId];

  if (isCorrect) {
    word.correct++;
    progress.stats.correct++;

    if (word.incorrect > 0) {
      word.incorrect--;
      progress.stats.incorrect--;
    }
  } else {
    word.incorrect++;
    progress.stats.incorrect++;
  }

  word.lastSeen = Date.now();
}
