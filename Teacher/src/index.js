window.onload = () => {
    document.querySelector('.loadweb').remove();
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
    });
}
const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);

var Student = []
async function s12312312() {
    if (!Student.length) {
        Student = await fetchSheet
            .fetch({
                gSheetId: '1Ph6KE5iz0JAJejKNq9pVO55wDdBqpPGGCG2hcipzLaA'
            }).then((data) => { return strim(data).slice(1) })
    }
    return Student
}


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
let lj = true
function Admissions(d) {
    if (dataAdmissions.length === 0 || d == true) {
        fetchSheet
            .fetch({
                gSheetId: '1ogxImxEf8z1hDZKpBti6G9KTk5sjxtdAdqzn69FppDQ'
            }).then((data) => {
                console.log(data);
                dataAdmissions = data
                AdmissionsPage(dataAdmissions)
                lj = false
                SetAttribute('.load', 'style', 'display:none')
            })

    } else {
        AdmissionsPage(dataAdmissions)
        SetAttribute('.load', 'style', 'display:none')
    }
}
let dataCourse_w = []
let dataCourse_t = []
function GetCourse() {
    if (dataCourse_t.length === 0 || dataCourse_w.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1XWgdnQzRhkh7qAzYXklnC89bMHzcEYZLcVmWdrXufI4'
            }).then((DataCourse_w) => {
                fetchSheet
                    .fetch({
                        gSheetId: '1XsISdnmrcwbpRAgE72mN8PUUkKRj4a7miszYmRdms6w'
                    }).then((DataCourse) => {
                        dataCourse_t = strim(DataCourse)
                        dataCourse_w = strim(DataCourse_w.slice(1))
                        Courses(dataCourse_t, dataCourse_w)
                        SetAttribute('.load', 'style', 'display:none')
                    })
            })
    } else {
        Courses(dataCourse_t, dataCourse_w)
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

vam('.sidebar__item[get-data="Course"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="Course"]');
    SetAttribute('.load', 'style', 'display:block')
    vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
    t.classList.add('sidebar__item--actived')
    GetCourse()
}