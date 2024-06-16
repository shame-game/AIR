let g = document.cookie.split(';');

let h = 0

for (let i = 0; i < g.length; i++) {
    let cookie = g[i].trim();
    if (cookie.indexOf('vamnaone' + '=') === 0) {
        h++
    }
}

if (h == 0) {
    window.location.href = "https://shame-game.github.io/AIR/Login/"
}


const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);

let wid = screen.width
if (wid < 1100) {
    $('.main__container').addClass('hiden')
    vam('.topbar__leading').addEventListener('click', () => {
        $('.sidebar').toggleClass('hide')
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
    });
}
else {
    $('.topbar__leading').on('mousedown', e => {
        $('.main__container').toggleClass('hiden')
        $('.sidebar').toggleClass('hide')
    });
}

const urlBackend = 'https://script.google.com/macros/s/AKfycbwzQJwN0rt2_wiY-0zEc-Gjn4vOUlATMJggr8WgJc6aTlqpgO-LqgJOI673dqGWvmAn1Q/exec'


window.onload = () => document.querySelector('.loadweb').remove();

function Class() {
    fetchSheet
        .fetch({
            gSheetId: '1A53zGraoK0hsQlq_9C5VJm-asnsDmIi6V9orApgc55E',
            wSheetName: 'All Class',
        }).then((dataClass) => {
            fetchSheet
                .fetch({
                    gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc',
                    wSheetName: 'All Student',
                }).then((dataStudent) => {
                    dataStudent = dataStudent.map(obj => {
                        let trimmedObj = {};
                        for (let key in obj) {
                            trimmedObj[key.trim()] = obj[key];
                        }
                        return trimmedObj;
                    });
                    fetchSheet
                        .fetch({
                            gSheetId: '1yovU5--qcwwKtDFSY48RNbXdBr72uI1PQD8Uob_79Y4',
                            wSheetName: 'Course',
                        }).then((dataCourse) => {
                            dataCourse = dataCourse.map(obj => {
                                let trimmedObj = {};
                                for (let key in obj) {
                                    trimmedObj[key.trim()] = obj[key];
                                }
                                return trimmedObj;
                            });
                            classN(dataClass, dataStudent, dataCourse)
                        })
                })
        })
}

function Calendar() {
    fetchSheet
        .fetch({
            gSheetId: '10gFyuirBHeIg-x17xqvOmNrJMmdnV5B2wZmjQt7qXx0',
            wSheetName: 'Calender',
        }).then((Calender) => {
            Calender = Calender.map(obj => {
                let trimmedObj = {};
                for (let key in obj) {
                    trimmedObj[key.trim()] = obj[key];
                }
                return trimmedObj;
            });
            fetchSheet
                .fetch({
                    gSheetId: '1A53zGraoK0hsQlq_9C5VJm-asnsDmIi6V9orApgc55E',
                    wSheetName: 'All Class',
                }).then((dataClass) => {
                    fetchSheet
                        .fetch({
                            gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc',
                            wSheetName: 'All Student',
                        }).then((dataStudent) => {
                            dataStudent = dataStudent.map(obj => {
                                let trimmedObj = {};
                                for (let key in obj) {
                                    trimmedObj[key.trim()] = obj[key];
                                }
                                return trimmedObj;
                            });
                            fetchSheet
                                .fetch({
                                    gSheetId: '1yovU5--qcwwKtDFSY48RNbXdBr72uI1PQD8Uob_79Y4',
                                    wSheetName: 'Course',
                                }).then((dataCourse) => {
                                    dataCourse = dataCourse.map(obj => {
                                        let trimmedObj = {};
                                        for (let key in obj) {
                                            trimmedObj[key.trim()] = obj[key];
                                        }
                                        return trimmedObj;
                                    });
                                    CalendarNav(Calender, dataClass, dataStudent, dataCourse)
                                })
                        })
                })

        })
}

Calendar()
vam('.sidebar__item[get-data="calendar"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="calendar"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        vam('.topbar__title').innerText = 'Lịch dạy học'
        Calendar()
    }

}
vam('.sidebar__item[get-data="class"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="class"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        vam('.topbar__title').innerText = 'Quản lý lớp học'
        Class()
    }
}
function SetAttribute(element, Attribute, Value) {
    vam(element).setAttribute(Attribute, Value)
}

function RemoveAttribute(element, Attribute) {
    vam(element).removeAttribute(Attribute)
}


