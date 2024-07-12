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
                        <input type="search">
                        <div>

                        </div>
                    </div>
                    <p>Danh sách đã chọn</p>
                    <div class="list-chon">

                    </div>
                    <p>Bước tiếp theo</p>
                </div>
                <div class="create_id_background"></div>
            </div>
        </div>`
    vams('.course_w_box_wrap').forEach(t => {
        t.onclick = () => {
            SetAttribute('#course_wrap', 'style', 'display:none')
            SetAttribute('#course_all', 'style', 'display:flex')
            vam('#course_all .run').innerHTML = apiLoadCourseDetail(t.getAttribute('data-ID'), data_t, 'Chưa hoàn thành')
            vam('#course_all .run').innerHTML += `<div class="course_box_wrap add" ><i class="fa-solid fa-plus"></i></div>`
            vam('#course_all .fn').innerHTML = apiLoadCourseDetail(t.getAttribute('data-ID'), data_t, 'Đã hoàn thành')
            vam('.course_box_wrap.add').onclick = () => {
                SetAttribute('#create_id', 'style', 'display:block')
                vam('#create_id>.create_id_wrap').classList.add('hide')
                loadCourse_Studentss()
            }
        }
    })
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

async function loadCourse_Studentss() {
    let data = await s12312312()
    console.log(data);
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