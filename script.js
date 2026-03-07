// SIGNUP
function signUp() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("signup-msg");

  if(!username || !email || !password){ msg.innerText="Fill all fields"; return; }
  if(password.length<6){ msg.innerText="Password at least 6 chars"; return; }

  msg.innerText = `Welcome ${username}! You can now analyze charts.`;
  document.getElementById("chartSection").style.display="block";
}

// DRAG & DROP
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("imageInput");

dropZone.addEventListener("click", ()=> fileInput.click());
dropZone.addEventListener("dragover", e=> { e.preventDefault(); dropZone.classList.add("dragover"); });
dropZone.addEventListener("dragleave", e=> { dropZone.classList.remove("dragover"); });
dropZone.addEventListener("drop", e=> {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  fileInput.files = e.dataTransfer.files;
});

// ANALYZE
async function analyzeChart(){
  const result = document.getElementById("result");
  const signalBar = document.getElementById("signalBar");

  if(!fileInput.files.length){ result.innerText="Upload chart first!"; return; }
  result.innerText="Analyzing chart...";
  signalBar.innerText="";
  signalBar.style.background="";

  const reader = new FileReader();
  reader.onload = async function(){
    const base64Image = reader.result.split(",")[1];

    try {
      const response = await fetch("/.netlify/functions/analyze", {
        method:"POST",
        body: JSON.stringify({ chartData: base64Image }),
        headers: { "Content-Type":"application/json" }
      });
      if(!response.ok){ result.innerText="Error connecting to AI"; return; }

      const data = await response.json();
      const message = data.choices[0].message.content;
      result.innerText = message;

      // SIGNAL COLORING
      let signal = message.toUpperCase().includes("BUY") ? "BUY" :
                   message.toUpperCase().includes("SELL") ? "SELL" : "NO TRADE";
      let color = signal=="BUY"?"green": signal=="SELL"?"red":"yellow";

      signalBar.style.background=color;
      signalBar.innerText = signal;

    } catch(err){ result.innerText="Error connecting to AI"; console.error(err); }
  }
  reader.readAsDataURL(fileInput.files[0]);
}