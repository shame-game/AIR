// Vào giao diện quản lý lớp học
function ManagerClass(allStudent, dataClass) {
    SetAttribute('#class-content', 'style', 'display:none');
    let nameC = dataClass['NameClass']
    let gvcn = dataClass['formTeacher']
    let avt = dataClass['avt']
    let i = 0
    let students = []
    allStudent.forEach((h) => {
        if (h.Class == nameC) {
            students = students.concat(h)
            i++
        }
    })
    let id = dataClass['ID']
    vam('#class-nav>.nav-title').innerText = `Lớp ${nameC}`
    // Chuyển Cảnh
    SetAttribute('#manager-class-content', 'style', 'display:block');
    vam('#class-nav').innerHTML += nav_back
    // Quay lại 
    ManagerClassBack()
    // Load trạng thái khóa học


    /* Load nội dung trang quản lý */
    // Load hình bìa 
    vam('#Class-detail_detailClass-avt').innerHTML = `<img src="${avt}">`
    vam('#Class-detail_detailClass_content').innerHTML =
        `<h1 class="detailclass_title" > Thông tin chi tiết lớp học</h1>
        <div class="detailclass_tt"><h1>Tên lớp: ${nameC}</h1></div>
        <div class="detailclass_tt"><h1>Giáo viên chủ nhiệm: ${gvcn}</h1></div>`
    // Load số lượng học sinh
    vam('#Class-detail_allStudent_listWrap>p').innerText = i + ' học sinh'

    fetchSheet
        .fetch({
            gSheetId: id,
            wSheetName: nameC
        }).then((detailClass) => {
            let int = 0
            Object.keys(detailClass[0]).forEach((t) => {
                if (t.slice(0, 2) == 'C_') {
                    int++
                }
            })
            vam('#Class-detail_course_listWrap>p').innerText = `${int} Khóa học hiện tại`
        })
    /* Chuyển trang danh sách học sinh*/
    vam('#Class-detail_allStudent_listWrap').onclick = () => ManagerClass_Student(allStudent, students, dataClass, i, nameC)
    // Chuyển trang danh sách khóa học 
    vam('#Class-detail_course_listWrap').onclick = () => CourseClass(allStudent, students, dataClass, i, nameC)
}
// Thực hiện quay lại 
function ManagerClassBack() {
    vam('.nav-back').onclick = () => {
        SetAttribute('#class-content', 'style', 'display:flex')
        vam('.nav-back').remove()
        vam('#class-nav>.nav-title').innerText = 'Danh sách lớp học'
        SetAttribute('#manager-class-content', 'style', 'display:none')
    }
}

