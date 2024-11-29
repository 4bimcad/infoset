 // Функция для обновления времени
 function updateTime() {
    const options = {
        timeZone: 'America/Lima', // Время Перу (UTC-5)
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    const currentDate = new Date().toLocaleString('es-PE', options);
    document.getElementById('time').innerText = "Fecha y Hora de Calculación: " + currentDate;
}

// Обновляем время при загрузке страницы
window.onload = updateTime;

