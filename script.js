 
const cc_rating = document.getElementById('cc-rating');
const cc_star = document.getElementById('cc-star');
const cf_rating = document.getElementById('cf-rating');
const cf_tag = document.getElementById('cf-tag');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function setImg(mode){
    image1.src = `img/ecommerce_${mode}.svg`;
    image2.src = `img/infinite_${mode}.svg`;
    image3.src = `img/bot_${mode}.svg`;
}

// dark mode function
function darkmode(){
    nav.style.backgroundColor = 'rgb(0 0 0/50%)';
    textBox.style.backgroundColor = 'rgba(0,0,0,0.4)'; 
    toggleIcon.children[0].textContent = "Dark Mode";
    toggleIcon.children[1].classList.replace('fa-sun','fa-moon');
  
    setImg("dark");
 
}

// light mode function
function lightmode(){
    nav.style.backgroundColor = 'rgb(255 255 255/50%)';
    textBox.style.backgroundColor = 'rgba(255, 255, 255,0.4)'; 
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
    setImg("light");
}

// toggle themes
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme','dark');
        localStorage.setItem('theme','dark');
        darkmode();
    }else{
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('theme','light');
        lightmode();
    }
}

// Get Rating from api
async function getRating(){
    const ccurl =  'https://competitive-coding-api.herokuapp.com/api/codechef/viren_der';
    const cfurl =  'https://competitive-coding-api.herokuapp.com/api/codeforces/0x67';

    try{
        const ccresponse = await fetch(ccurl);
        const ccdata = await ccresponse.json();
        const cfresponse = await fetch(cfurl);
        const cfdata = await cfresponse.json();

        cc_rating.textContent = ccdata.rating;
        cc_star.textContent = ccdata.stars;
        cf_rating.textContent = cfdata.rating;
        cf_tag.textContent = cfdata.rank;

    }catch(err){
        console.log(err);
    }
}

toggleSwitch.addEventListener('change',switchTheme);
getRating();

const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme',currentTheme);
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        darkmode();
    }
    
}
if(window.innerWidth < 1114){
    window.alert('This Site is not made responsive, Plz visit it in desktop mode, Thx \n                                   -0x67');
}