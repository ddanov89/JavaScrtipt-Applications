window.onload = solution();

function solution() {
    let sectionRef = document.getElementById('main');
    getArticleInformation(sectionRef);
}

async function getArticleInformation(sectionRef) {

    let articleUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    try {
        let response = await fetch(articleUrl);
        if (!response.ok) {
            let message = await response.json();
            throw new Error(message);
        }
        let data = await response.json();
        Array
            .from(Object.values(data))
            .forEach(element => {
                sectionRef.appendChild(createArticle(element));
            });
    } catch (error) {
        alert(error.message);
    }
}

function createArticle(element) {

    let articleContainer = createElement('div', null);
    articleContainer.classList.add('accordion');

    let headDiv = createElement('div', null);
    headDiv.classList.add('head');
    headDiv.appendChild(createElement('span', element.title));

    let moreBtn = createElement('button', 'More');
    moreBtn.classList.add('button');
    moreBtn.setAttribute('id', element._id);

    headDiv.appendChild(moreBtn);
    articleContainer.appendChild(headDiv);

    let extraInfoDiv = createElement('div', null);
    extraInfoDiv.classList.add('extra');
    extraInfoDiv.style.display = 'none';

    let pEl = createElement('p', null);

    extraInfoDiv.appendChild(pEl);
    articleContainer.appendChild(extraInfoDiv);
    moreBtn.addEventListener('click', onMore.bind(null, extraInfoDiv));

    return articleContainer;
}

async function onMore(extraInfoDiv, event) {
    let articleDetailsURL = 'http://localhost:3030/jsonstore/advanced/articles/details/';
    let id = event.target.getAttribute('id');
    try {
        let response = await fetch(articleDetailsURL + id);
        if (!response.ok) {
            let message = await response.json();
            throw message;
        }
        let data = await response.json();
        if (event.target.textContent == 'More') {
            extraInfoDiv.style.display = 'block';
            extraInfoDiv.children[0].textContent = data.content;
            event.target.textContent = "Less";
        } else {
            extraInfoDiv.style.display = 'none';
            event.target.textContent = "More";
        }
    } catch (error) {
        alert(error.message);
    }
}

function createElement(type, content) {
    let element = document.createElement(type);
    if (content) {
        element.textContent = content;
    }
    return element;
}