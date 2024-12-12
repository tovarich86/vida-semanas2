
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

  let totalUnits, unitLabel;

  if (unit === 'weeks') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    unitLabel = 'Semanas';
  } else if (unit === 'months') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.4375));
    unitLabel = 'Meses';
  } else if (unit === 'years') {
    totalUnits = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    unitLabel = 'Anos';
  }

  renderChart(totalUnits, unitLabel);
});

function renderChart(totalUnits, unitLabel) {
  const chart = document.getElementById('chart');
  chart.innerHTML = ''; // Clear previous chart

  for (let i = 0; i < 4680; i++) { // 90 years * 52 weeks = 4680 squares max
    const square = document.createElement('div');
    square.classList.add('square');
    if (i < totalUnits) {
      square.classList.add('filled');
    }
    chart.appendChild(square);
  }
}
