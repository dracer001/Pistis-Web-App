const addQuestion = () => {
    const n = Number(document.getElementById('add-no').value);
    const questionParent = document.getElementById('questions')
    let x = document.getElementsByClassName('question-number')
    x = Number(x[x.length-1].value);
    for(let i=0; i<n; i++){
        y = (x+1).toString();
        const questionChild = document.createElement('div');
        questionChild.classList.add('form-group', 'question-child')
        
        let input_hidden  = document.createElement('input');
        input_hidden.type='hidden';
        input_hidden.value=y;
        input_hidden.classList.add('question-number');
        questionChild.appendChild(input_hidden);

        let div = document.createElement('div');
        div.classList.add('form-group', 'question');
        
        let label = document.createElement('label');
        label.htmlFor = 'q'+y;
        label.innerText = 'Question'+y;
        div.appendChild(label);

        let textarea  = document.createElement('textarea');
        textarea.name = 'q'+y;
        textarea.id = 'q'+y;
        textarea.required = true;
        div.appendChild(textarea);
        questionChild.appendChild(div);

        let divOption  = document.createElement('div');
        divOption.classList.add('qOptions');
        for (let i=1; i<5; i++){
            z = i.toString();
            let div = document.createElement('div');
            div.classList.add('form-group');
        
            label = document.createElement('label');
            label.htmlFor = 'q'+y+'o'+z;
            label.innerText = 'Option'+z;
            div.appendChild(label);

            let input = document.createElement('input');
            input.type = 'text';
            input.name = 'q'+y+'o'+z;
            input.id = 'q'+y+'o'+z;
            input.required = true;
            div.appendChild(input);

            divOption.appendChild(div);
        }
        div = document.createElement('div');
        div.classList.add('form-group');
    
        label = document.createElement('label');
        label.htmlFor = 'q'+y+'a';
        label.innerText = 'Answer';
        div.appendChild(label);

        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'q'+y+'a';
        input.id = 'q'+y+'a';
        input.required = true;
        div.appendChild(input);
        divOption.appendChild(div);

        questionChild.appendChild(divOption);
        let rmbtn = document.createElement('button');
        rmbtn.innerText = 'Remove question';
        rmbtn.addEventListener('click', ()=>{removeQuestion(rmbtn); return false;});
        questionChild.appendChild(rmbtn);
        questionParent.appendChild(questionChild);
        x++;
    }
}



const removeQuestion = (el) =>{
    console.log(el);
    el.parentNode.remove();
}