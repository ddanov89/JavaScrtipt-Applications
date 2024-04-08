export function notification(message) {
    const div = document.querySelector('.notification');
    const spanMsg = document.querySelector('.msg');
    spanMsg.textContent = message;
    div.style.display = 'inline';
    setTimeout(() => {
        div.style.display = 'none';
    }, 3000);
}