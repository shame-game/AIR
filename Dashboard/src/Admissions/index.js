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
                                    <p id="act_bot_kb">Đang chăm sóc chưa là bạn</p>
                                    <p id="act_bot_kb">Đang chăm sóc đã là bạn</p>
                                    <p id="act_bot_kb">Tái chăm sóc</p>
                                    <p id="act_bot_kb">Đồng ý học thử</p>
                                    <p id="act_bot_kb">Từ chối</p>
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
                                <div id="Admissions_dashboard_sum" >
                                    <p>Tổng số data: <span></span></p>
                                </div>
                                <div id="Admissions_dashboard_Detail" style="display:none">
                                    <div class="avt">
                                        <img src=''>
                                    </div>
                                    <div class="name">
                                        <h1></h1>
                                    </div>
                                    <div class="status">
                                        <h1><i class="bi bi-graph-up"></i>Tình trạng hiện tại: </h1>    
                                        <p></p>                                    
                                    </div>
                                    <div class="animation">
                                        <h1><i class="bi bi-inboxes"></i>Hành động gần nhất:</h1>
                                        <p></p>
                                    </div>
                                    <div class="content">
                                        <h1><i class="bi bi-chat-square-text"></i>Nội dung chăm sóc gần nhất </h1>
                                        <p></p>
                                    </div>
                                    <div class="history">
                                        <h1><i class="bi bi-clock-history"></i>Lịch sử chăm sóc </h1>
                                    </div>
                                    <div class="updateStatus">
                                        <h1>Cập nhập trạng thái chăm sóc </h1>
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
    SetAttribute('.load', 'style', 'display:none')
}

