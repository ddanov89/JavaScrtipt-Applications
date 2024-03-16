async function lockedProfile() {
  const response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
  const data = await response.json()

  const container = document.querySelector('main')
  container.innerHTML = ''

  Object.values(data).forEach((profile, i) => container.appendChild(createProfile(profile, i + 1)))
}

function createProfile(profile, i) {
  const profileContainer = createElement('div', null)
  const showMoreBtn = createElement('button', 'Show more');

  profileContainer.classList('profile');
  profileContainer.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
<label>Lock</label>
<input type="radio" name="user${i}Locked" value="lock" checked="">
<label>Unlock</label>
<input type="radio" name="user${i}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${i}Username" value=${profile.username} disabled="" readonly="">
<div id="user${i}HiddenFields" hidden>
<hr>
<label>Email:</label>
<input type="email" name="user${i}Email" value=${profile.email} disabled="" readonly="">
<label>Age:</label>
<input type="email" name="user${i}Age" value=${profile.age} disabled="" readonly="">
</div>`

  showMoreBtn.addEventListener('click', onShowMore.bind(null, i));
  profileContainer.appendChild(showMoreBtn)

  return profileContainer
}

function onShowMore(i, event) {
  let showMoreBtn = event.target;
  let profileContainer = event.target.parentElement;
  let currentRadioBtn = profileContainer.querySelector("input[type='radio']:checked");
  if (currentRadioBtn.value === 'unlock') {
    if (showMoreBtn.textContent === 'Show more') {
      profileContainer.querySelector(`#user${i}HiddenFields`).style.display = 'block'
      showMoreBtn.textContent = 'Hide it'
    } else {
      profileContainer.querySelector(`#user${i}HiddenFields`).style.display = 'none'
      showMoreBtn.textContent = 'Show more'
    }
  }
}

function createElement(type, content) {

  let element = document.createElement(type);
  if (content) {
    element.textContent = content;
  }
  return element;
}