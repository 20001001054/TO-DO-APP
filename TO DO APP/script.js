let checkBoxList = document.querySelectorAll('.custom-checkbox')
let goalInput = document.querySelectorAll('.goal-input')
let error = document.querySelector('.error-label')
let progressLabel = document.querySelector('.progress-label')
let progressBar  = document.querySelector('.progress-bar')
let progressValue = document.querySelector('.progress-value');  

const allQuotes = [
    "Let's Raise the bar by completing your Goals",
    "Well begun is half done",
    "Just a step away, keep going!",
    "Woah! You just completed all the goals, time for chill🎉"
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name: '',
        completed: '',
    },
    second:{
        name: '',
        completed: '',
    },
    third:{
        name: '',
        completed: '',
    }
}
let completedgoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${completedgoalsCount /3 *100}%`
progressValue.firstElementChild.innerText = `${completedgoalsCount} /3 completed`
progressLabel.innerText = allQuotes[completedgoalsCount];

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click', () => {
        const allFieldsFilled = [...goalInput].every((input) =>{
            return input.value
        })
        if(allFieldsFilled){
        checkbox.parentElement.classList.toggle('completed');
        const inputid = checkbox.nextElementSibling.id;
        (allGoals[inputid]).completed = !(allGoals[inputid]).completed
        completedgoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
        progressValue.style.width = `${completedgoalsCount /3 *100}%`
        progressValue.firstElementChild.innerText = `${completedgoalsCount} /3 completed`
        progressLabel.innerText = allQuotes[completedgoalsCount];
        localStorage.setItem('allGoals' , JSON.stringify(allGoals))

        }else{
           progressBar.classList.add('show-error');
        }
    })
   
})

goalInput.forEach((input) =>{
    input.value =  allGoals[input.id].name;
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () =>{
        progressBar.classList.remove('show-error');
    })
    input.addEventListener('input' ,(e) =>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name = input.value;
        
        localStorage.setItem('allGoals' , JSON.stringify(allGoals))
    })
})


