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
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                    </div>
                    <div>
                        <p>Chiều</p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
                        <p><i class="bi bi-calendar-plus"></i></p>
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
    vam('#calender .nav-back').onclick = () => {
        vam('#calender .nav-back').remove()
        SetAttribute('#calender-learn', 'style', 'display:flex')
        SetAttribute('#createCelender', 'style', 'display:none')
    }
    for (let i = 0; i < dataCelender.length; i++) {
        startDate = dataCelender[i]['Week'].slice(0, 10)
        endDate = dataCelender[i]['Week'].slice(-10)
        if (isDateInRange(formatDate(today), startDate, endDate)) {
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
    vam('#startWeek')
}
function WtoD(day, add) {
    let tu = Number(day) + add
    if (tu < 10) {
        tu = '0' + tu
    }
    return tu = tu + startDate.slice(2)
}