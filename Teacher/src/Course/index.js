function Courses(data_t, data_w) {
    vam('#main').innerHTML =
        `<div id="course" class="Wrap_Main">
            <div id="course-nav" class="Wrap_Nav">
                <h1 class="nav-title">Quản lý khóa học</h1>
            </div>
            <div id="course-main" class="Wrap_Body">
                <div id="course_wrap" >
                    <h1>Khóa học chính</h1>
                    <div>
                        ${LoadCourseWrap(data_t, data_w)}
                    </div>
                </div>
                <div id="course_all" style="display:none">
                    <h1>Khóa học đang dạy</h1>
                    <div class="run"> </div>
                    <h1>Khóa học hoàn thành</h1>
                    <div class="fn"></div>
                </div>
            </div>
            <div id="create_id" style="display:none">
                <div class="create_id_wrap">
                    <h1>Thêm học sinh</h1>
                    <p>Danh sách học sinh</p>
                    <div class="list_student">
                        <input type="search" placeholder="Tìm học sinh theo tên">
                        <div>

                        </div>
                    </div>
                    <p>Danh sách đã chọn</p>
                    <div class="list-chon">

                    </div>
                    <p class="next">Bước tiếp theo</p>
                </div>
                <div class="create_id_background"></div>
            </div>
            <div id="create_ce" style="display:none">
                <div class="create_ce_wrap">
                    <h1>Thêm lịch học</h1>
                    <div class="add"><i class="fa-solid fa-plus"></i></div>
                    <div class="wrap"></div>
                    <div class="xn_cre">Tạo lịch</div>
                </div>
                <div class="create_ce_background"></div>
            </div>
        </div>`
    vams('.course_w_box_wrap').forEach(t => {
        t.onclick = () => {
            let Courses_Cre = t.getAttribute('data-ID')
            SetAttribute('#course_wrap', 'style', 'display:none')
            SetAttribute('#course_all', 'style', 'display:flex')
            vam('#course_all .run').innerHTML = apiLoadCourseDetail(t.getAttribute('data-ID'), data_t, 'Chưa hoàn thành')
            vam('#course_all .run').innerHTML += `<div class="course_box_wrap add" ><i class="fa-solid fa-plus"></i></div>`
            vam('#course_all .fn').innerHTML = apiLoadCourseDetail(t.getAttribute('data-ID'), data_t, 'Đã hoàn thành')
            vam('.course_box_wrap.add').onclick = async () => {
                SetAttribute('#create_id', 'style', 'display:block')
                vam('#create_id>.create_id_wrap').classList.add('hide')
                vam('#create_id>.create_id_wrap>.list_student>div').innerHTML = await loadCourse_Students()
                dachon()
                chon()
                vam('#create_id>.create_id_background').onclick = () => {
                    SetAttribute('#create_id', 'style', 'display:none')
                    vam('#create_id>.create_id_wrap').classList.remove('hide')
                }
                vam('#create_id .next').onclick = () => {
                    if (!vams('#create_id>.create_id_wrap>.list-chon>.listStudent').length) {
                        alert('Phải có ít nhất một học sinh theo học')
                    } else {
                        let idStudent = ''
                        vams('#create_id>.create_id_wrap>.list-chon>.listStudent').forEach(y => idStudent += '|' + y.getAttribute('data-id'))
                        vam('#create_id>.create_id_wrap').classList.remove('hide')
                        vam('#create_id>.create_id_wrap').classList.add('gd2')
                        SetAttribute('#create_ce', 'style', 'display:block')
                        vam('#create_ce>.create_ce_wrap').classList.add('hide')
                        vam('#create_ce .add').onclick = () => AddCe()
                        vam('#create_ce>.create_ce_background').onclick = () => {
                            vam('#create_id>.create_id_wrap').classList.remove('gd2')
                            vam('#create_id>.create_id_wrap').classList.add('hide')
                            vam('#create_ce>.create_ce_wrap').classList.remove('hide')
                            SetAttribute('#create_ce', 'style', 'display:none')
                        }
                        vam('#create_ce>.create_ce_wrap>.xn_cre').onclick = () => {
                            if (!vams('#create_ce>.create_ce_wrap .box').length) {
                                alert('Lịch khởi tạo phải có ít nhất 1 ngày dạy!')
                            } else {
                                SetAttribute('.load', 'style', 'display:block')
                                let day = ''
                                let room = ''
                                let topic = ''
                                let p = ''
                                let hour = ''
                                vams('#create_ce>.create_ce_wrap .box').forEach(t => {
                                    day += '|' + t.querySelector('p[data-keys="day"]').getAttribute('data-values')
                                    room += '|' + t.querySelector('p[data-keys="room"]').getAttribute('data-values')
                                    topic += '|' + t.querySelector('p[data-keys="topic"]').getAttribute('data-values')
                                    p += '|' + t.querySelector('p[data-keys="p"]').getAttribute('data-values')
                                    hour += '|' + t.querySelector('p[data-keys="hour"]').getAttribute('data-values')
                                })
                                let url = 'https://script.google.com/macros/s/AKfycbyN2AnfR60InxPVn9k0GJh0A151kP_hjaj-AkOCVFyTF2OMAEP_txHQ6lZ4AR0WP_y1PA/exec'
                                fetch(`${url}?Course=${Courses_Cre}&ListRoom=${room.slice(1)}&ListPeriod=${p.slice(1)}&ListTime=${hour.slice(1)}&ListDays=${day.slice(1)}&ListStudent=${idStudent.slice(1)}&ListTopic=${topic.slice(1)}`, { method: 'Get' })
                                    .then(response => response.json())
                                    .then((data) => {
                                        SetAttribute('#create_id', 'style', 'display:none')
                                        vam('#create_id>.create_id_wrap').classList.remove('hide')
                                        SetAttribute('#create_ce', 'style', 'display:none')
                                        vam('#create_ce>.create_ce_wrap').classList.remove('hide')
                                        SetAttribute('.load', 'style', 'display:none')
                                        alert(data.message)
                                    })
                                    .catch(error => alert('Lỗi: ' + error));
                            }
                        }
                    }
                }
            }
        }
    })
}

