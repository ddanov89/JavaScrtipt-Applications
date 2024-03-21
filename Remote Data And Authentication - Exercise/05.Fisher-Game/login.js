document.querySelector('form').addEventListener('submit', onSubmit);
document.querySelector("a[id='logout']").style.display = 'none';
document.querySelector("a[id='login']").classList.add('active');

const url = 'http://localhost:3030/users/login';

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
            return alert('Wrong email or password!');
    }
    await logInUser({ email, password });
    e.target.reset();
    window.location = 'index.html';
}

async function logInUser(data) {
    const option = createOption('POST', data);
    const response = await fetch(url, option);
    const userData = await response.json();
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

function createOption(method, data) {
    return {
        method: method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    };
}