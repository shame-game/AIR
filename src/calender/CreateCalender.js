function CreateCelender(dataCelender, dataClass, dataStudent, dataCourse) {
    SetAttribute('#calender-learn', 'style', 'display:none')
    SetAttribute('#createCelender', 'style', 'display:flex')
    vam('#calender-nav').innerHTML += nav_back
    vam('#calender-nav>.nav-title').innerText = 'Thêm lịch dạy cho giáo viên'
    vam('#createCelender').innerHTML =
        `<div id="createCelender_wrap">
            <div id="createCelender_more">
                <div id="createCelender_days">
                    <input type="date">
                </div>
                <div id="createCelender_week">
                    <p id="startWeek"></p>
                    <p>Đến ngày</p>
                    <p id="endWeek"></p>
                </div>
                <div id="saveCreateCelender">
                    <p>Lưu cập nhập</p>
                </div>
            </div>
            <div id="createCelender_main">
                <div id="createCelender_main-title">
                    <div><p>Buổi</p></div>
                    <div>
                        <p>Thứ 2</p>
                        <p id="mo-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Thứ 3</p>
                        <p id="tu-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Thứ 4</p>
                        <p id="we-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Thứ 5</p>
                        <p id="th-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Thứ 6</p>
                        <p id="fr-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Thứ 7</p>
                        <p id="sa-days">Thứ 2</p>
                    </div>
                    <div>
                        <p>Chủ Nhật</p>
                        <p id="su-days">Thứ 2</p>
                    </div>
                </div>
                <div id="createCelender_main-content">
                    <div>
                        <p>Sáng</p>
                        <p class="event_createC" id="mo-morning">Trống</p>
                        <p class="event_createC" id="tu-morning">Trống</p>
                        <p class="event_createC" id="we-morning">Trống</p>
                        <p class="event_createC" id="th-morning">Trống</p>
                        <p class="event_createC" id="fr-morning">Trống</p>
                        <p class="event_createC" id="sa-morning">Trống</p>
                        <p class="event_createC" id="su-morning">Trống</p>
                    </div>
                    <div>
                        <p>Chiều</p>
                        <p class="event_createC" id="mo-afternoon">Trống</p>
                        <p class="event_createC" id="tu-afternoon">Trống</p>
                        <p class="event_createC" id="we-afternoon">Trống</p>
                        <p class="event_createC" id="th-afternoon">Trống</p>
                        <p class="event_createC" id="fr-afternoon">Trống</p>
                        <p class="event_createC" id="sa-afternoon">Trống</p>
                        <p class="event_createC" id="su-afternoon">Trống</p>
                    </div>
                </div>
            </div>
        </div>`
    let dateInput = document.querySelector('#createCelender_days>input');
    // Lấy ngày hôm nay
    let today = new Date();
    // Chuyển đổi ngày hôm nay thành chuỗi định dạng YYYY-MM-DD
    let todayString = today.toISOString().slice(0, 10);
    dateInput.value = todayString;

    vams('.event_createC').forEach((t) => {
        t.onclick = () => {
            let endday = vam('#endWeek').innerText
            for (i = 0; i < dataCelender.length; i++) {
                if (dataCelender[i]['Week'].slice(13) == endday) {
                    fetchSheet
                        .fetch({
                            gSheetId: dataCelender[i]['ID']
                        }).then((day) => {
                            let g = updateC(day, t.getAttribute('id')).split('-')
                            if (g != '') {
                                SetAttribute('#popup', 'style', 'display:block')
                                SetAttribute('.popup_main', 'style', 'width: 600px;')
                                vam('.popup_main').innerHTML =
                                    `<div id="List-SetC"></div>`
                                SetAttribute('.popup_background', 'style', 'display:block')
                                for (i = 0; i < g.length; i++) {
                                    let gl = g[i].split('|')
                                    vam('#List-SetC').innerHTML +=
                                        `<div>
                                            <p>Tên lớp: ${gl[0]}</p>
                                            <p>Tên khóa: ${gl[1]}</p>
                                            <p>Địa chỉ: ${gl[2]}</p>
                                        </div>`
                                }
                                vam('.popup_main').innerHTML +=
                                    `<div id="add_Celender">
                                        <p>Thêm lịch dạy </p> <i class="bi bi-cloud-plus"></i>
                                    </div>`
                                // Out
                                vam('.popup_background').onclick = () => {
                                    SetAttribute('#popup', 'style', 'display:none')
                                }
                            } else {
                                SetAttribute('#popup', 'style', 'display:block')
                                SetAttribute('.popup_main', 'style', 'width: 600px;')
                                vam('.popup_main').innerHTML =
                                    `<div id="List-SetC"></div>`
                                SetAttribute('.popup_background', 'style', 'display:block')
                                vam('.popup_main').innerHTML +=
                                    `<div id="add_Celender">
                                        <p>Thêm lịch dạy </p> <i class="bi bi-cloud-plus"></i>
                                    </div>`
                                // Out
                                vam('.popup_background').onclick = () => {
                                    SetAttribute('#popup', 'style', 'display:none')
                                }
                            }
                        })
                    break;
                }
            }
        }
    })
    vam('#calender .nav-back').onclick = () => {
        vam('#calender .nav-back').remove()
        SetAttribute('#calender-learn', 'style', 'display:flex')
        SetAttribute('#createCelender', 'style', 'display:none')
    }

    LoadW(dataCelender, today)
    vam('#createCelender_days>input').onchange = () => {
        LoadW(dataCelender, new Date(vam('#createCelender_days>input').value))
        getCelender(dataCelender, vam('#endWeek').innerText)
    }

    // Load lịch đã có lên giao diện
    getCelender(dataCelender, vam('#endWeek').innerText)
}
// Lấy dữ liệu lịch đã có
function getCelender(dataCelender, endday) {
    for (i = 0; i < dataCelender.length; i++) {
        if (dataCelender[i]['Week'].slice(13) == endday) {
            fetchSheet
                .fetch({
                    gSheetId: dataCelender[i]['ID']
                }).then((day) => {
                    LocDay(day[0]['Thứ 2'], vam('#mo-morning'))
                    LocDay(day[0]['Thứ 3'], vam('#tu-morning'))
                    LocDay(day[0]['Thứ 4'], vam('#we-morning'))
                    LocDay(day[0]['Thứ 5'], vam('#th-morning'))
                    LocDay(day[0]['Thứ 6'], vam('#fr-morning'))
                    LocDay(day[0]['Thứ 7'], vam('#sa-morning'))
                    LocDay(day[0]['Chủ Nhật'], vam('#su-morning'))
                })
            break;
        }
    }
}


