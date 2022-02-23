var token = null;
var isRevealingToken = false;

function init() {
    document.getElementById("login-button").addEventListener('click', login)
    document.getElementById("logout-button").addEventListener('click', logout)
    document.getElementById("refresh-button").addEventListener('click', refresh)
    document.getElementById("reveal-token-button").addEventListener('click', revealToken)

    updateInterface();
}

function login() {
    var token = "token1234"
    browser.storage.sync.set({ token })
        .then(updateInterface);
}
function logout() {
    browser.storage.sync.remove("token")
        .then(updateInterface);

}
function refresh() {
    updateInterface();
}
function revealToken() {
    isRevealingToken = !isRevealingToken;
    updateInterface();
}

async function updateInterface() {
    t = await browser.storage.sync.get();

    console.log(t)
    console.log(t.token)

    if (t.token && typeof (t.token) === 'string') {
        document.getElementById("login-button").disabled = true;
        document.getElementById("logout-button").disabled = false;
        document.getElementById("refresh-button").disabled = false;

        document.getElementById("login-status").innerHTML = `
        You are signed in. Click the <b>Logout</b> button below to
        stop automatically signing into Brightspace.
        `;
    } else {
        document.getElementById("login-button").disabled = false;
        document.getElementById("logout-button").disabled = true;
        document.getElementById("refresh-button").disabled = true;

        document.getElementById("login-status").innerHTML = `
        You are currently not signed in. Click the <b>Login</b> button below to
        sign in using BoilerKey. You should only have to do this once.
        `;
    }

    if (isRevealingToken) {
        document.getElementById("token-reveal").value = t.token ?? "Null token. Please sign in again.";
        document.getElementById("reveal-token-button").textContent = "Unreveal";
    } else {
        document.getElementById("token-reveal").value = "";
        document.getElementById("reveal-token-button").textContent = "Reveal";
    }
}


// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function (details) {
//         for (var i = 0; i < details.requestHeaders.length; ++i) {
//             if (details.requestHeaders[i].name === 'User-Agent') {
//                 details.requestHeaders.splice(i, 1);
//                 break;
//             }
//         }
//         return { requestHeaders: details.requestHeaders };
//     },
//     { urls: ['<all_urls>'] },
//     ['blocking', 'requestHeaders' /* , 'extraHeaders' */]
//     // uncomment 'extraHeaders' above in case of special headers since Chrome 72
//     // see https://developer.chrome.com/extensions/webRequest#life_cycle_footnote
// );

document.addEventListener('DOMContentLoaded', init, false);