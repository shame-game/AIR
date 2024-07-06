function AdmissionsPage(data) {
    vam('#main').innerHTML =
        `<div id="calender" class="Wrap_Main">
            <div id="calender-nav" class="Wrap_Nav">
                <h1 class="nav-title">Tuyển sinh</h1>
            </div>
            <div id="Admissions_wrap">
                <div id="Admissions">
                    <div id="Admissions_nav">
                        <div>
                            <div class="Act_ac">Gửi kết bạn</div>
                            <div class="Time_ac">Ngày ${hidedate(new Date)} đến ${hidedate(new Date)}</div>
                        </div>
                        <div>
                            <div id="function_bot" class="nav_bot">
                                <i class="bi bi-database-gear"></i>
                            </div>
                            <div id="time_bot" class="nav_bot">
                                <i class="bi bi-calendar-check"></i>
                                <div>
                                    <p><input type="date" id="time_bot_start" value="${formatDate(new Date)}"> đến <input id="time_bot_end" type="date" value="${formatDate(new Date)}"></p>
                                    <p id="time_bot_save">Lọc</p>
                                </div>
                            </div>
                            <div id="act_bot" class="nav_bot">
                                <i class="bi bi-bar-chart-steps"></i>
                                <div>
                                    <p id="act_bot_th">Data thô</p>
                                    <p id="act_bot_kb">Gửi kết bạn</p>
                                </div>
                            </div>
                            <div id="avt_bot">
                                <img src="https://zpsocial-f58-org.zadn.vn/949e97ac5188b1d6e899.jpg">
                            </div>
                        </div>
                    </div>
                    <div id="Admissions_main">
                        <div id="Admissions_main-list">
                            <div id="Admissions_main-list_nav">
                                <p>Tên phụ huynh</p>
                                <p>Số điện thoại</p>
                                <p>Nội dung</p>
                            </div>
                            <div id="Admissions_main-list_data"></div>
                        </div>
                        <div id="Admissions_dashboard">
                            <div>
                                <div id="Admissions_dashboard_nav">
                                    <p>Thông tin chi tiết</p>
                                </div>
                                <div id="Admissions_dashboard_sum" style="display:none">
                                    <p>Tổng số data: <span></span></p>
                                </div>
                                <div id="Admissions_dashboard_Detail">
                                    <div class="avt">
                                        <img src='https://s240-ava-talk.zadn.vn/e/5/7/c/4/240/3362a2dbc12990e8def78d5f6f907a98.jpg'>
                                    </div>
                                    <div class="name">
                                        <h1>Minh Dung</h1>
                                    </div>
                                    <div class="status">
                                        <h1><i class="bi bi-graph-up"></i>Tình trạng: Gửi kết bạn</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    listdata(data, 'Gửi kết bạn', hidedate(new Date), hidedate(new Date))
    vam('#act_bot').onclick = () => {
        SetAttribute('#time_bot>div', 'style', 'display:none')
        SetAttribute('#act_bot>div', 'style', 'display:block')
        vams('#act_bot>div>p').forEach((t) => {
            t.onclick = () => {
                let h = t.innerText
                let sday = hidedate(vam('#time_bot_start').value)
                let eday = hidedate(vam('#time_bot_end').value)
                SetAttribute('#act_bot>div', 'style', 'display:none')
                listdata(data, h, sday, eday)
                vam('.Act_ac').innerText = h
            }
        })
        document.onclick = (e) => {
            if (!vam('#act_bot').contains(e.target)) {
                SetAttribute('#act_bot>div', 'style', 'display:none')
            }
        };
    };
    vam('#time_bot').onclick = () => {
        SetAttribute('#act_bot>div', 'style', 'display:none')
        SetAttribute('#time_bot>div', 'style', 'display:block')
        vam('#time_bot_save').onclick = () => {
            let sday = hidedate(vam('#time_bot_start').value)
            let eday = hidedate(vam('#time_bot_end').value)
            SetAttribute('#time_bot>div', 'style', 'display:none')
            listdata(data, vam('.Act_ac').innerText, sday, eday)
            vam('.Time_ac').innerText = `Ngày ${sday} đến ${eday}`
        }
        document.onclick = (e) => {
            if (!vam('#time_bot').contains(e.target)) {
                SetAttribute('#time_bot>div', 'style', 'display:none')
            }
        };
    };

}

function listdata(data, style, days, daye) {
    console.log(data);
    let items = ''
    let i = 0
    data.forEach((y) => {
        if (y['Ngày'] >= days && y['Ngày'] <= daye) {
            if (y['Kịch bản - Sale - Bot'] == style) {
                items +=
                    `<div class="Admissions_main-list_items" data-zalo='${y['Thông tin Zalo']}'>
                        <p>${y['Họ và tên phụ huynh']}</p>
                        <p>${y['Di động']}</p>
                        <p>${y['Kết quả - bot'].split(',')[0]}</p>
                    </div>`
                i++
            }
        }
    })
    vam('#Admissions_dashboard_sum span').innerText = i
    vam('#Admissions_main-list_data').innerHTML = items
    vams('.Admissions_main-list_items').forEach((t) => {
        t.onclick = () => {
            let data = t.getAttribute('data-zalo').split
            vam('.Admissions_main-list_items.ac').classList.remove('ac')
            t.classList.add('ac')
            SetAttribute('#Admissions_dashboard_sum', 'style', 'display:none')
            SetAttribute('#Admissions_dashboard_Detail', 'style', 'display:block')

        }
    })
}

function formatDate(dateString) {
    // Chuyển đổi đầu vào thành đối tượng Date
    const date = new Date(dateString);

    // Lấy các thành phần của ngày tháng năm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Trả về chuỗi định dạng
    return `${year}-${month}-${day}`;
}

function hidedate(dateString) {
    // Chuyển đổi đầu vào thành đối tượng Date
    const date = new Date(dateString);

    // Lấy các thành phần của ngày tháng năm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Trả về chuỗi định dạng
    return `${day}/${month}/${year}`;
}

