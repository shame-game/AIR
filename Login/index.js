let url = 'https://script.google.com/macros/s/AKfycbzZLVxj9npEumaJTtKDl24gBahrl_tf5pc6XZtI9HRwpLFiHRl81UE8AbLKEp-ldkIp/exec'

function Check() {
    let currentUrl = window.location.href;
    if (currentUrl == 'http://127.0.0.1:5500/Login/index.html' || currentUrl == 'http://127.0.0.1:5500/Login/' || currentUrl == 'http://127.0.0.1:5500/Teacher/index.html' || currentUrl == 'http://127.0.0.1:5500/Teacher/' || currentUrl == 'http://127.0.0.1:5500/Parents/' || currentUrl == 'http://127.0.0.1:5500/Parents/index.html') {
        if (getCookie("vamnaone")) {
            fetch(`${url}?user=${getCookie("vamnaone").split('|')[1]}&token=${getCookie("vamnaone").split('|')[0]}&type=${getCookie('type')}&action=check`, { method: 'Get' })
                .then(response => response.json())
                .then((data) => {
                    if (data.status != 'success') {
                        window.location.href = "http://127.0.0.1:5500/Login/"
                    } else {
                        if (data.message.split(' ')[2] == 'parents') {
                            if (currentUrl == 'http://127.0.0.1:5500/Parents/' || currentUrl == 'http://127.0.0.1:5500/Parents/index.html') {
                            } else {
                                window.location.href = 'http://127.0.0.1:5500/Parents/'
                            }
                        }
                        else if (data.message.split(' ')[2] == 'teacher') {
                            if (currentUrl == 'http://127.0.0.1:5500/index.html' || currentUrl == 'http://127.0.0.1:5500/') {
                            } else {
                                window.location.href = 'http://127.0.0.1:5500/'
                            }
                        }
                    }
                })
                .catch(error => alert('Lỗi: ' + error));
        } else {
            if (currentUrl == 'http://127.0.0.1:5500/Login/index.html' || currentUrl == 'http://127.0.0.1:5500/Login/') {
            } else {
                window.location.href = "http://127.0.0.1:5500/Login/"
            }
        }
    }
}

Check()

function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}



if (document.querySelector('.logout')) {
    document.querySelector('.logout').onclick = () => {
        document.cookie = 'vamnaone' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'type' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = "http://127.0.0.1:5500/Login/"
    }
}


