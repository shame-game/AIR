function client_gd1(data, i) {
    let items = ''
    data.forEach((t) => {
        if (t['Thời gian gửi '] != '' && t['Giai đoạn chăm sóc '] == '') {
            if (t['Status - Kết bạn '] == 'Chưa là bạn') {
                i = `<i style="color:#ccaf00" class="bi bi-person-fill-exclamation"></i>`
            } else {
                i = `<i style="color:#00940b" class="bi bi-person-fill-check"></i>`
            }
            if (t['Trạng thái chăm sóc '] == '') {
                t['Trạng thái chăm sóc '] = 'Chưa chăm sóc'
            }
            items += `
                <div class="Clients" data-name="${t['Tên phụ huynh ']}" data-phone="${t['Điện thoại ']}">
                    <div><p>${t['Tên phụ huynh ']}</p></div>
                    <div><p>${t['Điện thoại ']}</p></div>
                    <div><p>${t['Trạng thái chăm sóc ']}</p></div>
                    <div class="StatusFriend">${i}</div>
                </div>
            `
        }
    })
    return items
}
function client_gd2(data, i) {
    let items = ''
    data.forEach((t) => {
        if (t['Giai đoạn chăm sóc '] == '2') {
            if (t['Status - Kết bạn '] == 'Chưa là bạn') {
                i = `<i style="color:#ccaf00" class="bi bi-person-fill-exclamation"></i>`
            } else {
                i = `<i style="color:#00940b" class="bi bi-person-fill-check"></i>`
            }
            if (t['Trạng thái chăm sóc '] == '') {
                t['Trạng thái chăm sóc '] = 'Chưa chăm sóc'
            }
            items += `
                <div class="Clients" data-name="${t['Tên phụ huynh ']}" data-phone="${t['Điện thoại ']}">
                    <div><p>${t['Tên phụ huynh ']}</p></div>
                    <div><p>${t['Điện thoại ']}</p></div>
                    <div><p>${t['Trạng thái chăm sóc ']}</p></div>
                    <div class="StatusFriend">${i}</div>
                </div>
            `
        }
    })
    return items
}

function NavClient(data) {
    vams('.GiaiDoan_nav').forEach((t) => {
        t.onclick = () => {
            vam('.GiaiDoan_nav.on').classList.remove('on');
            t.classList.add('on')
            let g = t.getAttribute('id');
            if (g == 'client_gd1') {
                vam('#ClientsWrap').innerHTML = client_gd1(data);
            }
            else if (g == 'client_gd2') {
                vam('#ClientsWrap').innerHTML = client_gd2(data);
            }
            EventClient_More(data)
        }
    })
    return client_gd1(data)
}

function EventClient_More(data) {
    vams('.Clients').forEach((t) => {
        t.onclick = () => {
            let name = t.getAttribute('data-name')
            let phone = t.getAttribute('data-phone')
            SetAttibute('#popup', 'style', 'display:block')
            SetAttibute('.popup_main', 'style', 'width:40%')
            vam('.popup_main').innerHTML =
                `<div class="Client_More-wrap">
                    <div class="Client_More-title"><h1>Thông tin khách hàng</h1></div>
                    <div class="Client_More-id">
                        <h1>Họ và tên phụ huynh: ${name}</h1>
                        <h1>Số điện thoại: ${phone}</h1>
                    </div>
                    <div class="Client_More-Status">
                        <h1>Trạng thái chăm sóc</h1>
                        <select name="tt" id="status-cs" onchange="change()">
                            <option style="padding: 5px 10px;" value="Chưa chăm sóc">Chưa chăm sóc</option>
                            <option style="padding: 5px 10px;" value="Không đồng ý">Không đồng ý</option>
                            <option style="padding: 5px 10px;" value="Đồng ý">Đồng ý</option>
                            <option style="padding: 5px 10px;" value="Chăm sóc sau">Chăm sóc sau</option>
                        </select>
                    </div>
                    <div class="Client_More-Status">
                        <h1>Chọn buổi học thử</h1>
                        <select style="margin: 0;border: 1px solid rgb(198,205,211);" name="tt" id="daytest" disabled="disabled">
                            <option style="padding: 5px 10px;" value="Chưa chọn">Chưa chọn</option>
                            ${dayTest(data)}
                        </select>
                    </div>
                    <div class="Client_More-Save">
                        <button onclick="save(${phone})">Chuyển giai đoạn 2</button>
                    </div>
                </div>`
            vam('.popup_background').onclick = () => SetAttibute('#popup', 'style', 'display:none')
        }
    })

    function dayTest(d, y) {
        d.forEach((t) => {
            if (t['Buổi dạy thử '] != '') {
                let f = `${t['Buổi dạy thử '].slice(8)}/${t['Buổi dạy thử '].slice(5, 7)}/${t['Buổi dạy thử '].slice(0, 4)}`
                y += `<option value="${f}">${f}</option>`
            }
        })
        return y
    }


}