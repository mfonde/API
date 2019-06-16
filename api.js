/*
application id: c0b8e081
application keys: e990099bea0c9a9ce50a928f53c7e60e	—
f55ff9d8
0db8f5af3efeab5023a02f7853eeffaa
*/

const baseURL = 'https://api.edamam.com/search';
const appId = 'c0b8e081';
const appKey = 'e990099bea0c9a9ce50a928f53c7e60e';

let url;

const include = document.getElementById('include');
const exclude = document.getElementById('exclude');
const diet = document.getElementById('diet');
const calories = document.getElementById('calories');
const form = document.querySelector('form');

const display = document.querySelector('section');
const resultDisplay = document.querySelector('.result');
let height = window.innerHeight;

form.addEventListener('submit', fetchResults);
form.addEventListener('submit', scrollDown);

function fetchResults(e){
    e.preventDefault();
    console.log(height);
    // console.log('cuisine value', cuisine.value);

    url = baseURL + "?q=" + include.value + "&app_id=" + appId + "&app_key=" + appKey + "&calories=0-" + calories.value + "&excluded=" + exclude.value + "&health" + diet.value;
    // + "&cuisineType=" + cuisine.value;

    
    // + "&cuisineType=" + cuisine.value
    // + "&dishType=" + meal.value
    
    // url = 'https://api.edamam.com/search?q=chicken&app_id=${c0b8e081}&app_key=${e990099bea0c9a9ce50a928f53c7e60e}&from=0&to=3&calories=591-722&health=alcohol-free';
    // url = baseURL + "?q=" + protein.value + "&app_id=" + appId + "&app_key=" + appKey;
    // "?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
    console.log(url);
    
    fetch(url)
    .then(function(result){
        console.log(result)
        return result.json();
    }).then(function(json){
        console.log(json);
        displayResults(json);
        // return displayResults();
    })
    // .then(function(scrollDown(displayResults)))
}

function scrollDown(e){
    window.scroll(0, height*.99);
}

function displayResults(json){
    // window.scrollBy(0, height);
    while(display.firstChild){
        display.removeChild(display.firstChild);
    }
    // while(photo.firstChild){
    //     photo.removeChild(photo.firstChild);
    // }  <-- 'photo' hasn't been defined yet. Instead, append 'photo' to 'display' below.
    let dishes = json.hits;
    if(dishes.length === 0){
        let para = document.createElement('p');
        para.textContent = 'Sorry, try something else';
        para.setAttribute('class', 'para');
        display.appendChild(para);
    } else {
        let l = dishes.length;
        let r = Math.random();
        let n = r*l;
        let f = Math.floor(n);
        
        let para = document.createElement('p');
        para.setAttribute('class', 'para');
        let dishLabel = document.createElement('p');
        dishLabel.setAttribute('class', 'label');
        let thisDish = dishes[f];
        let anch = document.createElement('a');
        anch.setAttribute('class', 'anch');
        let photo = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('class', 'img');
        // let wrapper = document.querySelector('.wrapper'); <-- not needed.use 'display.'

        para.textContent = "Your Custom Dish Is:";
        dishLabel.textContent = thisDish.recipe.label + "!";
        anch.href= thisDish.recipe.shareAs;
        anch.textContent = "Click Here To Get The Recipe!";

        if(thisDish.recipe.image.length > 0){
            img.src = thisDish.recipe.image;
            img.alt = "./assets.produce.jpg";
        }
        display.appendChild(para);
        display.appendChild(dishLabel);
        display.appendChild(photo);
        display.appendChild(anch);
        photo.appendChild(img);
        // wrapper.appendChild(photo); <-- simpler to append 'photo' to 'display,' along with 'para.'

        photo.setAttribute('class', 'photo');
        display.setAttribute('class', 'display');
    }


    // else {
    //     for(let i = 0; i < dishes.length; i++){
    //         let para = document.createElement('p');
    //         let thisDish = dishes[i];
    //         let anch = document.createElement('a');
    //         anch.href= thisDish.recipe.shareAs;
    //         anch.textContent = thisDish.recipe.label;
    //         // console.log(para);
    //         display.appendChild(para);
    //         para.appendChild(anch);
    //     }
    // }
}

