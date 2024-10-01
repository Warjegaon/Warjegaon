import files from './files.js';

window.onload = () => {
 getData();
}

function getData(){
 const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const file = './' + id + '.js';
 
if(id){
 import(file)
 .then(module => {createPage(module.default)})
 .catch((error) => {document.body.innerHTML = error})
}else{
 renderMain();
}}

function renderMain(){
 
 let fileArray = files.split('\n')
 .filter(n => n)
 .slice(0,10)
 .sort();

 const div = document.createElement('div');
 document.body.appendChild(div);
 div.id = 'divContents';

 for(const file of fileArray){
  
  const fileName = './' + file + '.js';
 
  import(fileName)
 .then(module => {
  const src = module.default.img;
  const head = module.default.header;
  
  const aim = document.createElement('a');
  div.appendChild(aim);
  aim.href = '?id=' + file;

  const img = document.createElement('img');
  aim.appendChild(img);
  img.src = src;
  
  const aaa = document.createElement('a');
  div.appendChild(aaa);
  aaa.href = '?id=' + file;
  aaa.innerHTML = head;
  aaa.id = 'aHead';
 })
 .catch((error) => {document.body.innerHTML = error})
 }
}

function createPage(data){
let datepl = document.createElement('div');
let header = document.createElement('h1');
let figure = document.createElement('figure');
let figcap = document.createElement('figcaption');
let figspa = document.createElement('span');
let imgsrc = document.createElement('img');
let articl = document.createElement('article');
let artspa = document.createElement('span');
let contac = document.createElement('contact');

document.title = data.header;
datepl.id = 'date';
document.body.appendChild(articl);
articl.appendChild(datepl);
articl.appendChild(header);
articl.appendChild(figure);
figure.appendChild(imgsrc);
figure.appendChild(figcap);
figcap.appendChild(figspa);

datepl.innerHTML = data.date;
header.innerHTML = data.header;
imgsrc.src = data.img;
figspa.innerHTML = 'File Photo: ';
figcap.appendChild(figspa);
figcap.innerHTML += data.caption;

let text = data.article.split('\n\n').filter(n => n);
for (let i = 0; i < text.length;i++){
let p = document.createElement('p');
articl.appendChild(p);
p.innerHTML = text[i];
 
if(i === text.length-1) p.appendChild(artspa);
}

artspa.innerHTML = '■ ■ ■';
artspa.id = 'article-end';
 
articl.appendChild(contac);
contac.innerHTML = `अशा प्रकारच्या बातम्या व घडामोडी वारजेगाव वेबसाईटवर प्रकाशित करण्यासाठी कृपया खालील ईमेलवर संपर्क साधावा.
<a href="mailto:warjegaon@gmail.com">
warjegaon@gmail.com</a>
 `;
}


function readFile(url,callback){
    fetch(url)
    .then(status)
    .then(res => res.text())
    .then(data => {callback(data)})
    .catch(error => {throw(error)});
}


function status(res) {
    if (!res.ok){throw new Error(res.statusText)}
    return res;
}