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

let all = []
function GetAll() {
    if (all.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1ogxImxEf8z1hDZKpBti6G9KTk5sjxtdAdqzn69FppDQ'
            }).then((data) => {
                all = strim(data)
                LoadAll(all)
                SetAttribute('.load', 'style', 'display:none')
            })
    } else {
        LoadAll(all)
        SetAttribute('.load', 'style', 'display:none')
    }
}
GetAll()
let student = []
function GetStudent() {
    if (student.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc'
            }).then((data) => {
                student = strim(data).slice(1)
                Student(student)
                SetAttribute('.load', 'style', 'display:none')
            })
    } else {
        Student(student)
        SetAttribute('.load', 'style', 'display:none')
    }
}

vam('.sidebar__item[get-data="overview"]').onclick = () => {
    if (!vam('.sidebar__item.sidebar__item--actived[get-data="overview"]')) {
        SetAttribute('.load', 'style', 'display:display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        vam('.sidebar__item[get-data="overview"]').classList.add('sidebar__item--actived')
        GetAll()
    }
}
vam('.sidebar__item[get-data="student"]').onclick = () => {
    if (!vam('.sidebar__item.sidebar__item--actived[get-data="student"]')) {
        SetAttribute('.load', 'style', 'display:display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        vam('.sidebar__item[get-data="student"]').classList.add('sidebar__item--actived')
        GetStudent()
    }
}