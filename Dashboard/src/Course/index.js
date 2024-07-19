function CourseMain() {
    vam('#main').innerHTML =
        `<div id="course" class="Wrap_Main">
            <div id="course-nav" class="Wrap_Nav">
                <h1 class="nav-title">Khóa học</h1>
            </div>
            <div id="course-main" class="Wrap_Body">
                <div id="course-main-wrap" >
                    <h1>Danh Sách Khóa Học Chưa Kết Thúc</h1>
                    <div class="ListBox" id="course-unfinish"></div>
                    <h1>Danh Sách Khóa Học Đã Kết Thúc</h1>
                    <div class="ListBox" id="course-finish"></div>
                </div>
                <div id="course-main-detail" style="display:none">
                    <div class="left">
                        <div class="infor">
                            <div class="back"><i class="fa-solid fa-arrow-left"></i> Quay lại</div>
                            <p class="TopicGroup">AIR</p>
                            <p class="Chuong">24PR000</p>
                        </div>
                        <div class="flan"></div>
                    </div>
                    <div class="right">
                        <h4></h4><p></p>
                        <div class="im">
                            <div>Số tiết: 4</div>
                            <div>Thời gian học: 8:00 - 11:00 14/07/2024</div>
                            <div>Giáo viên dạy: Nhật</div>
                        </div>
                        <div class="cmt">
                            <h1>Nhận xét của giáo viên</h1>
                            <p></p>
                        </div>
                        <div class="sdb"></div>
                        <div class="img">
                            <h1>Hình ảnh buổi học</h1>
                            <div>
                                <a target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="more">
                        <i class="fa-solid fa-circle-info"></i><p>Học sinh</p>
                    </div>
                </div>
               
            </div>
        </div>`
    InnerListCourseI()
}

async function InnerListCourseI() {
    let data = await getLoadCourse()
    let items = ''
    let itemsfn = ''
    data.forEach(t => {
        if (t['Trạng thái'] == 'Chưa hoàn thành') {
            let tiendos = t['Tiến độ'].split('/')
            let tiendo = tiendos[0] / tiendos[1] * 100
            items +=
                `<div class="Course_wrap" data-sdb="${t['Mã Sổ đầu bài']}" data-grouT="${t['Loại']}" data-ID='${t['Mã khóa']}' data-c="${t['Tên khóa học']}">
                <div class="Course_infor">
                    <h4>Tên khóa học: ${t['Mã khóa']}</h4>
                    <span>${formatDate(t['Thời gian bắt đầu'])} - ${formatDate(t['Thời gian kết thúc'])}</span>
                    <span>Địa điểm học: ${t['Địa điểm học']}</span>
                    <div>
                        <div class="tiendo"><p>Tiến độ</p><p>${tiendos[0] + '/' + tiendos[1]} buổi</p></div>
                        <div class="thanhtiendo"><div style="width:${tiendo}%"></div></div>
                    </div>
                </div>
                <div class="Course_student">
                    <p>Số học sinh: ${t['Sỉ số']}</p>
                </div>
            </div>`
        } else {
            let tiendos = t['Tiến độ'].split('/')
            let tiendo = tiendos[0] / tiendos[1] * 100
            itemsfn +=
                `<div class="Course_wrap" data-sdb="${t['Mã Sổ đầu bài']}" data-grouT="${t['Loại']}" data-ID='${t['Mã khóa']}' data-c="${t['Tên khóa học']}">
                    <div class="Course_infor">
                        <h4>Tên khóa học: ${t['Mã khóa']}</h4>
                        <span>${formatDate(t['Thời gian bắt đầu'])} - ${formatDate(t['Thời gian kết thúc'])}</span>
                        <span>Địa điểm học: ${t['Địa điểm học']}</span>
                        <div>
                            <div class="tiendo"><p>Tiến độ</p><p>${tiendos[0] + '/' + tiendos[1]} buổi</p></div>
                            <div class="thanhtiendo"><div style="width:${tiendo}%"></div></div>
                        </div>
                    </div>
                    <div class="Course_student">
                        <p>Số học sinh: ${t['Sỉ số']}</p>
                    </div>
                </div>`
        }
    })
    vam('#course-main-wrap>#course-unfinish').innerHTML = items
    vam('#course-main-wrap>#course-finish').innerHTML = itemsfn
    vams('#course-main-wrap .Course_wrap').forEach(el => {
        el.onclick = () => {
            SetAttribute('.load', 'style', 'display:block')
            Detail(el.getAttribute('data-sdb'), el.getAttribute('data-grouT'), el.getAttribute('data-ID'), el.getAttribute('data-c'))
            vam('#course-main-detail>.left>.infor>.back').onclick = () => {
                SetAttribute('#course-main-wrap', 'style', 'display:block')
                SetAttribute('#course-main-detail', 'style', 'display:none')
            }
        }
    })
    SetAttribute('.load', 'style', 'display:none')

}

