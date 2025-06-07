document.addEventListener('DOMContentLoaded', function() {
  const goldPriceElem = document.getElementById('gold-price');
  const silverPriceElem = document.getElementById('silver-price');
  const updateTimeElem = document.getElementById('update-time');
  const buyLink = document.getElementById('buy-link');

  // Получаем единицу измерения из localStorage или по умолчанию 'oz'
  let unit = localStorage.getItem('unit') || 'oz';

  // Функция для обновления цен и времени
  async function fetchPrices() {
    try {
      // Запрос цен на золото и серебро
      const goldResponse = await fetch('https://api.gold-api.com/price/XAU');
      const goldData = await goldResponse.json();
      const silverResponse = await fetch('https://api.gold-api.com/price/XAG');
      const silverData = await silverResponse.json();

      // Определяем коэффициент для перевода в граммы
      const ounceToGram = 31.1035;

      // Форматируем цены
      let goldPriceFormatted;
      let silverPriceFormatted;
      if (unit === 'oz') {
        goldPriceFormatted = `$${goldData.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /oz`;
        silverPriceFormatted = `$${silverData.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /oz`;
      } else {
        goldPriceFormatted = `$${(goldData.price / ounceToGram).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /g`;
        silverPriceFormatted = `$${(silverData.price / ounceToGram).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /g`;
      }

      // Обновляем элементы на странице
      goldPriceElem.textContent = goldPriceFormatted;
      silverPriceElem.textContent = silverPriceFormatted;

      // Обновляем время
      const updatedAt = new Date(goldData.updatedAt).toLocaleString('en-US', { 
          timeZone: 'America/New_York', 
          month: 'short', 
          day: '2-digit', 
          year: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true 
      });
      const formattedUpdatedAt = updatedAt.replace(', ', ' - ').replace(' ', ', ');
      updateTimeElem.textContent = `${formattedUpdatedAt}, NY Tiempo`;

      // Обновляем ссылку на фьючерсы
      buyLink.href = 'http://infoset.org.pe';

    } catch (error) {
      console.error('Error al obtener precios:', error);
    }
  }

  // Функция для переключения единиц измерения
  function toggleUnit() {
    unit = (unit === 'oz') ? 'g' : 'oz';
    localStorage.setItem('unit', unit); // Сохраняем выбор в localStorage
    fetchPrices(); // Перезагружаем цены с новым выбором единиц
  }

  // Устанавливаем обработчики кликов на элементы с ценами
  goldPriceElem.addEventListener('click', toggleUnit);
  silverPriceElem.addEventListener('click', toggleUnit);

  // Стили для курсора
  goldPriceElem.style.cursor = 'pointer';
  silverPriceElem.style.cursor = 'pointer';

  // Обновляем данные при загрузке страницы
  fetchPrices();

  // Обновляем данные при клике на иконку расширения
  chrome.action.onClicked.addListener(() => {
    fetchPrices();
  });
});

// Добавьте в конец вашего скрипта:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.log('SW registration failed:', err));
}

// Обработчик сообщений от Service Worker
navigator.serviceWorker.addEventListener('message', event => {
  if (event.data.type === 'PRICE_UPDATE') {
    // Обновляем данные на странице без перезагрузки
    updateUI(event.data.gold, event.data.silver);
  }
});

function updateUI(goldData, silverData) {
  // Ваша логика обновления интерфейса
  // (аналогично текущему fetchPrices())
}