function CourseMain() {
    vam('#main').innerHTML =
        `<div id="course" class="Wrap_Main">
            <div id="course-nav" class="Wrap_Nav">
                <h1 class="nav-title">Khóa học</h1>
            </div>
            <div id="course-main" class="Wrap_Body">
                <div class="setting">
                    <i class="fa-solid fa-gear"></i>
                    <p>Cài đặt</p>
                </div>
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
        </div>
        <div id="more_wrap" class="fixed">
            <div class="main">
                <div class="nav">
                    <div>
                        <i class="fa-solid fa-gear"></i>
                        <p>Cài đặt</p>
                    </div>
                    <i class="fa-solid fa-xmark" id="outCourseWrap"></i>
                </div>
                <div class="root">
                    <div class="grou">
                        <p>Cài đặt khóa học</p>
                        <div>
                            <a id="openCreateCourse">Tạo khóa học</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="background"></div>
        </div>
        <div id="course_cre_1" class="fixed" style="display:none">
            <div class="main">
                <div class="nav">
                    <i id="outCreateCourse" class="fa-solid fa-xmark"></i>
                    <p>Tạo khóa học</p>
                </div>
                <div class="root">
                    <div class="warning">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <p>Chức năng tạo khóa học chưa hoàn thiện.</p>
                    </div>
                    <div class="infor course_cre_1_box">
                        <div class="title">
                            <p>Thông tin chi tiết về khóa học</p>
                            <i class="fa-solid fa-pen" id="addInforCourse"></i>
                        </div>
                        <div class="main">
                            <div class="name">
                                <p>Tên khóa học: <span>AI Fantasy Zoo 1</span></p>
                            </div>
                            <div class="address">
                                <p>Địa chỉ học: <span>Đại học lạc hồng</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="student course_cre_1_box">
                        <div class="title">
                            <p>Thêm học sinh vào khóa học</p>
                            <i class="fa-solid fa-user-plus" id="addStudentCourse"></i>
                        </div>
                        <div class="main">
                            <div class="wrap">
                                <div class="null"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                                <p>Chưa có học sinh nào</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="celedar course_cre_1_box">
                        <div class="title">
                            <p>Tạo lịch học</p>
                        </div>
                        <div class="main">
                            <div class="wrap">
                                <div class="add">
                                    <i class="fa-solid fa-plus"></i>
                                    <p>Thêm lịch dạy</p>
                                </div>  
                                
                            </div>
                        </div>
                    </div>
                    <div id="xn_create" class="xn">Tạo khóa học</div>
                </div>
            </div>
            <div class="background"></div>
        </div>
        <div id="course_cre_2" class="fixed">
            <div class="main">
                <div class="nav">
                    <i id="outCreateCourse_Infor" class="fa-solid fa-xmark"></i>
                    <p>Thêm thông tin</p>
                </div>
                <div class="root"></div>
            </div>
            <div class="background"></div>
        </div>
        `
    InnerListCourseI()
    vam('#course-main>.setting').onclick = () => {
        SetAttribute('#course-main>.setting', 'style', 'transform: translateX(100%);')
        SetAttribute('#more_wrap', 'style', 'z-index: 1')
        SetAttribute('#more_wrap>.background', 'style', 'opacity: 1;')
        SetAttribute('#more_wrap>.main', 'style', 'transform: translateX(0);')
        vam('#more_wrap>.background').onclick = () => settingwrapOut()
        vam('#more_wrap #outCourseWrap').onclick = () => settingwrapOut()
        vam('#openCreateCourse').onclick = () => {
            setTimeout(() => {
                SetAttribute('#course_cre_1>.background', 'style', 'opacity: 1')
                SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(0)')
                SetAttribute('#more_wrap>.main', 'style', 'transform: translateX(-300%)')
            }, 100)
            SetAttribute('#course_cre_1', 'style', 'z-index: 1')
            vam('#outCreateCourse').onclick = () => course_cre_1Out()
            vam('#course_cre_1>.background').onclick = () => course_cre_1Out()
            vam('#addInforCourse').onclick = () => {
                setTimeout(() => {
                    SetAttribute('#course_cre_2>.background', 'style', 'opacity: 1')
                    SetAttribute('#course_cre_2>.main', 'style', 'transform: translateX(0)')
                    SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(-25%)')
                }, 100)
                SetAttribute('#course_cre_2', 'style', 'z-index: 1')
                vam('#course_cre_2>.background').onclick = () => course_cre_2Out()
                vam('#outCreateCourse_Infor').onclick = () => course_cre_2Out()
                vam('#xn_inforCourse').onclick = () => {
                    let danhsachkhoahoc = vam('#course_cre_2 .danhsachkhoahoc').value
                    let danhsachnoihoc = vam('#course_cre_2 .danhsachnoihoc').value
                    vam('#course_cre_1>.main>.root>.infor>.main>.name span').innerText = danhsachkhoahoc
                    vam('#course_cre_1>.main>.root>.infor>.main>.address span').innerText = danhsachnoihoc
                    course_cre_2Out()
                }
            }
            vam('#addInforCourse').onclick = () => {
                vam('#course_cre_2 .root').innerHTML =
                    `<div class="infor course_cre_1_box">
                        <div class="title">
                            <p>Thông tin chi tiết về khóa học</p>
                        </div>
                        <div class="main">
                            <div class="name">
                                <p>Tên khóa học: 
                                    <select class="danhsachkhoahoc">
                                        <option>AI Fantasy Zoo 1</option>
                                    </select>
                                </p>
                            </div>
                            <div class="address">
                                <p>Địa chỉ học: 
                                    <select class="danhsachnoihoc">
                                        <option>Cơ sở 1 trường Đại học Lạc Hồng</option>
                                        <option>Trung tâm Bồi dưỡng văn hóa THCS Khai Trí</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="xn" id="xn_inforCourse">
                        Lưu thông tin khóa học
                    </div>`
                loadHTMLCourseW()
                setTimeout(() => {
                    SetAttribute('#course_cre_2>.background', 'style', 'opacity: 1')
                    SetAttribute('#course_cre_2>.main', 'style', 'transform: translateX(0)')
                    SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(-25%)')
                }, 100)
                SetAttribute('#course_cre_2', 'style', 'z-index: 1')
                vam('#course_cre_2>.background').onclick = () => course_cre_2Out()
                vam('#outCreateCourse_Infor').onclick = () => course_cre_2Out()
                vam('#xn_inforCourse').onclick = () => {
                    let danhsachkhoahoc = vam('#course_cre_2 .danhsachkhoahoc').value
                    let danhsachnoihoc = vam('#course_cre_2 .danhsachnoihoc').value
                    vam('#course_cre_1>.main>.root>.infor>.main>.name span').innerText = danhsachkhoahoc
                    vam('#course_cre_1>.main>.root>.infor>.main>.address span').innerText = danhsachnoihoc
                    course_cre_2Out()
                }
            }
            vam('#addStudentCourse').onclick = () => {
                vam('#course_cre_2 .root').innerHTML =
                    `<div class="allstudent course_cre_1_box">
                        <div class="title">
                            <p>Danh sách học sinh</p>
                        </div>
                        <div class="main"></div>
                    </div>
                    <div class="xn" id="xn_studentCourse">
                        Lưu học sinh trong khóa học
                    </div>`
                let g = []
                if (vams('#course_cre_1>.main>.root>.course_cre_1_box.student>.main .box').length) {
                    vams('#course_cre_1>.main>.root>.course_cre_1_box.student>.main .box').forEach(t => {
                        g = g.concat(t.querySelectorAll('p')[1].innerText)
                    })
                }
                loadCourse_add_Student(g)
                setTimeout(() => {
                    SetAttribute('#course_cre_2>.background', 'style', 'opacity: 1')
                    SetAttribute('#course_cre_2>.main', 'style', 'transform: translateX(0)')
                    SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(-25%)')
                }, 100)
                SetAttribute('#course_cre_2', 'style', 'z-index: 1')
                vam('#course_cre_2>.background').onclick = () => course_cre_2Out()
                vam('#outCreateCourse_Infor').onclick = () => course_cre_2Out()
                vam('#xn_studentCourse').onclick = () => {
                    let itemss = ''
                    vams('.boxStudent.ac').forEach(t => {
                        let longString = t.innerHTML
                        let shortString = `<div><i class="fa-solid fa-user-plus" aria-hidden="true"></i></div>`;
                        let result = longString.replace(shortString, "");
                        itemss +=
                            `<div class="box" data-id="${t.getAttribute('data-id')}">
                                ${result}
                                <i class="fa-solid fa-trash de">  <p>Xóa học sinh</p></i>
                            </div>`
                    })
                    vam('#course_cre_1 .student .wrap').innerHTML = itemss
                    course_cre_2Out()
                    deleStudent_Course()
                }
            }
            vam('#course_cre_1 .celedar.course_cre_1_box .add').onclick = () => AddCe()
        }
    }
}

