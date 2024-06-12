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

const urlBackend = 'https://script.google.com/macros/s/AKfycbxGftEOtMtmPeDxGi0SrN7-Af0f1fkE5Wu0An-dhRDtQk-2tScouJlEOaxqW8pWyl9z4A/exec'

// Lấy dữ liệu lớp
function getlistclass() {
    var url = urlLoadClass + "?" + 'clas=test2&action=getlistclass';
    fetch(url, {
        method: 'GET'
    }).then(
        (response) => {
            if (response.ok) {
            } else {
                console.log('Lỗi trong giai đoạn lưu lớp');
            }
        }
    )
}

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
                    checkin(dataClass, dataStudent)
                })
        })
}


Class()
function SetAttibute(element, Attribute, Value) {
    vam(element).setAttribute(Attribute, Value)
}

function RemoveAttibute(element, Attribute) {
    vam(element).removeAttribute(Attribute)
}


