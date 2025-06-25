document.addEventListener('DOMContentLoaded', function() {
  // Функция для получения и обновления цены золота
  function updateGoldPrice() {
    fetch('https://api.gold-api.com/price/XAU')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Конвертация из тройских унций в граммы (1 тройская унция = 31.1034768 грамм)
        const pricePerOunce = data.price;
        const pricePerGram = pricePerOunce / 31.1034768;
        
        // Округляем до 2 знаков после запятой
        const roundedPrice = pricePerGram.toFixed(2);
        
        // Обновляем элемент на странице
        const goldPriceElement = document.getElementById('gold_price');
        if (goldPriceElement) {
          goldPriceElement.textContent = roundedPrice;
        }
      })
      .catch(error => {
        console.error('Error fetching gold price:', error);
        const goldPriceElement = document.getElementById('gold_price');
        if (goldPriceElement) {
          goldPriceElement.textContent = 'Error';
        }
      });
  }

  // Вызываем функцию сразу при загрузке
  updateGoldPrice();
  
  // Обновляем цену каждые 60 секунд (опционально)
  setInterval(updateGoldPrice, 60000);
});