function AddCe(c) {
    SetAttribute('#popup', 'style', 'display:block')
    SetAttribute('.popup_main', 'style', 'width:600px')
    vam('.popup_background').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
    vam('.popup_main').innerHTML =
        `<div id="form_popup">
                                <h1>Tạo lịch dạy</h1>
                                <div><p>Ngày dạy: </p><input type="date"  name="daylearn"></div>
                                <div><p>Chủ đề dạy: </p><input type="text"  name="topic" placeholder="Nhập trên chủ đề"></div>
                                <div><p>Số tiết dạy: </p><input type="number"  name="p" placeholder="Nhập số tiết dạy"></div>
                                <div><p>Giờ bắt đầu: </p><input type="time"  name="hour" ></div>
                                <div><p>Phòng dạy: </p>
                                    <select>
                                        <option>Lab-C1</option>
                                        <option>Lab-C2</option>
                                        <option>KT-C1</option>
                                        <option>KT-C2</option>
                                    </select>
                                </div>
                                <button id="xn_popup">Thêm lịch</button>
                            </div>`
    vam('#xn_popup').onclick = () => {
        let check = true
        vams('#form_popup input').forEach(t => { if (t.value == '') check = false })
        vam('#form_popup select').value == '' ? check = false : check = check
        if (check) {
            vam('#course_cre_1>.main>.root>.course_cre_1_box.celedar>.main .wrap').innerHTML +=
                `<div class="box">
                    <p><i class="fa-solid fa-calendar-days"></i>${vam('#form_popup input[name="daylearn"]').value}</p>
                    <p><i class="fa-solid fa-book-bookmark"></i>${vam('#form_popup input[name="topic"]').value}</p>
                    <p><i class="fa-solid fa-clock"></i>${vam('#form_popup input[name="hour"]').value}</p>
                    <p><i class="fa-solid fa-chalkboard-user"></i>${vam('#form_popup select').value}</p>
                    <i class="fa-solid fa-trash de">  <p>Xóa lịch dạy</p></i>
                </div>`
            SetAttribute('#popup', 'style', 'display:none')
            vam('#course_cre_1 .celedar.course_cre_1_box .add').onclick = () => AddCe()
        } else {
            alert('Vui lòng điền đầy đủ thông tin')
        }
    }
    return
}

