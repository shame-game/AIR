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
} else {
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
let Course = []
async function getLoadCourse() {
    if (!Course.length) {
        Course = await
            fetchSheet
                .fetch({
                    gSheetId: '1XsISdnmrcwbpRAgE72mN8PUUkKRj4a7miszYmRdms6w'
                }).then((data) => { return data })
    }
    return Course
}

let all = []
function GetAll() {
    SetAttribute('.load', 'style', 'display:display:block')
    if (all.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1ogxImxEf8z1hDZKpBti6G9KTk5sjxtdAdqzn69FppDQ'
            }).then((data) => {
                all = strim(data)
                LoadAll(all)
            })
    } else {
        LoadAll(all)
    }
}

let student = []
function GetStudent() {
    SetAttribute('.load', 'style', 'display:display:block')
    if (student.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1Ph6KE5iz0JAJejKNq9pVO55wDdBqpPGGCG2hcipzLaA'
            }).then((data) => {
                student = strim(data).slice(1)
                Student(student)
            })
    } else {
        Student(student)
    }
}
GetAll()
nav_root()
function nav_root() {

    vam('.sidebar__item[get-data="overview"]').onclick = () => {
        if (!vam('.sidebar__item.sidebar__item--actived[get-data="overview"]')) {
            vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
            vam('.sidebar__item[get-data="overview"]').classList.add('sidebar__item--actived')
            GetAll()
        }
    }

    vam('.sidebar__item[get-data="student"]').onclick = () => {
        if (!vam('.sidebar__item.sidebar__item--actived[get-data="student"]')) {
            vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
            vam('.sidebar__item[get-data="student"]').classList.add('sidebar__item--actived')
            GetStudent()
        }
    }

    vam('.sidebar__item[get-data="book"]').onclick = () => {
        if (!vam('.sidebar__item.sidebar__item--actived[get-data="book"]')) {
            vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
            vam('.sidebar__item[get-data="book"]').classList.add('sidebar__item--actived')
            CourseMain()
        }
    }
}
window.onpopstate = function (event) {
    event.preventDefault();
    alert("Sorry, you can't go back to the previous page.");
};

window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = "";
};