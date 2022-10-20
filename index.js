const displayResultElement = document.querySelector('.operand')
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.querySelector('.clear')
const signButton = document.querySelector('.sign')
const percentageButton = document.querySelector('.percentage')
const equalsButton = document.querySelector('.equals')

let previousOperand = ''
let currentOperand = ''
let operator = ''

const updateScreen = () => {
  console.log(currentOperand.toString().length === 9)
  if (currentOperand.toString().length > 9) return
  // else if (currentOperand.toString().length > 6 && operator !== '') {
  //   return displayResultElement.innerText = parseFloat(currentOperand).toExponential(2)
  // }
  else if (currentOperand === '' && previousOperand === '') return
  return displayResultElement.innerText = currentOperand
}

const appendNumber = (num) => {
  if (num === '.' && currentOperand.toString().includes('.')) return
  currentOperand = currentOperand.toString() + num.toString()
  updateScreen()
}

const compute = () => {
  let result
  const current = parseFloat(currentOperand)
  const previous = parseFloat(previousOperand)
  if (isNaN(current) || isNaN(previous)) return
  switch (operator) {
    case '+':
      result = previous + current
      break
    case '*':
      result = previous * current
      break
    case '-':
      result = previous - current
      break
    case '/':
      if (previous / 0) {
        result = 'Oops!'
        break
      }
      result = previous / current
      break
    default:
      return
  }
  currentOperand = result
  previousOperand = ''
}

const operate = (operatorValue) => {
  operator = operatorValue
  if (currentOperand === '') return
  if (previousOperand !== '') {
    compute()
    updateScreen()
  }
  previousOperand = currentOperand
  currentOperand = ''
}

const clearScreen = () => {
  currentOperand = ''
  previousOperand = ''
  operator = ''
  displayResultElement.innerText = 0
}

const handleKeyEvents = (keyValue, callback) => {
  document.addEventListener('keydown', event => {
    if (event.key === keyValue) {
      console.log(event.key)
      callback()
    }
  })
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.innerText))
  handleKeyEvents(button.innerText, () => appendNumber(button.innerText))
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => operate(button.innerText))
  handleKeyEvents(button.innerText, () => operate(button.innerText))
})

signButton.addEventListener('click', () => {
  currentOperand = currentOperand * -1
  updateScreen()
})

//percentage Button mouse and keyboard events
percentageButton.addEventListener('click', () => {
  currentOperand = currentOperand / 100
  updateScreen()
})
handleKeyEvents('%', () => {
  currentOperand = currentOperand / 100
  updateScreen()
})

//equals Button mouse and keyboard events
equalsButton.addEventListener('click', () => {
  compute()
  updateScreen()
})
handleKeyEvents('Enter', () => {
  compute()
  updateScreen()
})

clearButton.addEventListener('click', clearScreen)

