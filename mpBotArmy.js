// ==UserScript==
// @name         mpBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.mountainproject.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mountainproject.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

(function() {

    'use strict';

    // Add you user account email and password here
    var usrAccts = [
        {usr: "someUser@gmail.com", pss: "somePassword"},
        {usr: "someUser250@gmail.com", pss: "somePassword"}
    ];

    /*
        Define the different steps a single soldier in your bot army will take!!!!
        -  If the location of the web page is changed (either directly or by clicking a link)
            you will need to increment to a new step (do this by setting the cookie to the next increment)
        -  If you are doing things on a single page,, keep all the js in the same case,, just make sure to refresh
            the page when you are done and set the cookie to something that will get you into default.
        - Generally suggest leaving the 'default' case statement alone, it will complete the current soldiers
            work and move on to the next soilder.
    */
    function botArmyCommands() {
        switch (parseInt(getCookie('mpBotStep'))) {
            case 0:
                // after this step is done,, make sure action defined in the next step
                // are followed
                document.cookie = "mpBotStep=1; path=/;";
                // let's navigate to city park 2 page
                location.href = "https://www.mountainproject.com/route/123898248/city-park-2";
                return;
            case 1:
                // after this step is done,, make sure to trigger the default
                document.cookie = "mpBotStep=999; path=/;";
                // click on the 'Change' button for difficulty so the modal pops open
                $('#you-and-route > div:nth-child(4) > a').click();

                // it takes some time for the modal to load,, so lets wait a bit before we try to
                // interact with it.
                setTimeout(() => {
                    // defining what we will do after waiting a bit, lets change the grad difficulty dropdown
                    // 1100 = 5.1, 1000 = 5.0 etc
                    $('#rock').val('1100');
                    // now click the 'submit' button
                    $('#route-rating-form > div:nth-child(4) > div > button').click();
                    // let's refresn the page so the default case can get triggered (remember we changed the cookie)
                    location.href = window.location;
                }, "1000");
                return;

            case 2:
                // not used presently
                return;
            default:
                document.cookie = "mpBotStep=0; path=/;";
                location.href = 'https://www.mountainproject.com?workerDone=1';
                return;
        }
    }

    // Don't touch
    work(usrAccts);
    function work(t){var n,i=window.location,o=0!==$(".user-img-avatar").length,e=new URLSearchParams(window.location.search);if(e.get("engage")){document.cookie="mpBotsActive=1; path=/;",document.cookie="userIndex=0; path=/;",location.href="https://www.mountainproject.com/auth/logout";return}if("1"!=getCookie("mpBotsActive")){console.log("bots inactive, do nothing");return}var r=parseInt(getCookie("userIndex"));if(r>=usrAccts.length){alert("done!"),console.log("done!!"),document.cookie="userIndex=0; path=/;",document.cookie="mpBotsActive=0; path=/;";return}if(e.get("debug")){document.cookie="userIndex="+(r+1),console.log(getCookie("userIndex"));return}if(o){if(e.get("workerDone")){document.cookie="userIndex="+(r+1)+"; path=/;",location.href="https://www.mountainproject.com/auth/logout";return}getCookie("mpBotStep")||(document.cookie="mpBotStep=0; path=/;"),botArmyCommands();return}if("/auth/login"!==i.pathname){location.href="https://www.mountainproject.com/auth/login";return}signInOnSignInPage(t[r].usr,t[r].pss)}function signInOnSignInPage(t,n){$("#body-climb > div.main-content-container > div > div:nth-child(4) > div > div.login-signup-block > form:nth-child(7) > div:nth-child(1) > input").val(t),$("#body-climb > div.main-content-container > div > div:nth-child(4) > div > div.login-signup-block > form:nth-child(7) > div:nth-child(2) > input").val(n),$("#body-climb > div.main-content-container > div > div:nth-child(4) > div > div.login-signup-block > form:nth-child(7) > button").click()}function getCookie(t){let n=t+"=",i=decodeURIComponent(document.cookie).split(";");for(let o=0;o<i.length;o++){let e=i[o];for(;" "==e.charAt(0);)e=e.substring(1);if(0==e.indexOf(n))return e.substring(n.length,e.length)}return""}function wait(t){for(var n=Date.now(),i=n;i-n<t;)i=Date.now()}
})();



