function MoreMain() {
    vam('#main').innerHTML =
        `<div id="more" class="Wrap_Main">
                <div id="more-nav" class="Wrap_Nav">
                    <h1 class="nav-title">Thêm</h1>
                </div>
                <div id="more-main" class="Wrap_Body">
                    <div class="left">
                        <div class="ground">
                            <h4>Khuyến mãi</h4>
                            <p class="wrap_getVoucher action"><i class="fa-solid fa-ticket"></i>Lấy mã voucher</p>
                            <p class="wrap_getHVoucher"><i class="fa-solid fa-clock-rotate-left"></i>Lịch sử lấy voucher</p>
                        </div>
                    </div>
                    <div class="right">
                        <div id="more_detail">
                            
                        </div>
                    </div>
                </div>
            </div>`
    layidkhuyenmai()
    vam('#more-main>.left .wrap_getVoucher').onclick = () => layidkhuyenmai()
    vam('#more-main>.left .wrap_getHVoucher ').onclick = async () => {
        vam('#more-main>.left p.action').classList.remove('action')
        vam('#more-main>.left .wrap_getHVoucher').classList.add('action')
        vam('#more-main #more_detail').innerHTML =
            `<div>Danh sách voucher</div>
            <div class="listbox">${await getListVoucher()}</div>`
    }

    SetAttribute('.load', 'style', 'display:none')
}

function layidkhuyenmai() {
    vam('#more-main>.left p.action').classList.remove('action')
    vam('#more-main>.left .wrap_getVoucher').classList.add('action')
    vam('#more-main #more_detail').innerHTML =
        `<div>Lấy mã voucher có sẵn</div>
                <form id="getVoucher_Form">
                    <div class="form_con">
                    <h3>Chọn loại khuyến mãi</h3>
                    <select class="value">
                        <option>5%</option>
                        <option>10%</option>
                        <option>20%</option>
                        <option>50%</option>
                        <option>100%</option>
                    </select>
                    </div>
                </form>
                <h6 style="color:red">*Voucher chỉ có hiệu lực trong 15 ngày, sau thời gian này voucher sẽ không còn hiệu lực</h6>
            <button class="xn" id="xn_getVoucher">Lấy mã</button>`
    vam('#xn_getVoucher').onclick = () => {
        SetAttribute('.load', 'style', 'display:block')
        let values = vam('#getVoucher_Form .value').value.slice(0, -1)
        let url = 'https://script.google.com/macros/s/AKfycbyX3VqX7kuWWuAz4hwA9gaGADvBkmqaCMCTc8gR63AkAjMlcXj-MRrAzwZjzGQrTNZZ/exec'
        fetch(`${url}?value=${values} `, { method: 'Get' })
            .then(response => response.json())
            .then((data) => GetVoucher(data, values))
            .catch(error => alert('Lỗi: ' + error));
    }
}

function GetVoucher(data, value) {
    SetAttribute('#popup', 'style', 'display:block')
    SetAttribute('.popup_main', 'style', 'width:600px')
    vam('.popup_background').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
    vam('.popup_main').innerHTML =
        `<div id="form_popup">
            <h1>Voucher giá trị ${value}%</h1>
            <div class="valueVoucher"><p>${data.voucher}</p><i id="copyVoucher" class="fa-regular fa-copy"></i></div>
            <p style="color:red">*Voucher chỉ có hiệu lực trong 15 ngày.</p>
            <button id="xn_popup">Thoát</button>
        </div> `
    SetAttribute('.load', 'style', 'display:none')
    vam('#copyVoucher').onclick = () => {
        alert('Đã lưu voucher')
        navigator.clipboard.writeText(data.voucher)
    }
    vam('#xn_popup').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
}

async function getListVoucher() {
    let data = await getLoadVoucher()
    console.log(data);
    if (!data.length) {
        return c =
            `<div style="width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;">
                <img style="width: 30%;" src="https://lh3.googleusercontent.com/d/1IG0rlPXPN9Perh8rvvQGT4_9kqcbixLz">
                <p style="font-size:20px">Không có voucher nào được tạo</p>
            </div>`
    } else {
        let items = ''
        data.forEach(t => {
            let g = ''
            const expirationDate = new Date(t['Thời gian tạo']);
            const today = new Date();
            if (today.getTime() >= expirationDate.getTime()) {
                g = 'Đã hết hạn'
            } else {
                g = 'Còn hạn'
            }
            items +=
                `<div style="display: flex;
    justify-content: space-between;
    font-size: 16px;padding:10px 20px;background: var(--color-vamx);border-bottom: 2px solid white">
                    <p style="flex:1">Voucher: ${t.Voucher}</p>
                    <p style="flex:1">Giá trị: ${t['Giá trị']}</p>
                    <p style="flex:1">Trạng thái: ${g}</p >
                    <p style="flex:1">Sử dụng: ${t['Sử dụng']}</p>
                </div>`
        })
        return items
    }
}