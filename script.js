function signUp(){

let user=document.getElementById("username").value;

if(user==""){
document.getElementById("msg").innerText="Enter username";
return;
}

document.getElementById("msg").innerText="Account created";

document.getElementById("analyzer").style.display="block";

}

async function analyze(){

let file=document.getElementById("chart").files[0];
let result=document.getElementById("result");

if(!file){
result.innerText="Upload chart first";
return;
}

let reader=new FileReader();

reader.onload=async function(){

let base64=reader.result.split(",")[1];

let response=await fetch("/.netlify/functions/analyze",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
image:base64
})

});

let data=await response.json();

result.innerText=data.signal;

};

reader.readAsDataURL(file);

}