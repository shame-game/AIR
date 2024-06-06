let g = document.cookie.split(';');

let h = 0

for (let i = 0; i < g.length; i++) {
    let cookie = g[i].trim();
    console.log(cookie);
    if (cookie.indexOf('vamnaone' + '=') === 0) {
        h++
    }
}

if (h == 0) {
    window.location.href = "http://127.0.0.1:5501/login.html"
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

var urlGD1 = 'https://script.google.com/macros/s/AKfycbwUpTAo4i4IblEaZBr-8UPVZXXH-1ZoewQCRoKxsXN_nR_1bpmH70JwhQaSlSD8X6Dxpw/exec'
var urlLoadClass = 'https://script.google.com/macros/s/AKfycbzbnj0iU5eMXrh9i4g7285ryzMiK6Vv4YzIB9x4FJgfP0hoeLOYUaG9HC8YdAK885iZmA/exec'
getlistclass((callback, data) => {
    document.querySelector('.loadweb').remove();
    manager(data)
    vams('.sidebar__item').forEach((y) => {
        y.onclick = () => {
            vam('.topbar__title').innerText = y.innerText
            vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
            y.classList.add('sidebar__item--actived')
            if (y.innerText == 'Điểm danh') {
                checkin(callback)
            } else if (y.innerText == 'Tuyển sinh') {
                manager(data)
            }
        }
    })
})

// Lấy dữ liệu lớp
function getlistclass(callback) {
    var url = urlLoadClass + "?" + 'clas=test2&action=getlistclass';
    fetch(url, {
        method: 'GET'
    }).then(
        (response) => {
            if (response.ok) {
                fetchSheet
                    .fetch({
                        gSheetId: '1BgcahpJSkCLv0nV5Lb8_qLYgGPD_RF6GMUh4dA5nbew',
                        wSheetName: 'All Class',
                    }).then((rows) => {
                        let dataclass = []
                        rows.forEach((t) => {
                            if (t['ID'] != '0') {
                                dataclass = dataclass.concat(t)
                            }
                        })
                        fetchSheet
                            .fetch({
                                gSheetId: '1H0R5zQ4B9VkcBzXpeFbXNLgXVuMWoRu5IDRAC8ROgeI',
                                wSheetName: 'Data',
                            }).then((data) => {
                                console.log(data);
                                callback(dataclass, data)
                            })
                    })
            } else {
                console.log('Lỗi trong giai đoạn lưu lớp');
            }
        }
    )
}

function SetAttibute(element, Attribute, Value) {
    vam(element).setAttribute(Attribute, Value)
}

function RemoveAttibute(element, Attribute) {
    vam(element).removeAttribute(Attribute)
}


