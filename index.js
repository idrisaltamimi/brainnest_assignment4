const screenTextElement = document.querySelector('.screen')
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.querySelector('.clear')
const signButton = document.querySelector('.sign')
const percentageButton = document.querySelector('.percentage')
const deleteButton = document.querySelector('.delete')
const equalsButton = document.querySelector('.equals')
let previousOperand = ''
let currentOperand = ''
let currentOperator = ''

const updateScreen = () => {
  if (currentOperand === '' && previousOperand === '') return
  else if (currentOperand.toString().length > 9) {
    currentOperand = currentOperand.toString().slice(0, 9)
  }
  return screenTextElement.innerText = currentOperand
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
  switch (currentOperator) {
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
      if (previous / current === Infinity) {
        result = 'Oops!'
        break
      }
      result = previous / current
      break
    default:
      return
  }
  if (result.toString().length > 9) {
    currentOperand = parseFloat(result).toExponential(2)
    return previousOperand = ''
  }
  currentOperand = result
  previousOperand = ''
}

const operate = (operatorValue) => {
  currentOperator = operatorValue
  if (currentOperand === '') return
  if (previousOperand !== '') {
    compute()
    updateScreen()
  }
  previousOperand = currentOperand
  currentOperand = ''
}

// lastDigit variable gets last digit when adding a negative sign to a 9 digits long number
let lastDigit = ''
const addSign = () => {
  const current = currentOperand.toString()
  if (current === '') return
  else if (current.length === 9 && !current.includes('-')) {
    lastDigit = current.slice(-1)
    currentOperand = '-' + current.slice(0, -1)
  } else {
    if (current.length === 9 && lastDigit !== '') {
      currentOperand = current * -1 + lastDigit
    } else {
      lastDigit = ''
      currentOperand = current * -1
    }
  }
  return updateScreen()
}

const addPercentage = () => {
  currentOperand = currentOperand / 100
  updateScreen()
}

const getResult = () => {
  compute()
  updateScreen()
}

const deleteDigit = () => {
  if (currentOperand.toString().length === 1) {
    currentOperand = ''
    return screenTextElement.innerText = 0
  }
  currentOperand = currentOperand.toString().slice(0, -1)
  updateScreen()
}

const clearScreen = () => {
  currentOperand = ''
  previousOperand = ''
  currentOperator = ''
  screenTextElement.innerText = 0
}

const copyResult = () => {
  navigator.clipboard.writeText(screenTextElement.innerText)
  const clipboardText = document.createElement('h1')
  clipboardText.innerText = 'Copied to clipboard'
  clipboardText.setAttribute('style', 'position: absolute; top: 0; left: 10px;')
  document.body.appendChild(clipboardText)
  setTimeout(() => {
    document.body.removeChild(clipboardText)
  }, 2000)
}

const handleKeyEvents = (keyValue, callback) => {
  document.addEventListener('keydown', event => {
    console.log(event.key)
    if (event.key === keyValue) {
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

signButton.addEventListener('click', addSign)

percentageButton.addEventListener('click', addPercentage)
handleKeyEvents('%', addPercentage)

equalsButton.addEventListener('click', getResult)
handleKeyEvents('Enter', getResult)

deleteButton.addEventListener('click', deleteDigit)
handleKeyEvents('Backspace', deleteDigit)

clearButton.addEventListener('click', clearScreen)
handleKeyEvents('Escape', clearScreen)

screenTextElement.addEventListener('click', copyResult)