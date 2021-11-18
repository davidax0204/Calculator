const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
//const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const precntageButton = document.querySelector('[data-precntage]')
const plusMinusButton = document.querySelector('[data-plus-minus]')
const display = document.querySelector('[data-result-display]')

class Calculator 
{
    constructor(previousOperandTextElement, currentOperandTextElement) 
    {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
    updateClearButton()
    {
      allClearButton.innerText='C'
    }
    clear() 
    {
      allClearButton.innerText='AC'
      this.currentOperand = '0'
      this.previousOperand = ''
      this.operation = undefined
      this.previousOperation = undefined
      this.updateDisplay(true)
    }
  
    delete() 
    {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) 
    {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) 
    {
      if (this.currentOperand === '' && this.previousOperation===undefined) return
      if (this.previousOperand !== '') 
      {
        this.compute()
      }
      this.operation = operation
      if (this.currentOperand!=='')
      {
        this.previousOperand = this.currentOperand
      }
      this.currentOperand = ''
      this.resetFont = true
    }
    
    // precentageOperation()
    // {
    //   if (this.currentOperand === '') return

    //   const current = parseFloat(this.currentOperand)
    //   let computation=current/100
    //   this.currentOperand = computation
    //   this.operation = undefined
    //  // this.previousOperand = ''
    //   this.previousOperation = '%'
    //   this.previousOperand = this.currentOperand
    //   this.currentOperand = ''
    // }

    chooseSingleOperation(operation) 
    {
      //if (this.previousOperation=='%' && this.previousOperand!=operation) || (this.previousOperation=='±' &&)
      if (this.previousOperation=='%' || this.previousOperation=='±')
      {
        this.currentOperand=this.previousOperand
      }
      if (this.currentOperand === '' && this.previousOperation===undefined) return

      this.computeSpecialOperation(operation)
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
      this.resetFont = true
    }
    // choosePerctange(operation) 
    // {
    //   if (this.currentOperand === '' && this.previousOperation===undefined) return

    //   this.computeSpecialOperation(operation)
    //   this.operation = operation
    //   this.previousOperand = this.currentOperand
    //   this.currentOperand = ''
    // }
    computeSpecialOperation(operation) 
    {
      let computation
      const current = parseFloat(this.currentOperand)

      if (isNaN(current)) return
      switch(operation)
      {
        case '%': computation = current/100
            break
        case '±': computation=current*(-1)
            break
      }
      this.previousOperation=operation
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
      
    }
    compute() 
    {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)

      if (isNaN(prev) || isNaN(current) || this.previousOperation==='%' || this.previousOperation==='±') 
      {
        if (this.previousOperation==='%' || this.previousOperation==='±')
        {
          this.currentOperand=''
          this.previousOperation=undefined
        }
        return
      }

      switch (this.operation) 
      {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '×':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
      this.previousOperation=this.operation
    }
  
    getDisplayNumber(number) 
    {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay

      if (isNaN(integerDigits)) 
      {
        integerDisplay = ''
      } 
      else 
      {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) 
      {
        return `${integerDisplay}.${decimalDigits}`
      } 
      else 
      {
        return integerDisplay
      }
    }
  
    updateDisplay(resetFont=false) 
    {
      this.currentOperandTextElement.innerText =this.getDisplayNumber(this.currentOperand)
      let op = this.operation;

      if (op != null) 
      {
        
        if (op==='%' || op==='±')
        {
          op=""
        }
        this.previousOperandTextElement.innerText =`${this.getDisplayNumber(this.previousOperand)} ${op}`
      } 
      else 
      {
        if (this.previousOperand===undefined)
        {
          this.previousOperandTextElement.innerText = ''
        }
        else
        {
          this.previousOperandTextElement.innerText =`${this.getDisplayNumber(this.previousOperand)}`
        }
      }
      
      if (this.currentOperand!=='' ||this.previousOperand==='')
      {
        display.innerText = this.getDisplayNumber(this.currentOperand);
      }
      else
      {
        display.innerText = `${this.getDisplayNumber(this.previousOperand)}`
      }
      // Fixing FontSize
      if ((display.style.fontSize == "") || (resetFont == true) || (display.offsetWidth < 50)) {
        let size = 90
        display.style.fontSize = size+"px"
      }
      let newFont=fixFontSize(display.style.fontSize,display.offsetWidth)
      display.style.fontSize = newFont
    }
}

function fixFontSize(fontSizePrev, offsetWidth) {
  const maxSizePrev = 300;
  let newFont = "10"
  let newFontFix
  let fontSize = fontSizePrev.toString().replace("px","")
  if (offsetWidth > maxSizePrev) {
    newFont = fontSize
    newFontFix = (newFont * maxSizePrev / offsetWidth)
  } else 
    newFontFix = (fontSize * 300 / 300)
    if (newFontFix > 90)
      newFontFix = 90
  return parseFloat(newFontFix).toFixed(0) +'px'
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
numberButtons.forEach(button => 
{
  button.addEventListener('click', () => 
  {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    calculator.updateClearButton()
  })
})
for (let i = 0; i < operationButtons.length; ++i) {
  operationButtons[i].classList.add("data-operation");
}

operationButtons.forEach(button => 
{
  button.addEventListener('click', () => 
  {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => 
{
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => 
{
  calculator.clear()
  calculator.updateDisplay()
})
allClearButton.classList.add("data-single-operation")
// deleteButton.addEventListener('click', button => 
// {
//   calculator.delete()
//   calculator.updateDisplay()
// })

precntageButton.addEventListener('click',button=>
{
  calculator.chooseSingleOperation('%')
  calculator.updateDisplay()
})
precntageButton.classList.add("data-single-operation")

plusMinusButton.addEventListener('click',button=>
{
  calculator.chooseSingleOperation('±')
  calculator.updateDisplay()
})
plusMinusButton.classList.add("data-single-operation")