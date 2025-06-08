function updateSkillsTitle() {
    document.getElementById('skillsTitlePreview').textContent = document.getElementById('skillsTitleInput').value;
}

function updateSkills() {
    let skillsText = document.getElementById('skillsInput').value;
    let skillsArray = skillsText.split('\n').filter(skill => skill.trim() !== ''); // Разделяем по строкам
    let skillsPreview = document.getElementById('skillsPreview');

    skillsPreview.innerHTML = ''; // Очищаем список перед обновлением

    skillsArray.forEach(skill => {
        let li = document.createElement('li');
        li.textContent = skill;
        skillsPreview.appendChild(li);
    });
}