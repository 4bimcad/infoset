document.addEventListener('DOMContentLoaded', function () {
    const goldPriceElem = document.getElementById('gold_price_online_2');
    const precioDeUsdAPenElem = document.getElementById('precio_de_usd_a_pen');
    const precioOroGramoAPenElem = document.getElementById('precio_oro_gramo_a_pen');

    // Функция для получения обменного курса USD в PEN
    async function fetchExchangeRate() {
        try {
            // Запрос к API для получения обменных курсов
            const response = await fetch('https://v6.exchangerate-api.com/v6/61068c8793b39d6fea162259/latest/USD');
            const data = await response.json();

            // Проверка успешного ответа
            if (data.result === 'success' && data.conversion_rates.PEN) {
                const exchangeRate = data.conversion_rates.PEN;

                // Отображение курса обмена в нужном формате
                precioDeUsdAPenElem.textContent = exchangeRate.toFixed(2); // Округляем до двух знаков после запятой

                // Умножаем цену золота за грамм на курс обмена и выводим результат
                if (goldPriceElem) {
                    const goldPriceInUSD = parseFloat(goldPriceElem.textContent); // Получаем цену золота в USD/грамм
                    if (!isNaN(goldPriceInUSD)) {
                        const priceInPEN = goldPriceInUSD * exchangeRate; // Переводим в PEN
                        precioOroGramoAPenElem.textContent = priceInPEN.toFixed(2); // Выводим цену золота в PEN за грамм
                    }
                }
            } else {
                throw new Error('Failed to retrieve PEN exchange rate');
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            precioDeUsdAPenElem.textContent = 'Error loading exchange rate';
            precioOroGramoAPenElem.textContent = 'Error loading price';
        }
    }

    // Обновление данных при загрузке страницы
    fetchExchangeRate();
});
