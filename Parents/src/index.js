window.onload = () => {
    document.querySelector('.topbar__action').innerText = getCookie("vamnaone").split('|')[1];
    document.querySelector('.loadweb').remove();
    let student = getCookie("id")
    let detail = getCookie("detail")
    let classN = getCookie("classN")
    Getstudent(detail, classN, student)

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
function Getstudent(detail, classN, student) {
    if (g.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: detail,
                wSheetName: 'Infor',
            }).then((infor) => {
                g = strim(infor)
                fetchSheet
                    .fetch({
                        gSheetId: detail,
                        wSheetName: 'Course',
                    }).then((Course) => {
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
