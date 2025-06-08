let projectCount = 0; // Счётчик проектов

function addProject() {
    projectCount++;
    let container = document.createElement('div');
    container.classList.add('mt-2', 'p-2', 'rounded');
    container.setAttribute('id', `project${projectCount}`);

    container.innerHTML = `
        <input type="text" id="title${projectCount}" class="w-full border p-2 rounded mb-2" placeholder="Title" oninput="updateProjectsPreview()">
        
        <input type="text" id="desc${projectCount}" class="w-full border p-2 rounded mb-2" placeholder="Description" oninput="updateProjectsPreview()">
        
        <input type="text" id="link${projectCount}" class="w-full border p-2 rounded mb-2" placeholder="https://example.com" oninput="updateProjectsPreview()">
        
        <button onclick="removeProject(${projectCount})" class="bg-red-500 text-white px-4 py-1 rounded-md text-sm">Remove</button>
    `;

    document.getElementById('projectsForms').appendChild(container);
}

function removeProject(id) {
    document.getElementById(`project${id}`).remove();
    updateProjectsPreview(); // Обновляем превью
}

function updateProjectsPreview() {
    let previewContainer = document.getElementById('projectsPreview');
    previewContainer.innerHTML = ''; // Очищаем перед обновлением

    document.querySelectorAll('#projectsForms > div').forEach(form => {
        let title = form.querySelector(`[id^='title']`).value;
        let desc = form.querySelector(`[id^='desc']`).value;
        let link = form.querySelector(`[id^='link']`).value;

        if (title || desc || link) {
            let projectHTML = `
                <div class="mt-2">
                    <p class="text-gray-700">
                        <span class="font-semibold text-gray-600">${title}:</span> 
                        ${link ? `<a href="${link}" target="_blank">${desc}</a>` : desc}
                    </p>
                </div>
            `;
            previewContainer.innerHTML += projectHTML;
        }
    });
}
