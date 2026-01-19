function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateQuestion(vocab, progress) {
  const lastWords = progress.lastWords || [];

  const unseen = vocab.filter(w => !progress.words[w.id]);
  const failed = vocab.filter(w => {
    const p = progress.words[w.id];
    return p && p.incorrect > p.correct;
  });
  const learned = vocab.filter(w => {
    const p = progress.words[w.id];
    return p && p.correct >= 3;
  });

  let pool;
  const r = Math.random();

  if (unseen.length && r < 0.5) pool = unseen;
  else if (failed.length && r < 0.85) pool = failed;
  else pool = learned.length ? learned : vocab;

  pool = pool.filter(w => !lastWords.includes(w.id));
  if (!pool.length) pool = vocab;

  const word = randomFrom(pool);
  const correct = word.es;

  const wrong = vocab
    .filter(w => w.id !== word.id)
    .map(w => w.es);

  const options = shuffle([
    correct,
    ...shuffle(wrong).slice(0, 3)
  ]);

  return { word, options, correct };
}
