let url = 'https://script.google.com/macros/s/AKfycbzZLVxj9npEumaJTtKDl24gBahrl_tf5pc6XZtI9HRwpLFiHRl81UE8AbLKEp-ldkIp/exec'

function Check() {
    let currentUrl = window.location.href;
    if (currentUrl == 'https://shame-game.github.io/AIR/Login/index.html' || currentUrl == 'https://shame-game.github.io/AIR/Login/' || currentUrl == 'https://shame-game.github.io/AIR/index.html' || currentUrl == 'https://shame-game.github.io/AIR/' || currentUrl == 'https://shame-game.github.io/AIR/Parents/' || currentUrl == 'https://shame-game.github.io/AIR/Parents/index.html') {
        if (getCookie("vamnaone")) {
            fetch(`${url}?user=${getCookie("vamnaone").split('|')[1]}&token=${getCookie("vamnaone").split('|')[0]}&type=${getCookie('type')}&action=check`, { method: 'Get' })
                .then(response => response.json())
                .then((data) => {
                    if (data.status != 'success') {
                        window.location.href = "https://shame-game.github.io/AIR/Login/"
                    } else {
                        if (data.message.split(' ')[2] == 'parents') {
                            if (currentUrl == 'https://shame-game.github.io/AIR/Parents/' || currentUrl == 'https://shame-game.github.io/AIR/Parents/index.html') {
                            } else {
                                window.location.href = 'https://shame-game.github.io/AIR/Parents/'
                            }
                        }
                        else if (data.message.split(' ')[2] == 'teacher') {
                            if (currentUrl == 'https://shame-game.github.io/AIR/index.html' || currentUrl == 'https://shame-game.github.io/AIR/') {
                            } else {
                                window.location.href = 'https://shame-game.github.io/AIR/'
                            }
                        }
                    }
                })
                .catch(error => alert('Lỗi: ' + error));
        } else {
            if (currentUrl == 'https://shame-game.github.io/AIR/Login/index.html' || currentUrl == 'https://shame-game.github.io/AIR/Login/') {
            } else {
                window.location.href = "https://shame-game.github.io/AIR/Login/"
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
        window.location.href = "https://shame-game.github.io/AIR/Login/"
    }
}


