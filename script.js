// Getting the defined html element from file to append new elements to it
let container=document.getElementById('containerPage');

// create calculator container
const calculator=document.createElement('div');
calculator.classList.add('calculator')

// append calculator to container
container.appendChild(calculator)

// Create display element -> shows result
let display = document.createElement('input');
display.classList.add('display');
display.type='text';
display.id='result'
calculator.appendChild(display);

// Create buttons container
const buttonsContainer=document.createElement('div');
buttonsContainer.classList.add('buttons');
calculator.appendChild(buttonsContainer);

// define buttonLabels
const buttonLabels=[
    'MC','M+','M-','C',
    'x²','√x','1/x','+',
    "7", "8", '9', '/',
    '4', '5', '6', '*',
    "1", '2', '3', '-',
    '0', '.', '%', '=',
]

// Generate buttonlabels to create button elements
buttonLabels.forEach(label => {
    const button=document.createElement('button');
    if(label === '0' || label === '1' || label === '2' || label === '3' || label === '4' || label === '5' || label === '6' || label === '7' || label === '8' || label === '9' || label === '.'){
        button.classList.add('button')
        button.id=label;
    }else if(label === 'C'){
        button.classList.add('button')
        button.id='clear';
    }else if(label === '='){
        button.classList.add('button')
        button.id='equal';
    }else if(label === '+'){
        button.classList.add('button')
        button.classList.add('operators')
        button.id='add';
    }else if(label === '-'){
        button.classList.add('button')
        button.classList.add('operators')
        button.id='subtract';
    }else{
        button.classList.add('button');
        button.classList.add('operators')
    }
    button.textContent=label;
    buttonsContainer.appendChild(button);
})

// calculating the expression
let currentExpression = '';
let memory=0;
display.value='';

// raise alert - only numbers
const inputfield=document.getElementById('result');
inputfield.addEventListener("keypress",(event)=>{
    const value=event.key;
    if(!/[0-9]/.test(event.key) && !['(',')'].includes(event.key)){
        event.preventDefault();
        alert("Only numbers are allowed");
    }
    currentExpression+=value;
});

buttonsContainer.addEventListener('click',(event)=>{
    if (!event.target.classList.contains('button')) return;

    const value=event.target.textContent;
    
    if(value === 'C'){
        currentExpression='';
        display.value='';
    }else if(value === '='){
        try {
            // The eval() function inherently respects operator precedence which handles infinix expressions
            if(currentExpression === '1/0'){
                display.value='cannot divide by 0';
                currentExpression='';
            }else{
                currentExpression = eval(currentExpression).toString();
                display.value = currentExpression;
            }
            
          } catch (error) {
            display.value = 'Error';
            currentExpression = '';
          }
    }else if(value === 'M+'){
         memory+=parseFloat(currentExpression);
         console.log(memory); // console
         currentExpression='';
    }else if(value === 'M-'){
        memory-=parseFloat(currentExpression);
        console.log(memory); // console
        currentExpression='';
    }else if(value === 'MC'){
        memory=0;
        console.log(memory); // console      
        currentExpression=''; 
    }else if(value === 'x²'){
        const num=parseFloat(currentExpression);
        currentExpression=num*num;
        display.value=currentExpression;
    }else if(value === '√x'){
        const num=parseFloat(currentExpression);
        currentExpression=Math.sqrt(num);
        display.value=currentExpression;
    }else if(value === '1/x'){
        const num=parseFloat(currentExpression);
        currentExpression=1/num;
        display.value=currentExpression;
    }
    else{
        if (currentExpression === '' && value === '0') return; // Prevent leading zeros
        currentExpression += value;
        display.value = currentExpression;
    }
})

// create styles
const style=document.createElement('style');
style.textContent=`
.calculator{ max-width: 350px; margin: 50px auto; padding: 20px;border-radius: 15px;box-shadow: 0 4px 10px rgba(0,0,0,0.5);background-color: #190019; }
.display{ font-size: 20px;height: 60px;width: 100%;background-color: #f7f7f7;color: black;border: none;text-align: right;padding: 10px;margin-bottom: 10px;border-radius: 10px; }
.buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
.button { color: white;background-color: rgb(88, 87, 87);font-size: 14px;padding: 10px;width: 100%;border: none;border-radius: 20px;margin: 10px auto;box-shadow: -2px -1px 3px rgba(248, 248, 248,0.5); }
.operators{ background-color: rgb(248, 113, 2);color: white; }
#clear{ background-color: #522B5B; }
#equal{ background-color: rgb(0, 38, 255); }
.button:hover { background-color: #ddd; }
`;
document.head.appendChild(style);