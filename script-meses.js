
document.getElementById('dob-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const dobInput = document.getElementById('dob').value;
  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    alert('A data de nascimento não pode ser no futuro.');
    return;
  }

  const diffInMilliseconds = today - dob;
  const monthsLived = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.4375));

  document.getElementById('result').textContent = `Você viveu aproximadamente ${monthsLived} meses.`;
});
