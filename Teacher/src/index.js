window.onload = () => {
    document.querySelector('.loadweb').remove();
}
const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
let wid = screen.width
if (wid < 1100) {
    $('.main__container').addClass('hiden')
    vam('.topbar__leading').onclick = () => {
        $('#app_nav').toggleClass('hide')
        $('.account').toggleClass('hide')
        $('.bg').toggleClass('hide')
        vam('.bg').addEventListener('click', () => {
            vam('.sidebar').classList.remove('hide')
            vam('.account').classList.remove('hide')
            vam('.bg').classList.remove('hide')
        })
        vam('.title-todo>i').addEventListener('click', () => {
            vam('.sidebar').classList.remove('hide')
            vam('.account').classList.remove('hide')
            vam('.bg').classList.remove('hide')
        })
    };
}
else {
    $('.topbar__leading').on('mousedown', e => {
        $('#app_nav').toggleClass('hide')
        $('.title-todo h1').toggleClass('hide')
        $('.account-main').toggleClass('hide')
        $('.account__container').toggleClass('hide')
        $('.sidebar__item span').toggleClass('hide')
        $('.sidebar__item').toggleClass('hide')
        $('.main__container').toggleClass('hiden')
        $('.sidebar').toggleClass('hide')
    });
}
let g = []
let k = []
function Celender_page() {
    if (g.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '10gFyuirBHeIg-x17xqvOmNrJMmdnV5B2wZmjQt7qXx0'
            }).then((infor) => {
                g = strim(infor)
                Calendar(g)
            })
    } else {
        Calendar(g)
        SetAttribute('.load', 'style', 'display:none')
    }
}
Celender_page()

let dataclass = []
let students = []
function Class() {
    if (dataclass.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1A53zGraoK0hsQlq_9C5VJm-asnsDmIi6V9orApgc55E',
                wSheetName: 'All Class',
            }).then((dataClass) => {
                dataclass = strim(dataClass)
                classN(dataclass)
                SetAttribute('.load', 'style', 'display:none')
            })
    } else {
        classN(dataclass)
        SetAttribute('.load', 'style', 'display:none')
    }
}

vam('.sidebar__item[get-data="Class"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="Class"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        SetAttribute('.load', 'style', 'display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        Class()
    }

}
vam('.sidebar__item[get-data="noteBook"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="noteBook"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        SetAttribute('.load', 'style', 'display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        Celender_page()
    }
}