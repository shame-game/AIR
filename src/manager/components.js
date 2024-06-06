// Hàm hiển thị giao diện chính trang khách hàng 
function manager(data) {
    vam('#main').innerHTML = `
        <div class="Client_Menu">
            <div id="Time_Client">
                <input type="date" value="2024-05-31">
            </div>   
            <div class="GiaiDoan_nav on" id="client_gd1">
                <h1>Giai Đoạn 1</h1>
            </div> 
            <div class="GiaiDoan_nav" id="client_gd2">
                <h1>Giai Đoạn 2</h1>
            </div> 
            <div class="GiaiDoan_nav" id="GiaiDoan3">
                <h1>Giai Đoạn 3</h1>
            </div> 
        </div>
        <div class="Clients-Title">
                <div><p>Tên phụ huynh</p></div>
                <div><p>Điện thoại</p></div>
                <div><p>Trạng thái chăm sóc</p></div>
                <div class="StatusFriend">Trạng thái kết bạn</div>
            </div>
        <div id="ClientsWrap">
            ${client_gd1(data)}
        </div>  
    `
    NavClient(data)
    EventClient_More(data)
}

// Cập nhập trạng thái khách hàng
function change() {
    if (vam('#status-cs').value == 'Đồng ý') {
        RemoveAttibute('#daytest', 'disabled')
    } else {
        SetAttibute('#daytest', 'disabled', 'disabled')
        vam('#daytest').value = 'Chưa chọn'
    }
}

function save(phone) {
    let phones = '0' + phone;
    let value = vam('#status-cs').value
    let time = vam('#daytest').value
    var url = urlGD1 + "?" + `phone=${`${phones}`}&values=${`${value}`}&time=${`${time}`}`;
    fetch(url, {
        method: 'GET'
    }).then(
        (response) => {
            if (response.ok) {
                console.log('Chạy được');
            } else {
                console.log('Bị lỗi trong giai đoạn tạo lớp');
            }
        }
    )
}