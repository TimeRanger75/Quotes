import './style.css';

function show_AllQuote(datalist){
    let q_list=document.getElementById('q_list');
    for(let quotes of datalist){
        let li=document.createElement('li');
        let p=document.createElement('p');
        let q=document.createElement('q');
        li.appendChild(q);
        q.textContent+=quotes.quote;
        li.appendChild(p);
        p.textContent+=quotes.author;
        q_list.appendChild(li);
    }
}

function show_the_Quote(datalist){
    let q_list=document.getElementById('the_list');
    // for(let q of datalist){
    //     let li=document.createElement('li');
    //     li.textContent=q.quote;
    //     q_list.appendChild(li);
    // }
    let q_list2= q_list.map( (author) => author.quote.toLowerCase.has("the"))
}

function q_length(datalist){
    let length=document.getElementById('length');
    let t_lenght=[];
    for(let q of datalist){
        t_lenght.push(q.quote.length);
    }
    length.innerHTML=t_lenght.join(", ");
}


document.addEventListener('DOMContentLoaded', async()=>{
    document.getElementById('show_all_quotes').addEventListener('click', async()=>{
        let response=await fetch('/quotes.json');
        let result=await response.json();
        let data=result.quotes.sort(function(a,b){
            if(a.author.toLowerCase() < b.author.toLowerCase()) { return -1; }
            if(a.author.toLowerCase() > b.author.toLowerCase()) { return 1; }
            return 0;  
        });
        show_AllQuote(data);
    })
    document.getElementById('show_the').addEventListener('click', async()=>{
        let response=await fetch('/quotes.json');
        let result=await response.json();
        let data=result.quotes.filter(e=>e.quote.toLowerCase());
        show_the_Quote(data);
    })
    
    document.getElementById('q_length').addEventListener('click', async()=>{
        let response=await fetch('/quotes.json');
        let result=await response.json(); 
        let data=result.quotes;
        q_length(data);
    })

    document.getElementById('b_author').addEventListener('click', async()=>{
        let i_author=document.getElementById('author').value;
        let response=await fetch('/quotes.json');
        let result=await response.json(); 
        let data=result.quotes.filter(e=>e.author==i_author);
        document.getElementById('count').value=data.length;
        console.log(i_author);
    })


})