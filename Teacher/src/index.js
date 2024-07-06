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

let dataAdmissions = []
function Admissions() {
    if (dataAdmissions.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1ogxImxEf8z1hDZKpBti6G9KTk5sjxtdAdqzn69FppDQ'
            }).then((data) => {
                dataAdmissions = data
                AdmissionsPage(dataAdmissions)
                SetAttribute('.load', 'style', 'display:none')
            })

    } else {
        AdmissionsPage(dataAdmissions)
        SetAttribute('.load', 'style', 'display:none')
    }
}
Celender_page()

vam('.sidebar__item[get-data="Class"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="Class"]');
    SetAttribute('.load', 'style', 'display:block')
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    t.classList.add('sidebar__item--actived')
    Class()

}
vam('.sidebar__item[get-data="noteBook"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="noteBook"]');
    SetAttribute('.load', 'style', 'display:block')
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    t.classList.add('sidebar__item--actived')
    Celender_page()
}

vam('.sidebar__item[get-data="Sale"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="Sale"]');
    SetAttribute('.load', 'style', 'display:block')
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    t.classList.add('sidebar__item--actived')
    Admissions()
}