function listdata(data, style, days, daye) {
    let items = ''
    let i = 0
    let k = []
    data.forEach((y) => {
        if (y['Ngày'] >= days && y['Ngày'] <= daye) {
            if (y['Kịch bản - Sale - Bot'] == style) {
                if (y['Nội dung'] == '') y['Nội dung'] = 'Chưa có nội dung chăm sóc'
                if (y['Di động'][0] != 0) y['Di động'] = '0' + y['Di động']
                items +=
                    `<div class="Admissions_main-list_items" data-phone="${y['Di động']}" data-animation='${y['Hàng động']}' data-zalo='${y['Thông tin Zalo']}' data-phone="${y['Di động']}" data-content="${y['Nội dung']}">
                        <p>${y['Họ và tên phụ huynh']}</p>
                        <p>${y['Di động']}</p>
                        <p>${y['Nội dung']}</p>
                    </div>`
                i++
            }
        }
    })
    vam('#Admissions_dashboard_sum span').innerText = i
    vam('#Admissions_main-list_data').innerHTML = items
    vams('.Admissions_main-list_items').forEach((t) => {
        let g = data
        t.onclick = () => {
            let k = []
            g.forEach((f) => {
                if (f['Di động'] == t.getAttribute('data-phone')) {
                    k = k.concat(f)
                }
            })
            let data = t.getAttribute('data-zalo').toString().split('|')
            if (vam('.Admissions_main-list_items.ac')) vam('.Admissions_main-list_items.ac').classList.remove('ac')
            t.classList.add('ac')
            vam('#Admissions_dashboard_Detail>.avt>img').src = `${data[0]}`
            vam('#Admissions_dashboard_Detail>.name>h1').innerText = data[1]
            vam('#Admissions_dashboard_Detail>.animation>p').innerText = k[k.length - 1]['Hàng động']
            vam('#Admissions_dashboard_Detail>.status p').innerText = k[k.length - 1]['Kịch bản - Sale - Bot']
            vam('#Admissions_dashboard_Detail>.content>p').innerText = t.getAttribute('data-content')
            SetAttribute('#Admissions_dashboard_sum', 'style', 'display:none')
            SetAttribute('#Admissions_dashboard_Detail', 'style', 'display:block')
            vam('#Admissions_dashboard_Detail>.updateStatus').onclick = () => UpdateStatusData(t.getAttribute('data-content'), k[k.length - 1]['Kịch bản - Sale - Bot'], k[k.length - 1]['Hàng động'], t.getAttribute('data-phone'))
            vam('#Admissions_dashboard_Detail>.history').onclick = () => HistoryData(k)
        }
    })
}
function HistoryData(data) {
    SetAttribute('#popup', 'style', 'display:block')
    SetAttribute('.popup_main', 'style', 'width:600px')
    vam('.popup_background').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
    let items = ''
    data.forEach((t) => {
        items += `<div>${t['Ngày']} - ${t['Kịch bản - Sale - Bot']} - ${t['Hàng động']}</div>`
    })
    vam('.popup_main').innerHTML =
        `<div id="updateStatus">
            <h1>Lịch sử chăm sóc</h1>
            ${items}
        </div>`
}
function UpdateStatusData(content, status, animation, phone) {
    let o = phone.split(1)
    SetAttribute('#popup', 'style', 'display:block')
    SetAttribute('.popup_main', 'style', 'width:600px')
    vam('.popup_background').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
    vam('.popup_main').innerHTML =
        `<div id="updateStatus">
            <h1>Cập nhập chăm sóc</h1>
            <div class="Status">
                <p><i class="bi bi-graph-up"></i>Trạng thái chăm sóc:</p>
                <select class="select_status">
                    <option>Từ chối</option>
                    <option>Gửi kết bạn</option>
                    <option>Đang chăm sóc chưa là bạn</option>
                    <option>Đang chăm sóc đã là bạn</option>
                    <option>Tái chăm sóc</option>
                    <option>Đồng ý học thử</option>
                    <option>Từ chối</option>
                    <option>Đã học</option>
                </select>
            </div>
            <div class="animation">
                <p><i class="bi bi-graph-up"></i>Hành động gần nhất:</p>
                <select class="select_animation">
                    <option>Gửi tin giới thiệu</option>
                    <option>Gửi tin nhắn lần 1 (Chưa kết bạn)</option>
                    <option>Gửi tin nhắn lần 2 (Chưa kết bạn)</option>
                    <option>Gọi điện giới thiệu</option>
                    <option>Học thử</option>
                    <option>Tái chăm sóc ngắn</option>
                    <option>Đồng ý học</option>
                    <option>Đồng ý kết bạn nhưng không tương tác</option>
                    <option>Nhắn tin giới thiệu</option>
                    <option>Nhắn tin thông báo</option>
                    <option>Gửi kết bạn</option>
                </select>
            </div>
            <div class="Content">
                <p><i class="bi bi-chat-square-text"></i>Nội dung chăm sóc:</p>
                <textarea type="text" class="noidungchamsoc" name="bd" placeholder="Nội dung chăm sóc" >${content}</textarea>
            </div>
            <button id="bt_updateStatus">Cập nhập</button>
        </div>`
    vams('.select_status>option').forEach((t) => {
        if (t.innerText == status) {
            t.setAttribute('selected', 'selected')
        }
    })
    vams('.select_animation>option').forEach((t) => {
        if (t.innerText == animation) {
            t.setAttribute('selected', 'selected')
        }
    })
    vam('#bt_updateStatus').onclick = () => {
        SetAttribute('.load', 'style', 'display:block')
        let a = vam('.select_animation').options[vam('.select_animation').selectedIndex].text
        let s = vam('.select_status').options[vam('.select_status').selectedIndex].text
        let c = vam('.noidungchamsoc').value
        fetch(`https://script.google.com/macros/s/AKfycbxj6jsx-MwszxiLks0u8Ck2ey6RY_9KE2qXqjizGFcMpS6gnYfQ9UckIbzO1bZRlQEfRg/exec?phone=${o}&status=${s}&animation=${a}&contents=${c}`, {
            method: 'GET'
        }).then(response => response.json())
            .then((data) => {
                lj = true
                Admissions(lj)
                SetAttribute('.load', 'style', 'display:none')
            })
            .catch(error => alert('Lỗi: ' + error));

    }
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

