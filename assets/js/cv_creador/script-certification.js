let certificationCount = 0; // Счётчик сертификатов

// Функция для добавления нового сертификата
function addCertificate() {
    certificationCount++;
    const container = document.getElementById('certificationForms');

    // Создаём новый div для формы
    const formDiv = document.createElement('div');
    formDiv.classList.add('mt-2', 'p-2', 'rounded-md');
    formDiv.setAttribute('id', `certForm${certificationCount}`);

    // Вставляем поля ввода
    formDiv.innerHTML = `
        <input type="text" id="certInstitution${certificationCount}" class="w-full border p-2 rounded mb-2" placeholder="Institution name" oninput="updateCertificationPreview()">

        <input type="text" id="certName${certificationCount}" class="w-full border p-2 rounded mb-2" placeholder="Certificate title" oninput="updateCertificationPreview()">

        <input type="text" id="certYear${certificationCount}" class="w-full border p-2 rounded mb-2" placeholder="Year of completion" oninput="updateCertificationPreview()">

        <input type="text" id="certURL${certificationCount}" class="w-full border p-2 rounded mb-2" placeholder="Link to certificate (optional)" oninput="updateCertificationPreview()">

        <!-- Кнопка удаления сертификата -->
        <button onclick="removeCertificate(${certificationCount})" class="bg-red-500 text-white px-2 py-2 rounded-md mt-2">Remove</button>
    `;

    container.appendChild(formDiv); // Добавляем форму в контейнер
    updateCertificationPreview(); // Обновляем превью
}

// Функция удаления сертификата
function removeCertificate(id) {
    const formToRemove = document.getElementById(`certForm${id}`);
    if (formToRemove) {
        formToRemove.remove();
        updateCertificationPreview();
    }
}

// Функция обновления превью
function updateCertificationPreview() {
    const previewContainer = document.getElementById('certificationPreview');
    previewContainer.innerHTML = ''; // Очищаем превью перед обновлением

    // Проходимся по всем формам и собираем данные
    document.querySelectorAll('#certificationForms > div').forEach(form => {
        const institution = form.querySelector(`[id^='certInstitution']`).value;
        const certName = form.querySelector(`[id^='certName']`).value;
        const year = form.querySelector(`[id^='certYear']`).value;
        const certURL = form.querySelector(`[id^='certURL']`).value;

        // Добавляем данные в превью только если есть информация
        if (institution || certName || year) {
            previewContainer.innerHTML += `
                <div class="mt-1">
                    <p class="text-gray-700"><span class="font-semibold text-gray-600 inline-block">${institution}:</span>
                        ${certURL ? `<a href="${certURL}" target="_blank">${certName}, ${year}</a>` : `${certName}, ${year}`}
                    </p>
                </div>
            `;
        }
    });
}