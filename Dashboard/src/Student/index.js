function Student(data) {
    vam('#main').innerHTML =
        `<div id="student" class="Wrap_Main">
            <div id="student-nav" class="Wrap_Nav">
                <h1 class="nav-title">Học sinh</h1>
            </div>
            <div id="student-main">
                <div id="student-left">
                    <div class="nav">
                        <div id="student_search">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text">
                                <div id="typeSearch" >
                                    <p>Tìm theo SĐT</p>
                                    <div style="display:none">
                                        <p>Tìm theo ID</p>
                                        <p>Tìm theo Tên</p>
                                    </div>
                                </div>
                        </div>
                        <div id="SearchClass">
                            <p>Tất cả</p>
                        </div>
                    </div>
                    <div class="list">
                        <div class="nav">
                            <p></p>
                            <p>MHS</p>
                            <p>Tên</p>
                            <p>SĐT Phụ huynh</p>
                        </div>
                        <div class="main"></div>
                    </div>
                </div>
                <div id="student-right">
                    <div class="nav">
                        <h1>Tổng quan học sinh</h1>
                    </div>
                    <div id="student-right_main">
                        <div class="sum" >
                            <p>Tổng số học sinh</p>
                            <h4>0</h4>
                            <p>Trong đó có <span class="nghihoc">2 học sinh nghỉ học</span></p>
                            <div>
                                <div class="lt"><p>Long Thành</p></div>
                                <div class="bh"><p>Biên Hòa</p></div>
                            </div>
                            <div style="flex-direction: column;gap:10px;justify-content: center;">
                                <div class="detail_lt">
                                    <div></div>
                                    <p>Tổng 24 học sinh, 2 học sinh nghỉ học</p>
                                </div>
                                <div class="detail_bh">
                                    <div></div>
                                    <p>Tổng 24 học sinh, 2 học sinh nghỉ học</p>
                                </div>
                            </div>
                        </div>
                        <detail style="display:none">
                            <div class="avt">
                                <img src="">
                                <div>
                                    <p class="id">ID: <span>AI0001</span></p>
                                    <p class="name">Tên: <span>Nguyên Hoàng</span></p>
                                </div>
                            </div>
                            <div class="infor">
                                <p class="lable" data="infor"><i class="fa-solid fa-circle-user"></i>Thông tin chi tiết</p>
                                <div class="detail">
                                    <p>Ngày sinh: <span></span></p>
                                    <p>Lớp: <span></span></p>
                                    <p>Liên hệ: <span></span></p>
                                    <p>Địa chỉ: <span></span></p>
                                    <p>Tình trạng học: <span></span></p>
                                    <p>Nợ học phí: <span></span></p>
                                </div>
                            </div>
                            <div class="course">
                                <p class="lable" data="course"><i class="fa-solid fa-book"></i> Khóa học <span></span></p>
                                <div class="detail">
                                    
                                </div>
                            </div>
                        </detail>
                    </div>
                </div>
            </div>
        </div>`
    vams('#student-right_main>detail .lable').forEach(t => {
        t.onclick = () => {
            if (!vam(`.${t.getAttribute('data')}>.detail.hien`)) vam(`.${t.getAttribute('data')}>.detail`).classList.add('hien')
            else vam(`.${t.getAttribute('data')}>.detail`).classList.remove('hien')
        }
    })
    ListStudent(data)
    vam('#typeSearch').onclick = () => {
        SetAttribute('#typeSearch>div', 'style', 'display:block')
        vams('#typeSearch>div>p').forEach((t) => {
            t.onclick = () => {
                let h = t.innerText
                let l = vam('#typeSearch>p').innerText
                vam('#typeSearch>p').innerText = h
                t.innerText = l
            }
        })
        document.onclick = (e) => {
            if (!vam('#typeSearch').contains(e.target)) {
                SetAttribute('#typeSearch>div', 'style', 'display:none')
            }
        };
    };
    vams('#student-left>.list>.main>div').forEach(e => {
        e.onclick = () => {
            if (vam('#student-left>.list>.main>.ac')) vam('#student-left>.list>.main>.ac').classList.remove('ac')
            e.classList.add('ac')
            detailStudent(e, data)
        }
    })
    vam('#student_search input').oninput = () => {
        vams('#student-left>.list>.main>div').forEach(t => {
            if (t.getAttribute('data-phone').includes(vam('#student_search input').value) || vam('#student_search input').value.includes(t.getAttribute('data-phone'))) t.setAttribute('style', 'display:flex')
            else t.setAttribute('style', 'display:none')
        })
    }
    SetAttribute('.load', 'style', 'display:none')
}

