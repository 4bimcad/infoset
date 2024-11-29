document.addEventListener('DOMContentLoaded', function () {
    const goldPriceElem = document.getElementById('gold_price_online');
    const goldPricePerGramElem = document.getElementById('gold_price_online_2');
    const updateTimeElem = document.getElementById('update_time');

    // Функция для обновления цены на золото и времени
    async function fetchPrices() {
        try {
            // Запрос цены на золото
            const goldResponse = await fetch('https://api.gold-api.com/price/XAU');
            if (!goldResponse.ok) {
                throw new Error(`HTTP error! Status: ${goldResponse.status}`);
            }

            const goldData = await goldResponse.json();

            // Проверка наличия данных
            if (!goldData.price || !goldData.updatedAt) {
                throw new Error('API response missing required data.');
            }

            // Обновляем цену на золото
            const goldPrice = goldData.price;
            goldPriceElem.textContent = `${goldPrice.toFixed(2)} USD/oz`;

            // Рассчитываем цену золота за грамм (1 унция = 31.1035 грамма)
            const goldPricePerGram = (goldPrice / 31.1035).toFixed(2);
            goldPricePerGramElem.textContent = `${goldPricePerGram} USD/g`;

            // Обновляем время
            const updatedAt = new Date(goldData.updatedAt).toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit'
            });
            updateTimeElem.textContent = `Última actualización de Precios: ${updatedAt} (Hora de Nueva York)`;

        } catch (error) {
            console.error('Error getting gold price:', error);
            goldPriceElem.textContent = 'Error loading price';
            goldPricePerGramElem.textContent = 'Error loading price per gram';
            updateTimeElem.textContent = 'Error loading time';
        }
    }

    // Обновляем данные при загрузке страницы
    fetchPrices();
});