// Xử lý lọc ngày theo thứ
function LocDay(day, e) {
    let s = day.split('-')
    e.innerHTML = ''
    s.forEach((t) => {
        if (t == '') {
            e.innerHTML += `<p>Trống</p>`
        } else {
            let parts = t.split('|');
            e.innerHTML += `<p>${t.split('|', 1)} - ${parts[1]}</p>`
        }
    })
}


function WtoD(day, add) {
    let tu = Number(day) + add
    if (tu < 10) {
        tu = '0' + tu
    }
    return tu = tu + startDate.slice(2)
}

function LoadW(dataCelender, data) {
    for (let i = 0; i < dataCelender.length; i++) {
        startDate = dataCelender[i]['Week'].slice(0, 10)
        endDate = dataCelender[i]['Week'].slice(-10)
        if (isDateInRange(formatDate(data), startDate, endDate)) {
            vam('#mo-days').innerText = startDate
            vam('#tu-days').innerText = WtoD(startDate.slice(0, 2), 1)
            vam('#we-days').innerText = WtoD(startDate.slice(0, 2), 2)
            vam('#th-days').innerText = WtoD(startDate.slice(0, 2), 3)
            vam('#fr-days').innerText = WtoD(startDate.slice(0, 2), 4)
            vam('#sa-days').innerText = WtoD(startDate.slice(0, 2), 5)
            vam('#su-days').innerText = endDate
            vam('#startWeek').innerText = 'Lịch từ ' + startDate
            vam('#endWeek').innerText = endDate
        }
    }
}

// Nhận dạng cập nhập
function updateC(day, c) {
    let g = 0
    let h = ''
    if (c == 'mo-morning') {
        g = 0
        h = 'Thứ 2'
    }
    else if (c == 'tu-morning') {
        g = 0
        h = 'Thứ 3'
    }
    else if (c == 'we-morning') {
        g = 0
        h = 'Thứ 4'
    }
    else if (c == 'th-morning') {
        g = 0
        h = 'Thứ 5'
    }
    else if (c == 'fr-morning') {
        g = 0
        h = 'Thứ 6'
    }
    else if (c == 'sa-morning') {
        g = 0
        h = 'Thứ 7'
    }
    else if (c == 'su-morning') {
        g = 0
        h = 'Chủ Nhật'
    }
    else if (c == 'mo-afternoon') {
        g = 1
        h = 'Thứ 2'
    }
    else if (c == 'tu-afternoon') {
        g = 1
        h = 'Thứ 3'
    }
    else if (c == 'we-afternoon') {
        g = 1
        h = 'Thứ 4'
    }
    else if (c == 'th-afternoon') {
        g = 1
        h = 'Thứ 5'
    }
    else if (c == 'fr-afternoon') {
        g = 1
        h = 'Thứ 6'
    }
    else if (c == 'sa-afternoon') {
        g = 1
        h = 'Thứ 7'
    }
    else if (c == 'su-afternoon') {
        g = 1
        h = 'Chủ Nhật'
    }
    return day[g][h];
}
