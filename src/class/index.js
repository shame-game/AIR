function classN(dataClass) {
    vam('#main').innerHTML =
        `<div id="class">
            <div id="class-nav">
                <h1 class="nav-title">Danh sách lớp học</h1>
            </div>
            <div id="class-content">
                <div class="filter">
                    <div class="filter-wrap" id="schoolYear">
                        <h1>Niên khóa: <p>2024</p></h1>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                </div>
                <div id="checkin_listclass-wrap" class="list-box">
                    <div id="checkin_listclass">
                        ${listclass(dataClass)}
                        <div class="class_banner" id="addclass">
                            <i class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div id="manager-class-content">
                <div class="Class-detail_detailClass">
                <div>
                    <div id="Class-detail_detailClass-avt"></div>
                    <div id="Class-detail_detailClass_content"></div>
                </div>
            </div>
            <div class="Class-detail_allStudent">
            <div>
                <div id="Class-detail_allStudent_title">
                    <h1>Học sinh trong lớp</h1>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <div id="Class-detail_allStudent_listWrap">
                    <i class="bi bi-people"></i>
                    <p>Lỗi hiển thị số lượng học sinh</p>
                </div>  
            </div>
        </div>
        <div class="Class-detail_course">
            <div>
                <div id="Class-detail_course_title">
                    <h1>Các khóa học của lớp</h1>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <div id="Class-detail_course_listWrap">
                    <i class="bi bi-journal-bookmark"></i>
                    <p>Lỗi hiển thị khóa học</p>
                </div>  
            </div>
        </div>
            </div>
            <div id="Class-student"></div>
        </div>`

    // Quản lý lớp V1
    vams('.managerClass').forEach((e) => {
        e.onclick = () => {
            let className = e.getAttribute('data-class')

            let dataClass_main = []
            dataClass.forEach((classN) => {
                if (classN['NameClass'] == className) {
                    dataClass_main = classN
                }
            })
            LoadStudent(dataClass_main)
        }
    })
    // Thêm class
    AddClass()
}

// Tải lên thông tin học sinh
function LoadStudent(classN) {
    if (students.length === 0) {
        fetchSheet
            .fetch({
                gSheetId: '10HZ2XKw97d21uyI_gdmBgN7dI_DbRQAa0EUlPSfZIkc',
                wSheetName: 'All Student',
            }).then((dataClass) => {
                students = strim(dataClass)
                ManagerClass(students, classN)
            })
    } else {
        ManagerClass(students, classN)
    }
}

// Sinh ra danh sách lớp
function listclass(dataClass) {
    let items = ''
    dataClass.forEach((t) => {
        items +=
            `<div class="class_banner">
                <div class="class-banner_img">
                    <img src="https://lh3.googleusercontent.com/d/1xaA7E-XNGzEI9SsfY4i1k9CgjRjMiqKF">
                    <h4>${t['NameClass']}</h4>
                </div>
                <div class="chechin_more" >
                    <div class="class_more">
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                    <div class="class_more-content">
                        <p class="managerClass" data-class="${t['NameClass']}">Quản lý lớp</p>
                    </div>
                </div>
                <div class="class_banner_information">
                    <p>Khu vực: ${t['Address']}</p>
                    <p>GVCN: ${t['formTeacher']}</p>
                    <p>Khóa: <span>20${t['NameClass'].slice(0, 2)}</span></p>
                </div>
            </div>`
    })
    return items
}
// Thêm lớp học 
function AddClass() {
    vam('#addclass').onclick = () => {
        vam('#popup').setAttribute('style', 'display:block')
        SetAttribute('.popup_main', 'style', 'width:600px')
        vam('.popup_background').onclick = () => {
            vam('#popup').setAttribute('style', 'display:none')
        }
    }

    vam('.popup_main').innerHTML =
        `<div id="addClass-wrap">
            <div> <p>Thêm lớp học</p></div>
            <form id="addClass">
                <input name="nameclass" type="text" placeholder="Tên Lớp">
                <input name="address" type="text" placeholder="Địa chỉ">
                <input name="gvcn" type="text" placeholder="Giáo viên chủ nhiệm">
            </form>
            <button id="add_class">Thêm Lớp</button>
        </div>`


    vam('#add_class').onclick = () => {
        SetAttribute('.load', 'style', 'display:block')
        let nameclass = vam('#addClass>input[name="nameclass"]').value
        let address = vam('#addClass>input[name="address"]').value
        let gvcn = vam('#addClass>input[name="gvcn"]').value
        var url = urlBackend + "?" + `name=${nameclass}&address=${address}&gvcn=${gvcn}&action=addClass`;
        fetch(url, {
            method: 'GET'
        }).then(response => response.json())
            .then((data) => {
                if (data['status'] == 'error') {
                    SetAttribute('.load', 'style', 'display:none')
                    alert(`Lỗi tạo lớp: ${data['message']}`)
                } else if (data['status'] == 'success') {
                    SetAttribute('.load', 'style', 'display:none')
                    vam('#popup').setAttribute('style', 'display:none')
                    alert(`${data['message']}`)
                    Class()
                }
            })
            .catch(error => alert('Lỗi: ' + error));
    }
}
