let educationCount = 0;

    function addEducation() {
        educationCount++;
        
        const formId = `education${educationCount}`;
        const formContainer = document.createElement('div');
        formContainer.id = formId;
        formContainer.className = "p-2 rounded-md mb-3";
        
        formContainer.innerHTML = `
            <input type="text" id="degree${educationCount}" class="w-full border p-2 rounded mb-2" placeholder="Título (por ejemplo, Licenciatura en Ingeniería)" oninput="updateEducationPreview()">
            <input type="text" id="university${educationCount}" class="w-full border p-2 rounded mb-2" placeholder="Universidad (por ejemplo, la UNSA)" oninput="updateEducationPreview()">
            <input type="text" id="location${educationCount}" class="w-full border p-2 rounded mb-2" placeholder="Ubicación (por ejemplo, Arequipa, Peru)" oninput="updateEducationPreview()">
            <input type="text" id="years${educationCount}" class="w-full border p-2 rounded mb-2" placeholder="Años (por ejemplo, 2010-2014)" oninput="updateEducationPreview()">
            <button onclick="removeEducation('${formId}')" class="bg-red-500 text-white px-2 py-2 rounded-md">Eliminar</button>
        `;
        
        document.getElementById('educationForms').appendChild(formContainer);
        updateEducationPreview();
    }

    function removeEducation(id) {
        document.getElementById(id).remove();
        updateEducationPreview();
    }

    function updateEducationPreview() {
        const previewContainer = document.getElementById('educationPreview');
        previewContainer.innerHTML = ''; // Очищаем контейнер перед обновлением
        
        document.querySelectorAll('#educationForms > div').forEach(form => {
            const degree = form.querySelector(`[id^='degree']`).value;
            const university = form.querySelector(`[id^='university']`).value;
            const location = form.querySelector(`[id^='location']`).value;
            const years = form.querySelector(`[id^='years']`).value;
            
            if (degree || university || location || years) {
                previewContainer.innerHTML += `
                    <div class="mt-1">
                        <p class="text-gray-700"><span class="font-semibold text-gray-600">${degree}</span></p>
                        <p class="text-gray-700">${university} - ${location} <span class="float-right text-sm">${years}</span></p>
                    </div>
                `;
            }
        });
    }