// Hiển thị danh sách lớp


// Chức năng quản lý lớp

// Thông tin cơ bản lớp học 
function classdetail(data, idclass) {
    let nameclass = '';
    let quantity = '';
    data.forEach((t) => {
        if (t['NameClass'] == idclass) {
            nameclass = t.NameClass;
            fetchSheet
                .fetch({
                    gSheetId: t.ID,
                    wSheetName: 'Trang tính1'
                }).then((detailClass) => {
                    const keysWithValue2 = [];
                    for (let key in detailClass[0]) {
                        if (detailClass[0][key] == 2) {
                            keysWithValue2.push(key);
                        }
                    }
                    vam('#Class-detail_detailClass-avt').innerHTML +=
                        `<img src="${detailClass[0]['avt']}">`
                    vam('#Class-detail_detailClass_content').innerHTML +=
                        `<h1 class="detailclass_title">Thông tin chi tiết lớp học</h1>
                    <div class="detailclass_tt"><h1>Tên lớp: ${nameclass}</h1></div>
                    <div class="detailclass_tt"><h1>Khóa học đang học: ${keysWithValue2}</h1></div>
                    <div class="detailclass_tt"><h1>Tiến độ học: ${nameclass}</h1></div>`
                    SetAttibute('.load', 'style', 'display:none')
                })
        }
    })
}

// Đếm học số học sinh 1 lớp

function quantity(dataStudent, className) {
    let i = 0
    dataStudent.forEach((t) => {
        if (t['Class'] == className) {
            i++
        }
    })
    return i
}

// Lấy danh sách học sinh
function allStudent(dataStudent, nameClass) {
    let items = ''
    dataStudent.forEach((t) => {
        if (t['Class'] == nameClass) {
            items += `<div class="Class-detail_allStudent_list-mainbox"><img src="${t['avt']}"><p>${t['Name']}</p></div>`
        }
    })
    return items
}

function quantityDetail(data, classN) {
    function getf(datas, int, kh) {
        if (vam('#Class-detail_allStudent_listWrap') != null) {
            vam('#Class-detail_allStudent_listWrap').innerHTML +=
                `<div  data-kh="${kh}" >
                    <p>${datas[0]['ID']}</p>
                    <p style="flex:1">${datas[0]['Name']}</p>
                </div>`
        }
    }
    data.forEach((t) => {
        let i = 0
        let idclass = t['ID']
        if (t['NameClass'] == classN) {
            fetchSheet
                .fetch({
                    gSheetId: t.ID,
                    wSheetName: 'Trang tính1'
                }).then((quantitys) => {
                    const keysWithValue2 = [];
                    for (let key in quantitys[0]) {
                        if (quantitys[0][key] == 2) {
                            keysWithValue2.push(key);
                        }
                    }
                    fetchSheet
                        .fetch({
                            gSheetId: t.ID,
                            wSheetName: keysWithValue2
                        }).then((student) => {
                            Object.values([student[0]]).forEach((t) => {
                                async function processKeys(t, idclass) {
                                    for (const j of Object.keys(t)) {
                                        if (j.slice(0, 2) === 'AI') {
                                            const gh = j;
                                            let h = [];

                                            async function gsd() {
                                                try {
                                                    const detail_Student = await fetchSheet.fetch({
                                                        gSheetId: idclass,
                                                        wSheetName: gh
                                                    });
                                                    h = h.concat(detail_Student);
                                                    getf(h, i, keysWithValue2);
                                                    i++;
                                                } catch (error) {
                                                    console.error('Error fetching sheet:', error);
                                                }
                                            }

                                            await gsd();
                                        }
                                    }
                                }
                                processKeys(t, idclass);
                            });
                        })
                })
        }
    })
}

// Hiển thị khóa học
function listcourse(data, classN) {

    data.forEach((t) => {

        if (t['NameClass'] == classN) {
            fetchSheet
                .fetch({
                    gSheetId: t.ID,
                    wSheetName: 'Trang tính1'
                }).then((quantitys) => {
                    fetchSheet
                        .fetch({
                            gSheetId: '1B1opE6UCtHn7HYncIB1cvaRiNzae6dpt4OVecY2-goQ',
                            wSheetName: 'Trang tính1'
                        }).then((course) => {
                            let items = '';
                            let status = '';
                            let color = ''
                            course.forEach((t) => {
                                if (quantitys[0][t['0']] == '0') { status = 'Chưa đăng ký'; color = '#ffe9e9' }
                                else if (quantitys[0][t['0']] == '2') { status = 'Đang học'; color = '#ffeb3b29' }
                                else if (quantitys[0][t['0']] == '1') { status = 'Đã học'; color = '#b1ffd5' }
                                items +=
                                    `<div>
                                        <div class="Class-detail_course_box" style="background:${color}">
                                            <p>${t['1']}</p>
                                            <p>${status}</p>
                                        </div>
                                    </div>`
                            })
                            vam('#Class-detail_course_listWrap').innerHTML = items
                        })
                })
        }
    })
}

