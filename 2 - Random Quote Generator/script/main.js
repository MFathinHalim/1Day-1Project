function checkQuotes() {
  fetch("https://api.kanye.rest")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('quote').textContent = `"${data.quote}"`
    });
}