let backe = `<p id="back"><i class="fa-solid fa-angle-left"></i>Quay lại</p>`

async function detailStudent(e, data) {
    let id = e.getAttribute('data-id')
    let f = []
    for (i = 0; i < data.length; i++) {
        if (data[i].ID == id) {
            f = data[i]
            break;
        }
    }
    vam('#student-right>.nav h1').innerText = 'Chi tiết học sinh'
    SetAttribute('#student-right_main>detail', 'style', 'display:block')
    SetAttribute('#student-right_main>.sum', 'style', 'display:none')
    if (!vam('#back')) vam('#student-right .nav').innerHTML += backe
    vam('#student-right_main>detail .avt>img').src = f.avt
    vam('#student-right_main>detail .avt .id').innerText = f.ID
    vam('#student-right_main>detail .avt .name').innerText = f.Name
    vams('#student-right_main>detail .infor .detail p span')[0].innerText = f.BD
    vams('#student-right_main>detail .infor .detail p span')[1].innerText = f.Class
    vams('#student-right_main>detail .infor .detail p span')[2].innerText = f.PhoneMom
    vams('#student-right_main>detail .infor .detail p span')[3].innerText = f.Address
    vams('#student-right_main>detail .infor .detail p span')[4].innerText = f.Status
    vams('#student-right_main>detail .infor .detail p span')[5].innerText = f.StatusPay
    let course = ''
    let soluongc = 0
    let itemscourse = f['Course'].split('=')
    if (itemscourse[0] == '') course = `<div>Chưa tham gia khóa học nào</div>`
    else {
        for (let i in itemscourse) {
            let g = await getLoadCourse()
            for (let p in g) {
                if (g[p]['Mã khóa'] == itemscourse[i].split('-')[0]) {
                    let tiendo = g[p]['Tiến độ'].split('/')
                    tiendo = Number(tiendo[0]) / Number(tiendo[1]) * 100
                    let pay = ''
                    itemscourse[i].split('-')[1] == 'T' ? pay = '#e8ffe6' : pay = '#ffe1e1'
                    course +=
                        `<div style="background-color: ${pay}">
                            <p>${g[p]['Tên khóa học']} / Tiến độ: ${tiendo}% </p>
                            <div><div style="width:${tiendo}%"></div></div>
                        </div>`
                    soluongc++
                    break
                }
            }
        }
    }

    vam('#student-right_main>detail .course .lable span').innerText = '(' + soluongc + ')'
    vam('#student-right_main>detail .course .detail').innerHTML = course
    vam('#back').onclick = () => {
        vam('#back').remove()
        e.classList.remove('ac')
        SetAttribute('#student-right_main>detail', 'style', 'display:none')
        SetAttribute('#student-right_main>.sum', 'style', 'display:block')
        vam('#student-right>.nav h1').innerText = 'Tổng quan học sinh'
    }

}

function ListStudent(data) {
    vam('#student-right_main>.sum>h4').innerText = data.length
    let nghihoc = 0
    let bienhoa = 0
    let longthanh = 0
    data.forEach(e => {
        if (e.ID != '') {
            if (e.PhoneMom == '') e.PhoneMom = 'Không có sđt'
            vam('#student-left>.list>.main').innerHTML +=
                `<div data-id="${e.ID}" data-phone="${e.PhoneMom}" data-name="${e.Name}">
                <p><img src="${e.avt}"></p>
                <p>${e.ID}</p>
                <p>${e.Name}</p>
                <p>${e.PhoneMom}</p>
            </div>`
        }
        if (e.Status == 'Nghỉ học') nghihoc++
        e.area.trim() == 'Biên Hòa' ? bienhoa++ : longthanh++
    });
    vam('#student-right_main>.sum>p>.nghihoc').innerText = nghihoc + ' học sinh đã nghỉ học'
    vam('#student-right_main>.sum .detail_lt>p').innerText = `Tổng ${longthanh} học sinh`
    vam('#student-right_main>.sum .detail_bh>p').innerText = `Tổng ${bienhoa} học sinh`
}