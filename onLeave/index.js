const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
let url = 'https://script.google.com/macros/s/AKfycbx0HkBfaMw_YbgT3gDBXUCoVxOYwITk5kQSMc9oOl6Ud__THTzTDjUqpQBN9PF3Utst/exec'
function SetAttribute(element, Attribute, Value) {
    vam(element) ? vam(element).setAttribute(Attribute, Value) : null
}

function Celendar(infor, data) {
    vam('main').innerHTML = (
        `<div>Hello Word</div>`
    )
}