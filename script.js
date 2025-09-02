// Основной JavaScript файл для Go Insight

document.addEventListener('DOMContentLoaded', function() {
    
    // Плавная прокрутка для якорных ссылок
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Обработчик для всех ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Обработчик для кнопок "Бесплатное демо"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('демо')) {
            button.addEventListener('click', () => {
                // Здесь будет логика для записи на демо
                console.log('Запись на демо');
                alert('Функция записи на демо будет добавлена позже');
            });
        }
    });

    // Обработчик для кнопок "Примеры отчетов"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('отчетов')) {
            button.addEventListener('click', () => {
                // Здесь будет логика для показа примеров отчетов
                console.log('Показать примеры отчетов');
                smoothScroll('#reports');
            });
        }
    });

    // Обработчик для ссылок "Смотреть полный отчет"
    document.querySelectorAll('.client-card__btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Показать полный отчет');
            alert('Полные отчеты будут доступны позже');
        });
    });

    // Функциональность для диаграммы (клик для зума и оверлей)
    const diagram = document.querySelector('.problem-section__diagram');
    if (diagram) {
        diagram.addEventListener('click', () => {
            showDiagramOverlay();
        });
    }

    // Функция показа оверлея с диаграммой
    function showDiagramOverlay() {
        // Создаем оверлей
        const overlay = document.createElement('div');
        overlay.className = 'diagram-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        // Создаем контейнер для диаграммы
        const diagramContainer = document.createElement('div');
        diagramContainer.style.cssText = `
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
        `;

        // Клонируем изображение диаграммы
        const diagramImg = document.querySelector('.diagram__image').cloneNode(true);
        diagramImg.style.cssText = `
            width: 100%;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            cursor: default;
        `;

        // Добавляем кнопку закрытия
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Собираем оверлей
        diagramContainer.appendChild(diagramImg);
        diagramContainer.appendChild(closeBtn);
        overlay.appendChild(diagramContainer);

        // Добавляем в DOM
        document.body.appendChild(overlay);

        // Обработчики закрытия
        const closeOverlay = () => {
            document.body.removeChild(overlay);
        };

        closeBtn.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeOverlay();
            }
        });
    }

    // Добавляем класс для анимации появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми основными секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    console.log('Go Insight сайт загружен успешно!');
});
