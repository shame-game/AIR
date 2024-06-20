let y = true
function Student(data, datac) {
    vam('#main').innerHTML =
        `<div id="Student_main" class="Wrap_Main">
            <div id="inforStudent_background" >
                <h1 class="nav-title">Thông tin học sinh</h1>
            </div>
            <div id="inforStudent">
                <div id="inforStudent_left">
                    <div id="inforStudent_avt">
                        <img id="avt" src="${data['avt']}">
                    </div>
                    <div id="inforStudent_name">
                        <div class="name">${data['Name']}</div>
                        <div class="class">Mã số học sinh: ${data['ID']}</div>
                    </div>
                </div>
                <div id="inforStudent_right">
                    <div id="inforStudent_more">
                        <div id="inforStudent_update" class="button">
                            <i class="bi bi-pencil-square"></i>
                            Chỉnh sửa thông tin
                        </div>
                        <div id="inforStudent_offp" class="button">
                            Nghỉ Phép
                        </div>
                    </div>
                </div>
            </div>
            <div id="inforStudent-nav">
                <div id="inforStudent-nav_left">
                    <div id="inforStudent-nav_left-detail" class="on">
                        Thông tin chi tiết
                    </div>
                    <div id="inforStudent-nav_left-course" class="">
                        Thông tin học tập
                    </div>
                </div>
                <div></div>
            </div>
            <div id="inforStudent_main">
                <div id="Detail">
                    <div id="Detail_nav">
                        <h1 class="title">Thông tin chi tiết</h1>
                        <p id="ttcb" class="on">Thông tin cơ bản</p>
                        <p id="ttll" class="">Thông tin liên lạc</p>
                    </div>
                    <div id="Detail_main_ttcb">
                        <p><i class="bi bi-person-bounding-box"></i><span>Mã số học sinh: ${data.ID}</span></p>
                        <p><i class="bi bi-person-fill"></i><span>Tên học sinh: ${data.Name}</span></p>
                        <p><i class="bi bi-people-fill"></i><span>Class: ${data.Class}</span></p>
                        <p><i class="bi bi-cake-fill"></i><span>Ngày sinh: ${data.BD}</span></p>
                        <p><i class="bi bi-book-fill"></i><span>Trang thái học: ${data.Status}</span></p>
                        <p><i class="bi bi-credit-card-fill"></i><span>Trạng thái đóng tiền: ${data.StatusPay}</span></p>
                    </div>
                    <div id="Detail_main_ttll" style="display:none">
                        <p><i class="bi bi-person-fill"></i><span>Tên phụ huynh: ${data.NameParent}</span></p>
                        <p><i class="bi bi-telephone-fill"></i><span>Số điện thoại: ${data.Phone}</span></p>
                        <p><i class="bi bi-house-door-fill"></i><span>Địa chỉ: ${data.Address}</span></p>
                    </div>
                </div>
                <div id="Study" style="display:none">
                    <div id="Course_ip">
                        <h1 class="title">Khóa học đang học (<p>0</p>)</h1>
                        <div class="list"></div>
                    </div>
                    <div id="Course_fn">
                        <h1 class="title">Khóa học hoàn thành (<p>0</p>)</h1>
                        <div class="list"></div>
                    </div>
                    <div id="Course_al">
                        <h1 class="title">Khóa học khác (<p>0</p>)</h1>
                        <div class="list"></div>
                    </div>
                </div>
            </div>
            
        </div>`

    vam('#ttll').onclick = () => {
        vam('#Detail_main_ttll').setAttribute('style', 'display:flex')
        vam('#Detail_main_ttcb').setAttribute('style', 'display:none')
        vam('#Detail_nav .on').classList.remove('on')
        vam('#ttll').classList.add('on')
    }
    vam('#ttcb').onclick = () => {
        vam('#Detail_main_ttcb').setAttribute('style', 'display:flex')
        vam('#Detail_main_ttll').setAttribute('style', 'display:none')
        vam('#Detail_nav .on').classList.remove('on')
        vam('#ttcb').classList.add('on')
    }
    vam('#inforStudent-nav_left-course').onclick = () => {
        vam('#inforStudent-nav_left .on').classList.remove('on')
        let t = vam('#inforStudent-nav_left-course')
        t.classList.add('on')
        vam('#Detail').setAttribute('style', 'display:none')
        vam('#Study').setAttribute('style', 'display:flex')
        if (y) {
            SetAttribute('.load', 'style', 'display:block')
            GetCourse(datac)
            y = false
        }
    }
    vam('#inforStudent-nav_left-detail').onclick = () => {
        vam('#inforStudent-nav_left .on').classList.remove('on')
        let t = vam('#inforStudent-nav_left-detail')
        t.classList.add('on')
        vam('#Study').setAttribute('style', 'display:none')
        vam('#Detail').setAttribute('style', 'display:flex')
    }
}

let course = []
function GetCourse(datac) {
    if (course.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '1yovU5--qcwwKtDFSY48RNbXdBr72uI1PQD8Uob_79Y4',
                wSheetName: 'Course',
            }).then((c) => {
                course = strim(c)
                Course_M(course, datac);
                SetAttribute('.load', 'style', 'display:none')
            })
    } else {
        Course_M(course, datac);
        SetAttribute('.load', 'style', 'display:none')
    }
}

function Course_M(dataa, datac) {
    let iip = 0
    let ifn = 0
    let ial = 0
    dataa.forEach((T) => {
        if (datac[`${T['ID']}`]) {
            if (datac[`${T['ID']}`] == 1) {
                vam('#Course_fn .list').innerHTML +=
                    `<div class="sourse">
                        <img src="${T['Banner']}">
                        <div id="infor_course">
                            <h4>${T['Name']}</h4>
                            <p>Tiến độ: Đã hoàn thành</p>
                        </div>
                    </div>`
                ifn++
            } else {
                let f = datac[`${T['ID']}`] * 100
                vam('#Course_ip .list').innerHTML +=
                    `<div class="sourse">
                        <img src="${T['Banner']}">
                        <div id="infor_course">
                            <h4>${T['Name']}</h4>
                            <p>Tiến độ: ${f}%</p>
                            <div id="progress"><span style="width:${f}"></span></div>
                        </div>
                    </div>`
                iip++
            }
        } else {
            vam('#Course_al .list').innerHTML +=
                `<div class="sourse">
                        <img src="${T['Banner']}">
                        <div id="infor_course">
                            <h4>${T['Name']}</h4>
                        </div>
                    </div>`
            ial++
        }
    })
    vam('#Course_ip p').innerText = iip
    vam('#Course_fn p').innerText = ifn
    vam('#Course_al p').innerText = ial
}



