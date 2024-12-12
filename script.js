
document.getElementById('dob-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const dobInput = document.getElementById('dob').value;
  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    alert('A data de nascimento não pode ser no futuro.');
    return;
  }

  const unit = document.getElementById('unitbox').value;
  const diffInMilliseconds = today - dob;

  let totalUnits, unitLabel, maxUnits;

  if (unit === 'weeks') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    maxUnits = 4680; // 90 anos * 52 semanas
    unitLabel = 'Semanas';
  } else if (unit === 'months') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.4375));
    maxUnits = 1080; // 90 anos * 12 meses
    unitLabel = 'Meses';
  } else if (unit === 'years') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    maxUnits = 90; // 90 anos
    unitLabel = 'Anos';
  }

  renderChart(totalUnits, maxUnits, unitLabel);
});

function renderChart(totalUnits, maxUnits, unitLabel) {
  const chart = document.getElementById('chart');
  chart.innerHTML = ''; // Clear previous chart

  let rows, cols;
  if (unitLabel === 'Semanas') {
    rows = maxUnits / 52; // 90 anos para semanas
    cols = 52; // 52 semanas por ano
  } else if (unitLabel === 'Meses') {
    rows = maxUnits / 12; // 90 anos para meses
    cols = 12; // 12 meses por ano
  } else if (unitLabel === 'Anos') {
    rows = maxUnits; // 90 anos (1 por linha)
    cols = 1; // Apenas uma coluna por ano
  }

  // Add labels
  const yAxis = document.createElement('div');
  yAxis.classList.add('y-axis');
  for (let i = 0; i <= rows; i += 5) {
    const label = document.createElement('span');
    label.textContent = i;
    yAxis.appendChild(label);
  }
  chart.appendChild(yAxis);

  const xAxis = document.createElement('div');
  xAxis.classList.add('x-axis');
  for (let i = 1; i <= cols; i += Math.ceil(cols / 10)) {
    const label = document.createElement('span');
    label.textContent = i;
    xAxis.appendChild(label);
  }
  chart.appendChild(xAxis);

  // Create grid
  chart.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let i = 0; i < maxUnits; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    if (i < totalUnits) {
      square.classList.add('filled');
    }
    chart.appendChild(square);
  }
}
