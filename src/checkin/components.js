function checkin(classlist) {
    vam('#main').innerHTML =
        `<div id="checkin">
            <div id="checkin_nk">
                <h1>Niên khóa: <p>2024</p>
                </h1>
                <i class="bi bi-caret-down-fill"></i>
            </div>
            <div id="checkin_listclass-wrap">
                <div id="checkin_listclass">
                    ${listclass(classlist)}
                    <div class="checkin_class" id="addclass">
                    <i class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`
    AddClass(classlist)

    vams('.checking_diemdanh').forEach((t) => {
        t.onclick = () => {
            let g = t.getAttribute('data-class')
            vam('#checkin').innerHTML = `
                <div class="diemdanh_nav">
                    <p>Quản lý lớp > Điểm danh lớp ${g}</p>
                </div>
                <div class="diemdanh_listStudent">
                    <div>
                        ${listStudent(classlist, g)} 
                        <div class="diemdanh_Student-add">
                            <p>ID</p>
                            <p style="flex:1">Họ và Tên</p>
                            <p style="flex:1"></p>
                            <p>Có mặt</p>
                            <p>Vắng mặt</p>
                        </div>
                    </div>
                </div>
            `
        }
    })

}

