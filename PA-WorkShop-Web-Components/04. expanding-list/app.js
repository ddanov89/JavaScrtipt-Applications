
class ExpandingList extends HTMLUListElement {
    constructor() {
        self = super(); // reference to our element(ul)

        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));

        uls.forEach(ul => ul.style.display = 'none');
        lis.forEach(li => {
            if (li.querySelectorAll('ul').length > 0) {
                li.setAttributes('class', 'closed');

        //         <li>
        //     <span onclick></span>
        //     <ul></ul>
        // </li>
        // <li></li>
        const childText = li.childNodes[0];
        const newSpan = document.createElement('span');
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";
        newSpan.onclick = self.showul;
        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
                // li.onclick = self.showul;
            }
        });

        
    }
    showul(event) {
        // console.log('here');
        // console.log(event.target);
        // console.log(event.target.nextElementSibling);
        // console.log(event.target.nextElementSibling.querySelectorAll('ul')[0]);
        const nextUl = event.target.nextElementSibling;
        if (nextUl.style.display == 'block') {
            nextUl.style.display = 'none';
            nextUl.parentNode.setAttributes('class', 'closed');
        } else {
            nextUl.style.display = "block";
            nextUl.parentNode.setAttributes('class', 'open');
        }
    }
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" });