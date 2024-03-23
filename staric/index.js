const vam = document.querySelector.bind(document);
const vams = document.querySelectorAll.bind(document);
const url = '1ZQSH5SOPGd9NPW0GxwyrtpPq8EhDZrkRS-0S7958i9g'
const w = screen.width
const intromain =
    `<div class="intro">
        <div class="intrologo">
            <div class="intrologo-hiden">
                <img style="width:30%" src="./staric/Image/Logo.png">
            </div>
        </div>
        <div class="introone"></div>
    </div>`;
window.onload = () => {
    vam('.loadweb').remove();
    vam('#mainintro').innerHTML = intromain
    setTimeout(() => {
        vam('.intro').remove()
    }, 2500)
};

fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'Banner',
    })
    .then((rows) => {
        let g = rows[0]
        ThongTin(g['Name'], g['Date'], g['Address'], g['Class']);
        vam('.banner__background>img').src = g['BackGround'];
        if (w <= 700) {
            vam('#banner').style.aspectRatio = "1182/2560";
            vam('.banner__background>img').src = g['BackGround-sm'];
            vam('.menu').setAttribute('style', 'display:block')
        }
    });
// Lấy thông tin cá nhân 
function ThongTin(name, date, address, contact) {
    document.querySelector('.TT__name>p').innerHTML = name
    document.querySelector('.TT__date>p').innerHTML = date
    document.querySelector('.TT__address>p').innerHTML = address
    document.querySelector('.TT__class>p').innerHTML = contact
}
function Duan(All) {
    let Items = "";
    document.querySelector('.d551412a1 .Title__main').innerHTML = All[0]['Title']
    document.querySelector('.d551412a1 .Content__main').innerHTML = All[0]['Content']
    All.forEach((tab) => {
        Items += `<div class="banner-wrap__img col-lg-12">
        <img src="${tab['Image']}" alt="">
    </div>`
    })
    document.querySelector('.d551412a1-right-slick').innerHTML = Items
}
fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'Duan',
    })
    .then((rows) => {
        Duan(rows)
        $('.d551412a1-right-slick').slick({
            autoplay: false,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            pauseOnHover: false,
            prevArrow: `<span class="prev"><svg style="transform: scale(-1);" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48">
    <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></span>`,
            nextArrow: `<span class="next"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48">
    <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></span></span>`,
        });
    });






$('.d551412a2-right__ctTi').on('mousedown', e => {
    $('.d551412a2-right__ctall').toggleClass('hiden')
    $('.d55svg').toggleClass('hiden')
});

vams('.d551412a2-right__ctTi').forEach((t, index) => {
    let g = vams('.d551412a2-right__ctTi')[index]
    t.onclick = () => {
        $('.d551412a2-right__ctall').toggleClass('hiden')
        $('.d55svg').toggleClass('hiden')
    }
})


/* dữ liệu duan */
fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'Khoahoc',
    })
    .then((rows) => {
        let gut = []
        rows.forEach((t) => {
            if (gut[t['TenKH']]) {
                gut[t['TenKH']]++
            }
            else {
                gut[t['TenKH']] = 1
            }
        })
        vam('.d551412a2-left-img>img').src = rows[0]['Hinh']

        let Pro_wrap = ''
        Object.keys(gut).forEach(key => {
            Pro_wrap +=
                `<div class="main-content" index='${key}'>
                    <div class="d551412a2-right__ctTi">
                        ${key} (${gut[key]} Chủ đề đã học)
                        <div class="d55svg" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24"
                                viewBox="0 0 24 24" width="24" fill="#606368">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="d551412a2-right__ctall"></div>
                </div>`
        })
        let f =
            `<div class="banner_button" style="padding: 3rem 0">
                <a href="https://airobotic.edu.vn/" target="_blank">Các khóa học khác</a>
            </div>`
        document.querySelector('.d551412a2-right__content').innerHTML = Pro_wrap + f
        let Project = ''
        let i = 0
        document.querySelectorAll('.main-content').forEach((t, index) => {
            let f = t.getAttribute('index')
            /* lấy dữ liệu */

            rows.forEach((tab) => {
                Object.keys(tab).forEach(key => {
                    if (tab[`${key}`] == '') {
                        tab[key] = '-';
                    }
                })
                Project =
                    `<div class="main-content-tt" id="${i}" index="${tab['TenKH']}"><h4 class="name-project items"><p>${tab['TenCD']}</p></h4></div >`
                vam(`.main-content[index='${f}'] .d551412a2-right__ctall`).innerHTML += Project
                let g = document.querySelector(`.main-content-tt[id='${i}']`).getAttribute('index')
                if (f == g) { }
                else {
                    document.querySelector(`.main-content[index='${f}'] .d551412a2-right__ctall .main-content-tt[id='${i}']`).remove()
                }
                i++
            });
            /* xổ xuống */
            document.querySelector(`.main-content[index='${f}'] .d551412a2-right__ctTi`).onclick = () => {
                if (vam(`.main-content[index='${f}'] .d551412a2-right__ctall`).getAttribute('class') == 'd551412a2-right__ctall hide') {

                }
                else {
                    vams(`.d551412a2-right__ctall.hide`).forEach((t) => {
                        t.classList.remove('hide')
                    })
                    vams(`.d55svg.hiden`).forEach((t) => {
                        t.classList.remove('hiden')
                    })
                }
                $(`.main-content[index='${f}'] .d551412a2-right__ctall`).toggleClass('hide')
                $(`.main-content[index='${f}'] .d55svg`).toggleClass('hiden')
            }
        })
    });
fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'Kinang',
    })
    .then((rows) => {
        let gut = []
        rows.forEach((t) => {
            if (gut[t['Title']]) {
                gut[t['Title']]++
            }
            else {
                gut[t['Title']] = 1
            }
        })

        let Pro_wrap = ''
        let d = 1;
        Object.keys(gut).forEach(key => {
            Pro_wrap +=
                `<div class="main-content3" index='${key}' id=${d}>
                    <div class="d551412a3-right__ctTi" >
                        <p style="text-transform: capitalize;">${key}</p>
                        <div class="d54svg" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24"
                                viewBox="0 0 24 24" width="24" fill="#606368">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="d551412a3-right__ctall"></div>
                </div>`
            d++
        })
        document.querySelector('.d551412a3-right__content').innerHTML = Pro_wrap
        let Project = ''
        let i = 0;
        let gdd = 1
        let gd = '';
        rows.forEach((tab) => {
            gd += `<img index="${gdd}" src="${tab['Image']}" style="display:none">`
            gdd++
        });
        document.querySelector('.d551412a3-left-img').innerHTML += gd
        document.querySelectorAll('.main-content3').forEach((t) => {
            let f = t.getAttribute('index')

            /* lấy dữ liệu */
            rows.forEach((tab) => {
                Object.keys(tab).forEach(key => {
                    if (tab[`${key}`] == '') {
                        tab[key] = '-';
                    }
                })
                Project =
                    `<div class="main-content-tt3" id="${i}" index="${tab['Title']}"><h4 class="name-project items"><p style="text-align: justify">${tab['Content']}</p></h4></div >`
                vam(`.main-content3[index='${f}'] .d551412a3-right__ctall`).innerHTML += Project
                let g = document.querySelector(`.main-content-tt3[id='${i}']`).getAttribute('index')
                if (f == g) { }
                else {
                    document.querySelector(`.main-content3[index='${f}'] .d551412a3-right__ctall .main-content-tt3[id='${i}']`).remove()
                }
                i++
            });

            /* xổ xuống */
            document.querySelector(`.main-content3[index='${f}'] .d551412a3-right__ctTi`).onclick = () => {
                let i = vam(`.main-content3[index='${f}']`).getAttribute('id')
                if (vam(`.main-content3[index='${f}'] .d551412a3-right__ctall`).getAttribute('class') == 'd551412a3-right__ctall hide') { }
                else {
                    vams(`.d551412a3-right__ctall.hide`).forEach((t) => {
                        t.classList.remove('hide')
                    })
                    vams(`.d54svg.hiden`).forEach((t) => {
                        t.classList.remove('hiden')
                    })
                }
                $(`.main-content3[index='${f}'] .d551412a3-right__ctall`).toggleClass('hide')
                $(`.main-content3[index='${f}'] .d54svg`).toggleClass('hiden')
                vams('.d551412a3-left-img>img').forEach((t) => {
                    t.setAttribute('style', 'display:none')
                })
                vam(`.d551412a3-left-img>img[index="${i}"]`).setAttribute('style', 'display:block')

            }
        })

    });

vams('.header1412a1-list>a').forEach((t) => {
    t.onclick = () => {
        vam('.header1412a1-list>a.acc').classList.remove('acc');
        t.classList.add('acc');
    }
})

console.log('Chào mừng bạn đến tới AI Robotic.');
fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'Huyhieu',
    })
    .then((rows) => {
        let t = '';
        let link = '';
        let i = 1;
        rows.forEach((tab) => {
            if (tab['Đã học'] == 'TRUE') {
                link = `./staric/Image/LV${i}.png`
            } else {
                link = `./staric/Image/log_LV${i}.png`
            }
            t +=
                `<div class="banner-wrap__img col-lg-4">
                    <img src="${link}" alt="">
                </div>`
            i++
        })
        document.querySelector(`#slick__banner`).innerHTML = t
        $("#slick__banner").slick({
            autoplay: false,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: true,
            pauseOnHover: false,
            prevArrow: `<span class="prev"><svg style="transform: scale(-1);" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></span>`,
            nextArrow: `<span class="next"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></span></span>`,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        dots: false,
                    },
                },
            ],
        });
    });



function X() {
    vam('.Menu-nav').setAttribute('style', 'display:none')
}
fetchSheet
    .fetch({
        gSheetId: url,
        wSheetName: 'bctq',
    })
    .then((rows) => {
        let g = ''
        vam('#iframevideo').src = rows[0]['video']
        vam('#contentbctq').innerText = rows[0]['Content']
        rows.forEach((tab) => {
            g += `<img style="flex: 1; aspect-ratio: 1/1;object-fit: cover;width: 30%;"
            src="${tab['Image']}" alt="">`
        })
        vam('.tongquan_image').innerHTML = g
    });

vam('.menu').onclick = () => {
    vam('.Menu-nav').setAttribute('style', 'display:flex')
}
vam('.bg').onclick = () => {
    vam('.Menu-nav').setAttribute('style', 'display:none')
}