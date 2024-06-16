// Danh sách lịch
function listLearnToday(mama, today, buoi) {
    let items = `
    <div>
        <p>${today}</p>
        <p>${buoi}</p>
        <p>${mama[0]}</p>
        <p>${mama[1]}</p>
        <p>${mama[2]}</p>
        <p class="checkin" data-class="${mama[0]}" data-course="${mama[1]}"><i class="bi bi-calendar-check-fill"></i></p>
    </div>`
    return items
}

// Danh sách học sinh v1
function listStudentCheckin(id, name) {
    let items =
        `<div class="checkin_Student conte">
            <div>
                <p>${id}</p>
                <p>${name}</p>
            </div>
            <div>
                <p class="Chechin_checked" data-id="${id}"><input class="Checkin_input values" value="true" name="${id}" type="radio" data-note='' style="accent-color: #009d3c;"></p>
                <p class="Chechin_checked"  data-id="${id}"><input class="Checkin_input" value="false" name="${id}" type="radio" style="accent-color: #ff142c;" checked></p>
                <p class="checkin_note" index=""><i class="bi bi-journal-plus"></i></p>
            </div>
        </div>`
    return items
}