// Hiển thị học sinh điểm danh
function listStudent(dataStudent, nameClass) {
    let items = ''
    let int = 1
    dataStudent.forEach((student) => {
        if (student['Class'] == nameClass) {
            items += `
            <div class= "diemdanh_Student">
                <p>${student['ID']}</p>
                <p style="flex:1">${student['Name']}</p>
                <p style="flex:1"></p>
                <input class="getbool_checkin" value="true" name="bool${int}" type="radio" data-note='' style="accent-color: #009d3c;">
                <input value="false" name="bool${int}" type="radio" checked>
                <div class="checkin_note" index="${int}"><i class="bi bi-journal-plus"></i></div>
            </div>`
            int++
        }
    })
    return items
}

function DetailClass(dataClass, dataStudent, t) {
    SetAttibute('.load', 'style', 'display:block')
    let className = t.getAttribute('data-class')
    document.querySelector('#checkin').classList.add('course')
    vam('#checkin').innerHTML = `
        <div class="diemdanh_nav">
            <div class="diemdanh_nav_left" id="back_class0">
                <i class="bi bi-box-arrow-left"></i>
                <a>Quay lại</a>
            </div>
        </div>
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
                <div id="Class-detail_allStudent_listWrap" class="g0">
                    <i class="bi bi-people"></i>
                    <p>${quantity(dataStudent, className)} học sinh</p>
                </div>  
            </div>
        </div>
        <div class="Class-detail_course">
            <div>
                <div id="Class-detail_course_title">
                    <h1>Tất cả khóa học</h1>
                    <i class="bi bi-caret-down-fill"></i>
                </div>
                <div id="Class-detail_course_listWrap">
                    
                </div>  
            </div>
        </div>
    `
    quantity(dataStudent, className)
    classdetail(dataClass, className)
    listcourse(dataClass, className)
    vam('#Class-detail_allStudent_listWrap.g0').onclick = () => {
        vam('.Class-detail_course').remove()
        vam('.Class-detail_detailClass').remove()
        vam('.Class-detail_allStudent').remove()
        vam('#checkin').innerHTML +=
            `<div id="Class-detail_allStudent_list">
                <div id="Class-detail_allStudent_list-add"> 
                    <i class="bi bi-person-plus-fill"></i>
                    <p>Thêm học sinh mới</p>
                </div>
                <div id="Class-detail_allStudent_list-search">
                    <p>Danh sách học sinh (${quantity(dataStudent, className)})</p>
                    <input type="search">
                </div>
                <div id="Class-detail_allStudent_list-main">
                    ${allStudent(dataStudent, className)}
                </div>
            </div>`
        vam('#Class-detail_allStudent_list-add').onclick = () => {
            addStudent(className)
        }
        vam('#back_class0').onclick = () => DetailClass(dataClass, dataStudent, t)
    }
    vam('#back_class0').onclick = () => Class()
}

function addStudent(className) {
    SetAttibute('#popup', 'style', 'display:block')
    SetAttibute('.popup_main', 'style', 'width:600px')
    vam('.popup_background').onclick = () => {
        vam('#popup').setAttribute('style', 'display:none')
    }
    vam('.popup_main').innerHTML =
        `<div id="addStudent" style="display:flex;flex-direction: column;">
            <p>Thêm học sinh</p>
                        <input type="text" class="ip_addStudent" name="name" placeholder="Tên học sinh">
                        <input type="text" class="ip_addStudent" name="bd" placeholder="Ngày sinh">
                        <input type="text" class="ip_addStudent" name="nameparent" placeholder="Tên phụ huynh">
                        <input type="text" class="ip_addStudent" name="phone" placeholder="Điện thoại phụ huynh">
                        <input type="text" class="ip_addStudent" name="address" placeholder="Địa chỉ">
                        <input type="text" class="ip_addStudent" name="statusPay" placeholder="Trạng thái đóng học phí (0: chưa đóng, 1: đã đóng)">
                        <button id="bt_addStudent">Thêm học sinh</button>
                    </div>`
    vam('#bt_addStudent').onclick = () => {
        SetAttibute('.load', 'style', 'display:block')
        let name = vam('.ip_addStudent[name="name"]').value
        let bd = vam('.ip_addStudent[name="bd"]').value
        let phone = vam('.ip_addStudent[name="phone"]').value
        let nameparent = vam('.ip_addStudent[name="nameparent"]').value
        let address = vam('.ip_addStudent[name="address"]').value
        let statusPay = vam('.ip_addStudent[name="statusPay"]').value
        let urlnew = urlBackend + "?" + `name=${name}&bd=${bd}&classN=${className}&nameParent=${nameparent}&phone=${phone}&address=${address}&statusPay=${statusPay}&action=addStudent`;
        fetch(urlnew, {
            method: 'GET'
        }).then((data) => {
            SetAttibute('.load', 'style', 'display:none')
        }).catch(error => alert('Lỗi: ' + error));
    }
}

