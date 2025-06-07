        // Функция для применения темы
        function applyTheme(isDark) {
            if (isDark) {
                document.body.classList.add('bg-dark');
                document.body.classList.remove('bg-light');
            } else {
                document.body.classList.add('bg-light');
                document.body.classList.remove('bg-dark');
            }
        }
        
        // Загрузка выбранной темы из localStorage и установка переключателя
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') === 'dark';
            document.getElementById('flexSwitchCheckDefault').checked = savedTheme;
            applyTheme(savedTheme);

            // Событие для изменения темы при переключении
            document.getElementById('flexSwitchCheckDefault').addEventListener('change', (event) => {
                const isDark = event.target.checked;
                applyTheme(isDark);
                // Сохраняем выбор пользователя в localStorage
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        });
