document.getElementById('chartUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    // You can use the chart data here if needed
  };
  reader.readAsDataURL(file);
});

async function analyzeChart() {
  const result = document.getElementById("result");
  result.innerHTML = "Analyzing chart...";

  const fileInput = document.getElementById('chartUpload');
  const file = fileInput.files[0];
  if (!file) {
    result.innerHTML = 'Please upload a chart image';
    return;
  }

  const formData = new FormData();
  formData.append('chartImage', file);

  try {
    const response = await fetch('/analyze-chart', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    result.innerHTML = `
      Trend: ${data.trend} <br>
      Signal: ${data.signal} <br>
      Entry: ${data.entry} <br>
      Stop Loss: ${data.stopLoss} <br>
      Take Profit: ${data.takeProfit} <br>
      Reason: ${data.reason}
    `;
  } catch (error) {
    result.innerHTML = 'Error analyzing chart';
  }
}