function deleStudent_Course() {
    vams('#course_cre_1>.main .course_cre_1_box.student .box').forEach(t => {
        t.onclick = () => {
            SetAttribute('#popup', 'style', 'display:block')
            SetAttribute('.popup_main', 'style', 'width:500px')
            vam('.popup_background').onclick = () => {
                vam('#popup').setAttribute('style', 'display:none')
            }
            vam('.popup_main').innerHTML =
                `<div id="form_popup">
                    <h1>Thông báo</h1>
                    <p>Bạn có chắc chắn muốn xóa học sinh có id ${t.getAttribute('data-id')}</p>
                    <div>
                        <a id="xn_deleS" class="xn">Tiếp tục xóa</a>
                    </div>
                </div>`
            vam('#xn_deleS').onclick = () => {
                vam('#popup').setAttribute('style', 'display:none')
                t.remove()
            }
        }
    })
}

async function loadHTMLCourseW() {
    let data = await getLoadCoursew()
    let items = ''
    data.forEach(t => {
        items += `<option> ${t.Name}</option>`
    })
    vam('#course_cre_2 .danhsachkhoahoc').innerHTML = items
}

async function loadCourse_add_Student(g) {
    let k = true
    if (g.length) {
        k = false
    }
    console.log(k);
    let data = await getLoadStudent()
    let items = ''
    data.forEach(t => {
        if (k) {
            items +=
                `<div class="boxStudent" data-id="${t.ID}">
                <p><img scr="${t.avt}"></p>
                <p>${t.ID}</p>
                <p>${t.Name}</p>
                <div><i class="fa-solid fa-user-plus"></i></div>
            </div>`
        } else {
            let u = true
            for (let l in g) {
                if (g[l] == t.ID) {
                    items +=
                        `<div class="boxStudent ac" data-id="${t.ID}">
                    <p><img scr="${t.avt}"></p>
                    <p>${t.ID}</p>
                    <p>${t.Name}</p>
                    <div><i class="fa-solid fa-user-plus"></i></div>
                </div>`
                    u = false
                    break
                }
            }
            if (u) {
                items +=
                    `<div class="boxStudent" data-id="${t.ID}">
                    <p><img scr="${t.avt}"></p>
                    <p>${t.ID}</p>
                    <p>${t.Name}</p>
                    <div><i class="fa-solid fa-user-plus"></i></div>
                </div>`
            }
        }

    })
    vam('#course_cre_2 .allstudent.course_cre_1_box .main').innerHTML = items
    vams('.boxStudent').forEach(c => {
        c.onclick = () => {
            if (c.getAttribute('class') == 'boxStudent ac') c.classList.remove('ac')
            else c.classList.add('ac')
        }
    })
}