function chon() {
    vams('#create_id>.create_id_wrap>.list_student>div>.listStudent').forEach(y => {
        y.onclick = () => {
            vam('#create_id>.create_id_wrap>.list-chon').innerHTML += `<div class="listStudent"  data-id="${y.getAttribute('data-id')}">${y.innerHTML}</div>`
            y.remove()
            dachon()
        }
    })
}
function dachon() {
    vams('#create_id>.create_id_wrap>.list-chon>.listStudent').forEach(g => {
        g.onclick = () => {
            vam('#create_id>.create_id_wrap>.list_student>div').innerHTML += `<div class="listStudent" data-id="${g.getAttribute('data-id')}">${g.innerHTML}</div>`
            g.remove()
            chon()
        }
    })
}

function AddCe() {
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
        vams('#form_popup input').forEach(t => {
            if (t.value == '') {
                check = false
            }
        })
        vam('#form_popup select').value == '' ? check = false : check = check

        if (check) {
            vam('#create_ce>.create_ce_wrap>.wrap').innerHTML +=
                `<div class="box">
                <p data-values="${vam('#form_popup input[name="daylearn"]').value}" data-keys="day">Thời gian: ${vam('#form_popup input[name="daylearn"]').value}</p>
                <p data-values="${vam('#form_popup input[name="topic"]').value}" data-keys="topic" style="max-width:200px;overflow:hidden;display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical">Chủ đề học: ${vam('#form_popup input[name="topic"]').value}</p>
                <p data-keys="hour" style="height:0px;overflow:hidden;" data-values="${vam('#form_popup input[name="hour"]').value}"></p>
                <p data-keys="p" data-values="${vam('#form_popup input[name="p"]').value}">Số tiết học: ${vam('#form_popup input[name="p"]').value}</p>
                <p data-keys="room" data-values="${vam('#form_popup select').value}">Phòng dạy: ${vam('#form_popup select').value}</p>
             </div>`
            SetAttribute('#popup', 'style', 'display:none')
            vam('#create_ce .add').onclick = () => {
                AddCe()
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin')
        }
    }
}

let apiCourse
function apiLoadCourseDetail(id, data, status) {
    let items = ''
    data.forEach(t => {
        if (id == t['Tên khóa học'] && t['Trạng thái'] == status) {
            items +=
                `<div class="course_box_wrap">
                    <p>Mã khóa học: ${t['Mã khóa']}</p>
                    <p>Sỉ số: ${t['Sỉ số']}</p>
                    <p>Tiến độ: ${t['Tiến độ']}</p>
                    <p>Thời gian học: ${t['Thời gian bắt đầu'] + ' đến ' + t['Thời gian kết thúc']}</p>
                    <p>Địa điểm học: ${t['Địa điểm học']}</p>
                </div>`
        }
    })
    return items
}

async function loadCourse_Students() {
    let data = await s12312312();
    let items = ''
    data.forEach(t => {
        items +=
            `<div class="listStudent" data-id="${t.ID}">
                <p style="flex:1">Tên: ${t.Name}</p>
                <p style="flex:1">Lớp: ${t.Class}</p>
                <p style="flex:1">Sđt: ${t.PhoneMom}</p>
            </div>`
    })
    return items
}

function LoadCourseWrap(data_t, data_w) {
    let items = ''
    data_w.forEach(t => {
        items +=
            `<div class="course_w_box_wrap" data-ID="${t.ID}">
                <div class="course_w_box_banner">
                    <img src="${t.Banner}">
                </div>
                <div class="course_w_box_content">
                    <div class="name">${t.Name}</div>
                    <div class="sscourse">Số khóa học đang dạy: 1</div>
                </div>
            </div>`
    })
    return items
}