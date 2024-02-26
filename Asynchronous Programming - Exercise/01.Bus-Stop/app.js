function getInfo() {

    let stopIdRef = document.getElementById('stopId');
    let checkBtn = document.getElementById('submit');

    checkBtn.addEventListener('click', onCheckHandler(stopIdRef));
}

async function onCheckHandler(stopId) {

    let divElRef = document.getElementById('stopName');
    let ulEl = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            const message = await response.json();
            throw message;
        }
        const data = await response.json();
        divElRef.textContent = `${data.name}`;
        let liArr = new Array();
        for (const [busId, time] of Object.entries(data.buses)) {
            let liEl = createElement('li', `Bus ${busId} arrives in ${time} minutes`);
            liArr.push(liEl);
        }
        ulEl.replaceChildren(...liArr);
    } catch (error) {
        divElRef.textContent = 'Error';
        ulEl.replaceChildren(...new Array());
    }
}

function createElement(type, content) {
    const element = document.createElement(type);
    if (content) {
        element.textContent = content;
    }
    return element;
}