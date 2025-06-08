function updateLanguagesTitle() {
    document.getElementById('languagesTitlePreview').textContent = document.getElementById('languagesTitleInput').value;
}

function updateLanguages() {
    let languagesText = document.getElementById('languagesInput').value;
    let languagesArray = languagesText.split('\n').filter(lang => lang.trim() !== ''); // Разделяем строки и убираем пустые
    let languagesPreview = document.getElementById('languagesPreview');

    languagesPreview.innerHTML = ''; // Очищаем список перед обновлением

    languagesArray.forEach(lang => {
        let li = document.createElement('li');
        li.textContent = lang;
        languagesPreview.appendChild(li);
    });
}
