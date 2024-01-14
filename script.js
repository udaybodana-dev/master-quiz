const quizMain = document.getElementById('quiz-main')
const resultBox = document.getElementById('result-box')
const qText = document.getElementById('q-text')
const optionsBox = document.getElementById('options-box')
const qCount = document.getElementById('q-count')
const timeLeftNode = document.getElementById('time-left')
const progress = document.getElementById('progress-inner')
const nextBtn = document.getElementById('next-btn')
const finalScore = document.getElementById('score-val')
const bestScoreNode = document.getElementById('best-score')

const masterData = [
  {
    q: 'Which property is used to change font family?',
    o: ['font-style', 'font-family', 'text-style', 'font-size'],
    a: 'font-family'
  },
  {
    q: 'What does HTML stand for?',
    o: [
      'Hyper Link Text',
      'Hyper Text Markup',
      'High Tool Mark',
      'Hyper Task Mode'
    ],
    a: 'Hyper Text Markup'
  },
  {
    q: 'Which JS keyword is most secure for constants?',
    o: ['var', 'let', 'const', 'fix'],
    a: 'const'
  },
  {
    q: 'Which company developed React?',
    o: ['Google', 'Apple', 'Meta', 'Amazon'],
    a: 'Meta'
  },
  {
    q: 'Inside which HTML tag do we put JS?',
    o: ['<js>', '<scripting>', '<script>', '<javascript>'],
    a: '<script>'
  },
  {
    q: "How do you Write 'Hello' in an alert box?",
    o: ["msg('Hello')", "alert('Hello')", "print('Hello')", "log('Hello')"],
    a: "alert('Hello')"
  },
  {
    q: 'Which operator is used for strict equality?',
    o: ['==', '=', '===', '!=='],
    a: '==='
  },
  {
    q: 'Which event occurs when a user clicks?',
    o: ['onhover', 'onclick', 'onmouse', 'onpress'],
    a: 'onclick'
  },
  {
    q: 'How to start a FOR loop?',
    o: ['for (i=0;i<5)', 'for i=1 to 5', 'for (i=0;i<5;i++)', 'foreach i in 5'],
    a: 'for (i=0;i<5;i++)'
  },
  {
    q: 'Which is a valid variable name in JS?',
    o: ['2names', 'first-name', 'first_name', '@name'],
    a: 'first_name'
  }
]

let currentIndex = 0
let score = 0
let timer
let sec = 15
let shuffled = []

function init () {
  shuffled = masterData.sort(() => Math.random() - 0.5)
  bestScoreNode.innerText = localStorage.getItem('quiz_best') || 0
  loadQuestion()
}

function loadQuestion () {
  resetState()
  const currentObj = shuffled[currentIndex]
  qText.innerText = currentObj.q
  qCount.innerText = currentIndex + 1
  progress.style.width = ((currentIndex + 1) / shuffled.length) * 100 + '%'

  currentObj.o.forEach(opt => {
    const btn = document.createElement('div')
    btn.classList.add('option')
    btn.innerText = opt
    btn.onclick = () => checkAns(btn, opt)
    optionsBox.appendChild(btn)
  })

  startTimer()
}

function resetState () {
  clearInterval(timer)
  sec = 15
  timeLeftNode.innerText = sec
  optionsBox.innerHTML = ''
  nextBtn.disabled = true
}

function startTimer () {
  timer = setInterval(() => {
    sec--
    timeLeftNode.innerText = sec
    if (sec <= 0) {
      clearInterval(timer)
      autoReveal()
    }
  }, 1000)
}

function checkAns (el, choice) {
  clearInterval(timer)
  const correct = shuffled[currentIndex].a
  const all = document.querySelectorAll('.option')
  all.forEach(o => (o.onclick = null))

  if (choice === correct) {
    el.classList.add('correct')
    score++
  } else {
    el.classList.add('wrong')
    revealCorrect(all, correct)
  }
  nextBtn.disabled = false
}

function autoReveal () {
  const correct = shuffled[currentIndex].a
  const all = document.querySelectorAll('.option')
  all.forEach(o => {
    o.onclick = null
    if (o.innerText === correct) o.classList.add('correct')
    else o.classList.add('wrong')
  })
  nextBtn.disabled = false
}

function revealCorrect (list, ans) {
  list.forEach(o => {
    if (o.innerText === ans) o.classList.add('correct')
  })
}

function next () {
  currentIndex++
  if (currentIndex < shuffled.length) loadQuestion()
  else finish()
}

function finish () {
  quizMain.classList.add('hidden')
  resultBox.classList.remove('hidden')
  finalScore.innerText = `${score} / ${shuffled.length}`

  const best = localStorage.getItem('quiz_best') || 0
  if (score > best) localStorage.setItem('quiz_best', score)
}

nextBtn.onclick = next

init()