function course_cre_2Out() {
    setTimeout(() => SetAttribute('#course_cre_2', 'style', 'z-index: -1'), 300)
    SetAttribute('#course_cre_2>.background', 'style', 'opacity: 0')
    SetAttribute('#course_cre_2>.main', 'style', 'transform: translateX(100%)')
    SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(0)')
    return
}
function course_cre_1Out() {
    setTimeout(() => SetAttribute('#course_cre_1', 'style', 'z-index: -1'), 300)
    SetAttribute('#course_cre_1>.background', 'style', 'opacity: 0')
    SetAttribute('#course_cre_1>.main', 'style', 'transform: translateX(100%)')
    SetAttribute('#more_wrap>.main', 'style', 'transform: translateX(0)')
    return
}

function settingwrapOut() {
    SetAttribute('#more_wrap>.background', 'style', 'opacity: 0;')
    SetAttribute('#more_wrap>.main', 'style', 'transform: translateX(100%);')
    SetAttribute('#course-main>.setting', 'style', 'transform: translateX(0);')
    setTimeout(() => SetAttribute('#more_wrap', 'style', 'z-index: -1'), 300)
    return
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
                `<div div class="Course_wrap" data-sdb="${t['Mã Sổ đầu bài']}" data-grouT="${t['Loại']}" data-ID='${t['Mã khóa']}' data-c="${t['Tên khóa học']}" >
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
            </div > `
        } else {
            let tiendos = t['Tiến độ'].split('/')
            let tiendo = tiendos[0] / tiendos[1] * 100
            itemsfn +=
                `<div div class="Course_wrap" data-sdb="${t['Mã Sổ đầu bài']}" data-grouT="${t['Loại']}" data-ID='${t['Mã khóa']}' data-c="${t['Tên khóa học']}" >
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
                </div > `
        }
    })
    vam('#course-main-wrap>#course-unfinish').innerHTML = items
    vam('#course-main-wrap>#course-finish').innerHTML = itemsfn
    vams('#course-main-wrap .Course_wrap').forEach(el => {
        el.onclick = () => {
            SetAttribute('#course-main>.setting', 'style', 'display:none')
            SetAttribute('.load', 'style', 'display:block')
            Detail(el.getAttribute('data-sdb'), el.getAttribute('data-grouT'), el.getAttribute('data-ID'), el.getAttribute('data-c'))
            vam('#course-main-detail>.left>.infor>.back').onclick = () => {
                SetAttribute('#course-main-wrap', 'style', 'display:block')
                SetAttribute('#course-main-detail', 'style', 'display:none')
                SetAttribute('#course-main>.setting', 'style', 'display:flex')
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
    let st = {}
    data.forEach(t => {
        if (i == 1) st = t
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
                `<div div class="topic ${si}" data - days="${t.Days}" >
                    <div class="dots"></div>
                    <div class="infor">
                        <h1>${i}</h1>
                        <div>
                            <h4>${t.STopic}</h4>
                            <span>${formatDate(t.Days)}</span>
                            <p>${t.Topic}</p>
                        </div>
                    </div>
                </div > `
            i++
        } else if (i = data.length) {
            items +=
                `<div div class="topic ${si}" data - days="${t.Days}" >
                    <div class="infor">
                        <h1>${i}</h1>
                        <div>
                            <h4>${t.STopic}</h4>
                            <span>${formatDate(t.Days)}</span>
                            <p>${t.Topic}</p>
                        </div>
                    </div>
                </div > `
        }
    })
    console.log(data);
    console.log(vam('#course-main-detail>.left>.flan'));
    vam('#course-main-detail>.left>.flan').innerHTML = items
    if (!vam('#course-main-detail>.left>.flan>.topic.ac')) {
        tt = st
        vams('#course-main-detail>.left>.flan>.topic')[0].classList.add('ac')
    }

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
                            k = '0'
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
                    `<div div class="box_wraps" >
                        <p class="avt"><img src="${t.avt}"></p>
                        <p class="id">${StudentID[y]}</p>
                        <p class="name">${t.Name}</p>
                        <p class="status">${o}</p>
                    </div > `
                morestudent +=
                    `<div div class="rows" >
                    <p>
                        <img src="${t.avt}">
                    </p>
                    <p>${StudentID[y]}</p>
                    <p>${t.Name}</p>
                    <p>${cm}</p>
                    <p>${vk}</p>
                    <p>${vc}</p>
                    <p>${k} vnđ</p>
                </div > `
                break
            }
        }
    })
    vam('#course-main-detail>.more').onclick = () => {
        SetAttribute('#popup', 'style', 'display:block')
        SetAttribute('.popup_main', 'style', 'width:1400px;height:500px')
        vam('.popup_background').onclick = () => vam('#popup').setAttribute('style', 'display:none')
        vam('.popup_main').innerHTML =
            `<div div id = "form_popup" style = "height: 100%;overflow-y: auto;" >
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
            </div > `
    }
    vam('#course-main-detail>.right>.sdb').innerHTML = `<h1 h1 > Sổ đầu bài</h1 >
                    <div class="title">
                        <p></p>
                        <p>ID</p>
                        <p>Họ và Tên</p>
                        <p>Trạng thái</p>
                    </div>` + student
    vam('#course-main-detail>.right>.img a').setAttribute('href', `${tt.Img} `)
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
                            `<div div class="box_wraps" >
                                <p class="avt"><img src="${t.avt}"></p>
                                <p class="id">${y}</p>
                                <p class="name">${t.Name}</p>
                                <p class="status">${o}</p>
                            </div > `
                    }
                })
            })
            vam('#course-main-detail>.right>.img a').setAttribute('href', `${tt.Img} `)
            vam('#course-main-detail>.right>.sdb').innerHTML =
                `<h1 h1 > Sổ đầu bài</h1 >
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