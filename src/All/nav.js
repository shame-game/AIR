Class()
vam('.sidebar__item[get-data="calendar"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="calendar"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        SetAttribute('.load', 'style', 'display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        vam('.topbar__title').innerText = 'Lịch dạy học'
        Calendar()
    }

}
vam('.sidebar__item[get-data="class"]').onclick = () => {
    let t = vam('.sidebar__item[get-data="class"]');
    if (t.getAttribute('class') == 'sidebar__item') {
        SetAttribute('.load', 'style', 'display:block')
        vam('.sidebar__item--actived').classList.remove('sidebar__item--actived')
        t.classList.add('sidebar__item--actived')
        vam('.topbar__title').innerText = 'Quản lý lớp học'
        Class()
    }
}