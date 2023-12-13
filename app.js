const quizData = [
  ["Comment se nomme le meilleur ami de Bob l'Éponge ?", ['Carlo', 'Patrick', 'Sandy'], 'Patrick'],
  ["Dans quelle ville habite Bob l'Éponge ?", ['Bikini Bottom', 'Aqua Land', 'Bathsuit top'], 'Bikini Bottom'],
  ["Quel est le travail de Bob l'Éponge ?", ['laveur de voiture', 'cuisinier', 'musicien'], 'cuisinier'],
  ["Quel animal est Gary, l'animal de compagnie de Bob l'Éponge ?", ['Oursin', 'Hippocampe', 'escargot'], 'escargot'],
];

// select html elements
const questContainer = document.querySelector('.questions-block');
const questForm = document.querySelector('#questions');
const scoreParagraph = document.querySelector('.score');

// generate html elements
quizData.forEach((question, id) => {
  const questBlock = document.createElement('article');
  questBlock.classList.add('quest-block');

  const questTitle = document.createElement('h2');
  questTitle.innerText = question[0];
  questTitle.id = `quest${id}`;

  const optionBlock = document.createElement('div');
  optionBlock.classList.add('options');

  question[1].forEach((option, id) => {
    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.id = option.replace(' ', '-');
    optionInput.value = option;
    optionInput.innerText = option;
    optionInput.name = questTitle.id;

    if (!id % 3) optionInput.required = true;

    const optionLabel = document.createElement('label');
    optionLabel.innerText = option;
    optionLabel.setAttribute('for', optionInput.id);

    optionBlock.append(optionInput, optionLabel);
  });

  questBlock.append(questTitle, optionBlock);

  questContainer.appendChild(questBlock);
});

// control answers
function getAnswers(target) {
  const answers = new Map();

  Array.from(target).forEach(el => {
    if (el.tagName !== 'INPUT') return;
    if (el.checked === false) return;
    answers.set(el.name, el.value);
  });

  return answers;
}

// calcul score
function calcScore(answers, rightAnswers) {
  let score = 0;

  for (let i = 0; i < answers.size; i++) {
    questContainer.children[i].children[0].classList.remove('false', 'true');
    if (answers.get(`quest${i}`) !== rightAnswers[i][2]) {
      questContainer.children[i].children[0].classList.add('false');
      continue;
    }
    questContainer.children[i].children[0].classList.add('true');
    score++;
  }

  return score;
}

// Form listener
questForm.addEventListener('submit', e => {
  e.preventDefault();

  const formAnswers = getAnswers(e.target);

  let score = calcScore(formAnswers, quizData);

  scoreParagraph.innerText = `Votre score est de ${score}.`;
});
