document.querySelector('form').addEventListener('submit', onSubmit);
document.querySelector("a[id='logout']").style.display = 'none';
document.querySelector("a[id='register']").classList.add('active');

const url = 'http://localhost:3030/users/register';


async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get("password");
    let rePass = formData.get('rePass');

    if (!email || !password || !rePass) {
        return alert('Email, password and repeated password can not be empty!');
    }

    if (password != rePass) {
        return alert('Password doesn\'t match!');
    }
    await createUser({ email, password });
    e.target.reset();
    window.location = 'index.html';

}
async function createUser(data) {
    const option = createOption('POST', data);
    let response = await fetch(url, option);
    let userData = await response.json();
    debugger
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