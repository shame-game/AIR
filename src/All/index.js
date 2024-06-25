

const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
const urlBackend = 'https://script.google.com/macros/s/AKfycbyUDsk2JBuTRaaHWLJTOAAYpqQiI-HJb_m2qyEG8cQHlQxnWCsmTkMkBx48rOvkW2Ae-Q/exec'
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

window.onload = () => document.querySelector('.loadweb').remove();

// Mở trang quản lý lớp học
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
let calendarNow = []
function Celender() {
    let Daystart = new Date()
    if (calendarNow.length === 0) {
        fetch(`https://script.google.com/macros/s/AKfycbw1w3ZTtVQo1wk2KaFIFSg8KR6ZA9hK8HJjolzM3ZonSDfoJad5FvUHYtI1ZcE_ywCC-g/exec?Daystart=${Daystart}&Dayend=${Daystart}`, { method: 'Get' })
            .then(response => response.json())
            .then((data) => {
                calendarNow = data
                CalendarNav(calendarNow)
                SetAttribute('.load', 'style', 'display:none')
            })
            .catch(error => alert('Lỗi: ' + error));
    } else {
        CalendarNav(calendarNow)
        SetAttribute('.load', 'style', 'display:none')
    }
}
// Mở trang lịch dạy

