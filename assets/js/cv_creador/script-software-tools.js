function updateToolsTitle() {
    document.getElementById('toolsTitlePreview').textContent = document.getElementById('toolsTitleInput').value;
}

function updateTools() {
    let toolsText = document.getElementById('toolsInput').value;
    let toolsArray = toolsText.split('\n').filter(tool => tool.trim() !== ''); // Разделяем по строкам
    let toolsPreview = document.getElementById('toolsPreview');

    toolsPreview.innerHTML = ''; // Очищаем список перед обновлением

    toolsArray.forEach(tool => {
        let li = document.createElement('li');
        li.textContent = tool;
        toolsPreview.appendChild(li);
    });
}