async function Detail(id, gr, idc, c) {
    vam('#course-main-detail>.left>.infor>.TopicGroup').innerText = gr
    vam('#course-main-detail>.left>.infor>.Chuong').innerText = idc + ' | ' + c
    SetAttribute('#course-main-wrap', 'style', 'display:none')
    SetAttribute('#course-main-detail', 'style', 'display:flex')
    let items = ''
    let data = await fetchSheet.fetch({ gSheetId: id }).then((datas) => { return datas.slice(1) })
    let i = 1
    let si = ''
    let l = false
    let tt = {}
    data.forEach(t => {
        const AIKeys = Object.keys(t).filter(key => key.startsWith('AI'))
        if (t[AIKeys[0]] == '') {
            if (si == 'f') {
                si = 'd ac'
                tt = t
            } else if (si == 'd ac') {
                si = ''
            }
        } else {
            si = 'f'
        }
        if (i < data.length) {
            items +=
                `<div class="topic ${si}" data-days="${t.Days}">
                    <div class="dots"></div>
                    <div class="infor">
                        <h1>${i}</h1>
                        <div>
                            <h4>${t.STopic}</h4>
                            <span>${formatDate(t.Days)}</span>
                            <p>${t.Topic}</p>
                        </div>
                    </div>
                </div>`
            i++
        } else if (i = data.length) {
            items +=
                `<div class="topic ${si}" data-days="${t.Days}">
                    <div class="infor">
                        <h1>${i}</h1>
                        <div>
                            <h4>${t.STopic}</h4>
                               <span>${formatDate(t.Days)}</span>
                            <p>${t.Topic}</p>
                        </div>
                    </div>
                </div>`
        }
    })
    vam('#course-main-detail>.left>.flan').innerHTML = items
    vam('#course-main-detail>.right>h4').innerHTML = tt.STopic + ': ' + tt.Topic
    vam('#course-main-detail>.right>p').innerHTML = c
    if (tt.Cmt == '') tt.Cmt = 'Không có nhận xét từ giáo viên'
    vam('#course-main-detail>.right>.cmt>p').innerText = tt.Cmt
    vams('#course-main-detail>.right>.im>div')[0].innerText = 'Số tiết: ' + tt.Period
    vams('#course-main-detail>.right>.im>div')[1].innerText = 'Thời gian học: ' + tt.Time + ' ' + formatDate(tt.Days)
    vams('#course-main-detail>.right>.im>div')[2].innerText = 'Giáo viên dạy: ' + tt.Teacher
    let StudentID = Object.keys(tt).filter(key => key.startsWith('AI'))
    let dataStudent = await getLoadStudent()
    let student = ''
    let morestudent = ''
    dataStudent.forEach(t => {
        for (let y in StudentID) {
            if (t.ID == StudentID[y]) {
                let k = t.Course.split('=')
                for (let i in k) {
                    if (k[i].split('-')[0] == idc) {
                        if (k[i].split('-')[1] == 'T')
                            k = 'không nợ'
                        break
                    }
                }
                if (k != 'không nợ') k = '2.500.000'
                let cm = 0
                let vk = 0
                let vc = 0
                data.forEach(l => {
                    if (l[StudentID[y]] == '2') {
                        vc++
                    } else if (l[StudentID[y]] == '0') {
                        vk++
                    } else if (l[StudentID[y]] == '1') {
                        cm++
                    }
                })
                let o = ''
                tt[StudentID[y]] == '' ? o = '' : tt[StudentID[y]] == '1' ? o = 'Có mặt' : o = 'Vắng mặt'
                student +=
                    `<div class="box_wraps">
                        <p class="avt"><img src="${t.avt}"></p>
                        <p class="id">${StudentID[y]}</p>
                        <p class="name">${t.Name}</p>
                        <p class="status">${o}</p>
                    </div>`
                morestudent +=
                    `<div class="rows">
                    <p>
                        <img src="${t.avt}">
                    </p>
                    <p>${StudentID[y]}</p>
                    <p>${t.Name}</p>
                    <p>${cm}</p>
                    <p>${vk}</p>
                    <p>${vc}</p>
                    <p>${k} vnđ</p>
                </div>`
                break
            }
        }
    })
    vam('#course-main-detail>.more').onclick = () => {
        SetAttribute('#popup', 'style', 'display:block')
        SetAttribute('.popup_main', 'style', 'width:1400px')
        vam('.popup_background').onclick = () => vam('#popup').setAttribute('style', 'display:none')
        vam('.popup_main').innerHTML =
            `<div id="form_popup" style="height: 600px;overflow-y: auto;">
                <h1>Chi tiết học sinh trong khóa học</h1>
                <div class="rows col">
                    <p></p>
                    <p>ID</p>
                    <p>Tên</p>
                    <p>Có mặt</p>
                    <p>Nghỉ không phép</p>
                    <p>Nghỉ có phép</p>
                    <p>Nợ học phí</p>
                </div>
                ${morestudent}
            </div >`
    }
    vam('#course-main-detail>.right>.sdb').innerHTML = `<h1>Sổ đầu bài</h1>
                            <div class="title">
                                <p></p>
                                <p>ID</p>   
                                <p>Họ và Tên</p>
                                <p>Trạng thái</p>
                            </div>` + student
    vam('#course-main-detail>.right>.img a').setAttribute('href', `${tt.Img}`)
    SetAttribute('.load', 'style', 'display:none')
    vams('#course-main-detail>.left>.flan>.topic').forEach(t => {
        t.onclick = () => {
            vam('#course-main-detail>.left>.flan>.topic.ac').classList.remove('ac')
            t.classList.add('ac')
            tt = getdetailcourse(data, t.getAttribute('data-days'))
            vam('#course-main-detail>.right>h4').innerHTML = tt.STopic + ': ' + tt.Topic
            vam('#course-main-detail>.right>p').innerHTML = c
            if (tt.Cmt == '') tt.Cmt = 'Không có nhận xét từ giáo viên'
            vam('#course-main-detail>.right>.cmt>p').innerText = tt.Cmt
            vams('#course-main-detail>.right>.im>div')[0].innerText = 'Số tiết: ' + tt.Period
            vams('#course-main-detail>.right>.im>div')[1].innerText = 'Thời gian học: ' + tt.Time + ' ' + formatDate(tt.Days)
            vams('#course-main-detail>.right>.im>div')[2].innerText = 'Giáo viên dạy: ' + tt.Teacher
            student = ''
            dataStudent.forEach(t => {
                StudentID.forEach(y => {
                    if (t.ID == y) {
                        let o = ''
                        tt[y] == '' ? o = '' : tt[y] == '1' ? o = 'Có mặt' : o = 'Vắng mặt'
                        student +=
                            `<div class="box_wraps">
                                <p class="avt"><img src="${t.avt}"></p>
                                <p class="id">${y}</p>
                                <p class="name">${t.Name}</p>
                                <p class="status">${o}</p>
                            </div>`
                    }
                })
            })
            vam('#course-main-detail>.right>.img a').setAttribute('href', `${tt.Img}`)
            vam('#course-main-detail>.right>.sdb').innerHTML =
                `<h1>Sổ đầu bài</h1>
                            <div class="title">
                                <p></p>
                                <p>ID</p>   
                                <p>Họ và Tên</p>
                                <p>Trạng thái</p>
                            </div>` + student
        }
    })
}

function getdetailcourse(data, tt) {
    for (let i in data) {
        if (data[i].Days == tt) {
            return data[i]
        }
    }
}