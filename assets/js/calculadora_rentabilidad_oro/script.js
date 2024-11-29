document.addEventListener("DOMContentLoaded", () => {
    // Переменные для инпутов
    const inputs = {
        gastosInput: document.getElementById("gastos_de_petroleo_por_dia"),
        precioInput: document.getElementById("precio_1_galon_de_petroleo"),
        totalPetroleoInput: document.getElementById("total_gastos_de_petroleo_por_dia"),
        sueldoInput: document.getElementById("total_de_sueldo_de_trabajadores_por_dia"),
        comidaInput: document.getElementById("total_gastos_de_comida_por_dia"),
        alquilerInput: document.getElementById("total_alquiler_maquina_por_dia"),
        otrosInput: document.getElementById("otros_gastos_por_dia"),
        totalGastosDiaInput: document.getElementById("total_gastos_por_dia"),
        // Новые переменные
        produccionInput: document.getElementById("produccion_de_oro_por_dia"),
        precioOroInput: document.getElementById("precio_de_oro_por_1_gramo"),
        totalBeneficioInput: document.getElementById("total_beneficio_por_dia"),
        // Новая переменная для rentabilidad
        totalRentabilidadInput: document.getElementById("total_rentabilidad")
    };

    // Функция для загрузки данных из localStorage
    function loadData() {
        for (const key in inputs) {
            if (localStorage.getItem(key)) {
                inputs[key].value = localStorage.getItem(key);
            }
        }
        calcularPetroleo(); // Пересчитать формулы
        calcularTotalGastos();
        calcularBeneficio();
        calcularRentabilidad();
    }

    // Функция для сохранения данных в localStorage
    function saveData() {
        for (const key in inputs) {
            localStorage.setItem(key, inputs[key].value || "");
        }
    }

    // Функция для расчета total_gastos_de_petroleo_por_dia
    function calcularPetroleo() {
        const gastos = parseFloat(inputs.gastosInput.value) || 0;
        const precio = parseFloat(inputs.precioInput.value) || 0;

        if (!gastos || !precio) {
            inputs.totalPetroleoInput.value = "0.00";
        } else {
            const total = gastos * precio;
            inputs.totalPetroleoInput.value = total.toFixed(2);
        }
        calcularTotalGastos();
        calcularRentabilidad(); // Пересчитать rentabilidad
        saveData(); // Сохранение после расчета
    }

    // Функция для расчета total_gastos_por_dia
    function calcularTotalGastos() {
        const totalPetroleo = parseFloat(inputs.totalPetroleoInput.value) || 0;
        const sueldo = parseFloat(inputs.sueldoInput.value) || 0;
        const comida = parseFloat(inputs.comidaInput.value) || 0;
        const alquiler = parseFloat(inputs.alquilerInput.value) || 0;
        const otros = parseFloat(inputs.otrosInput.value) || 0;

        const totalGastos = totalPetroleo + sueldo + comida + alquiler + otros;
        inputs.totalGastosDiaInput.value = totalGastos.toFixed(2);
        calcularRentabilidad(); // Пересчитать rentabilidad
        saveData(); // Сохранение после расчета
    }

    // Новая функция для расчета total_beneficio_por_dia
    function calcularBeneficio() {
        const produccion = parseFloat(inputs.produccionInput.value) || 0;
        const precioOro = parseFloat(inputs.precioOroInput.value) || 0;

        if (!produccion || !precioOro) {
            inputs.totalBeneficioInput.value = "0.00";
        } else {
            const total = produccion * precioOro;
            inputs.totalBeneficioInput.value = total.toFixed(2);
        }
        calcularRentabilidad(); // Пересчитать rentabilidad
        saveData(); // Сохранение после расчета
    }

    // Новая функция для расчета total_rentabilidad
    function calcularRentabilidad() {
        const totalBeneficio = parseFloat(inputs.totalBeneficioInput.value) || 0;
        const totalGastos = parseFloat(inputs.totalGastosDiaInput.value) || 0;

        const rentabilidad = totalBeneficio - totalGastos;
        inputs.totalRentabilidadInput.value = rentabilidad.toFixed(2);
        saveData(); // Сохранение после расчета
    }

    // Слушатели событий
    for (const key in inputs) {
        if (inputs[key].tagName === "INPUT" && inputs[key].type === "number") {
            inputs[key].addEventListener("input", () => {
                if (key === "gastosInput" || key === "precioInput") {
                    calcularPetroleo();
                } else if (key === "produccionInput" || key === "precioOroInput") {
                    calcularBeneficio();
                } else {
                    calcularTotalGastos();
                }
            });
        }
    }

    // Загрузка данных при загрузке страницы
    loadData();
});