// ===== SIGN UP FUNCTION =====
function signUp() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("signup-msg");

  if(!username || !email || !password){
    msg.innerText = "Please fill all fields";
    return;
  }

  if(password.length < 6){
    msg.innerText = "Password must be at least 6 characters";
    return;
  }

  msg.innerText = `Welcome ${username}! You can now analyze charts.`;
}

// ===== ANALYZE CHART FUNCTION =====
async function analyzeChart(){
  const fileInput = document.getElementById("imageInput");
  const result = document.getElementById("result");

  if(!fileInput.files.length){
    result.innerText = "Upload a chart first!";
    return;
  }

  result.innerText = "Analyzing chart...";

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function(){
    const base64Image = reader.result.split(",")[1];

    try {
      const response = await fetch("/.netlify/functions/analyze", {
        method: "POST",
        body: JSON.stringify({ chartData: base64Image }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      result.innerText = data.choices[0].message.content;

    } catch (err){
      result.innerText = "Error connecting to AI";
      console.error(err);
    }
  }

  reader.readAsDataURL(file);
}