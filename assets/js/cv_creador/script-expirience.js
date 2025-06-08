let experienceCount = 0;

function addExperience() {
    experienceCount++;

    const container = document.getElementById("experienceContainer");
    const previewContainer = document.getElementById("previewContainer");

    // Блок формы
    const newExperience = document.createElement("div");
    newExperience.className = "bg-white p-2 shadow-md rounded-md mb-1";
    newExperience.id = `experienceBlock${experienceCount}`;

    newExperience.innerHTML = `
        <label class="block text-sm font-medium">Nombre de empresa</label>
        <input type="text" id="company${experienceCount}" class="w-full border p-2 rounded mb-2" placeholder="Empresa" oninput="updatePreview(${experienceCount})">

        <label class="block text-sm font-medium">Ubicación</label>
        <input type="text" id="location${experienceCount}" class="w-full border p-2 rounded mb-2" placeholder="Ciudad, País" oninput="updatePreview(${experienceCount})">

        <label class="block text-sm font-medium">Fecha</label>
        <input type="text" id="date${experienceCount}" class="w-full border p-2 rounded mb-2" placeholder="05/2018 - Present" oninput="updatePreview(${experienceCount})">

        <label class="block text-sm font-medium">Posición</label>
        <input type="text" id="position${experienceCount}" class="w-full border p-2 rounded mb-2" placeholder="Ingeniero, Gerente" oninput="updatePreview(${experienceCount})">

        <label class="block text-sm font-medium">Responsabilidades</label>
        <textarea id="tasks${experienceCount}" class="w-full border p-2 rounded mb-1 h-24 resize-y" placeholder="Breve descripción de sus responsabilidades" oninput="updatePreview(${experienceCount})"></textarea>

        <button onclick="removeExperience(${experienceCount})" class="bg-red-500 text-white px-3 py-1 rounded-md mt-3">Eliminar</button>
    `;

    container.appendChild(newExperience);

    // Блок превью
    const newPreview = document.createElement("div");
    newPreview.className = "mt-3";
    newPreview.id = `previewBlock${experienceCount}`;

    newPreview.innerHTML = `
        <p class="text-gray-700">
            <span class="text-lg text-gray-600 inline-block mt-1">
                <strong id="companyPreview${experienceCount}">Nombre de empresa</strong>
            </span> 
            – <span id="locationPreview${experienceCount}">Ubicación</span>
            <span class="float-right text-sm mt-1" id="datePreview${experienceCount}">Fecha</span>
        </p>
        <p class="font-semibold" id="positionPreview${experienceCount}">Posición</p>
        <p class="text-gray-700 text-sm ml-6 mt-3" id="tasksPreview${experienceCount}">Responsabilidades</p>
    `;

    previewContainer.appendChild(newPreview);
}

// Функция обновления превью
function updatePreview(id) {
    document.getElementById(`companyPreview${id}`).textContent = document.getElementById(`company${id}`).value;
    document.getElementById(`locationPreview${id}`).textContent = document.getElementById(`location${id}`).value;
    document.getElementById(`datePreview${id}`).textContent = document.getElementById(`date${id}`).value;
    document.getElementById(`positionPreview${id}`).textContent = document.getElementById(`position${id}`).value;
    
    // Обрабатываем переносы строк и пробелы
    let tasksText = document.getElementById(`tasks${id}`).value;
    document.getElementById(`tasksPreview${id}`).innerHTML = tasksText
        .replace(/ /g, "&nbsp;") // Заменяем пробелы на &nbsp;
        .replace(/\n/g, "<br>");  // Переносы строк на <br>
}


// Функция удаления блока
function removeExperience(id) {
    document.getElementById(`experienceBlock${id}`).remove();
    document.getElementById(`previewBlock${id}`).remove();
}
