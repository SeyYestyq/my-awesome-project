//Реализиуется открытие модального окна
const dlg= document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
openBtn.addEventListener('click', () => {
    dlg.show();
});
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        showSuccess();
    }
});
// Реализиуется закрытие модального окна 
const closeBtn = document.getElementById('closeDialog');

closeBtn.addEventListener('click', () => {
    dlg.close();
});

// Реализиуется валидация формы
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
function showSuccess() {
    // Показать уведомление
    const notification = document.getElementById('successNotification');
    notification.style.display = 'block';
    
    // Закрыть модальное окно через 1.5 секунды
    setTimeout(() => {
        dlg.close();
        notification.style.display = 'none';
        clearForm();
    }, 1500);
}

function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
}
function clearForm() {
    document.getElementById('contactForm').reset();
    hideError();
}

function highlightInvalidFields() {
    const form = document.getElementById('contactForm');
    
    [...form.elements].forEach(el => {
        if (el.willValidate) {
            el.toggleAttribute('aria-invalid', !el.checkValidity());
        }
    });
}
function setupPhoneMask() {
    const phone = document.getElementById('phone');
    
    phone?.addEventListener('input', () => {
        const digits = phone.value.replace(/\D/g,'').slice(0,11); // до 11 цифр
        const d = digits.replace(/^8/, '7'); // нормализуем 8 → 7
        
        const parts = [];
        if (d.length > 0) parts.push('+7');
        if (d.length > 1) parts.push(' (' + d.slice(1,4));
        if (d.length >= 4) parts[parts.length - 1] += ')';
        if (d.length >= 5) parts.push(' ' + d.slice(4,7));
        if (d.length >= 8) parts.push('-' + d.slice(7,9));
        if (d.length >= 10) parts.push('-' + d.slice(9,11));
        
        phone.value = parts.join('');
    });
    
    // Строгая проверка паттерна
    phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');
}

// Вызвать после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    setupPhoneMask();
});

function validateForm() {
    hideError(); // скрываем предыдущие ошибки
    highlightInvalidFields();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Проверка имени
    if (name.length < 2) {
        showError('Имя должно содержать минимум 2 символа');
        return false;
    }
    
    if (!/^[а-яё\s]+$/i.test(name)) {
        showError('Имя должно содержать только буквы');
        return false;
    }
    
    // Проверка email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showError('Введите корректный email (например: example@mail.ru)');
        return false;
    }
    
    // Проверка телефона
    if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
        showError('Телефон должен быть в формате +7 (xxx) xxx-xx-xx');
        return false;
    }
    
    return true;
    
}