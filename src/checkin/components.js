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
}



