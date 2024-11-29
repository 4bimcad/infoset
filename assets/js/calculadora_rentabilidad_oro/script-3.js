// Функция для открытия видео
function openVideo() {
    document.getElementById('videoContainer').style.display = 'flex'; // Показываем видео
}

// Функция для закрытия видео
function closeVideo(event) {
    if (event.target === document.getElementById('videoContainer') || event.target === document.querySelector('.close')) {
        document.getElementById('videoContainer').style.display = 'none'; // Скрываем видео
    }
}
