window.onload = () => {
    document.querySelector('.topbar__action').innerText = getCookie("vamnaone").split('|')[1];
    document.querySelector('.loadweb').remove();
}
let g = []
let k = []
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

let student = getCookie("id")
let detail = getCookie("detail")
let classN = getCookie("classN")
Getstudent(detail)


function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function Getstudent(detail) {
    if (g.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: detail,
                wSheetName: 'Infor',
            }).then((infor) => {
                console.log(infor);
                g = strim(infor)
                fetchSheet
                    .fetch({
                        gSheetId: detail,
                        wSheetName: 'Course',
                    }).then((Course) => {
                        console.log(Course);
                        k = strim(Course)
                        Student(g[0], k[0])
                        SetAttribute('.load', 'style', 'display:none')
                    })
            })
    } else {
        Student(g[0], k[0])
        SetAttribute('.load', 'style', 'display:none')
    }
}
let l = 'SL1'
function Celenders() {
    Celender(l)
}
vam('.sidebar__item[get-data="course"]').onclick = () => {
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    vam('.sidebar__item[get-data="course"]').classList.add('sidebar__item--actived')
    Celenders(l)
}
vam('.sidebar__item[get-data="student"]').onclick = () => {
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    vam('.sidebar__item[get-data="student"]').classList.add('sidebar__item--actived')
    Getstudent(getCookie("detail"))
}
