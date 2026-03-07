async function analyzeChart(){

const fileInput = document.getElementById("imageInput")
const result = document.getElementById("result")

if(!fileInput.files.length){
result.innerText="Upload a chart first"
return
}

result.innerText="Analyzing chart..."

const file = fileInput.files[0]
const reader = new FileReader()

reader.onload = async function(){

const base64Image = reader.result.split(",")[1]

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_API_KEY"
},

body:JSON.stringify({

model:"gpt-4o",

messages:[
{
role:"system",
content:"You are a professional forex analyst. Analyze the chart image and return trend, signal (BUY SELL NO TRADE), entry, stop loss, take profit, and reason."
},

{
role:"user",
content:[
{type:"text",text:"Analyze this forex chart."},
{
type:"image_url",
image_url:{url:`data:image/png;base64,${base64Image}`}
}
]
}

]

})

})

const data = await response.json()

result.innerText = data.choices[0].message.content

}

reader.readAsDataURL(file)
}