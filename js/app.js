function showHeader() {
    let header = document.querySelector(".c-header-index");
    header.style.display = "flex";
    header.style.animationDelay = "0.175s;"
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function submitForm() {
    let submit = document.querySelector(".js-submit-search");
    let search_input = document.querySelector(".c-input-search");
    search_input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            submit.click();
        }
    })
    submit.addEventListener("click", async function() {
        let header = document.querySelector(".c-header-index");
        let profile = document.querySelector(".c-profile");
        header.style.marginTop = "0";
        header.style.opacity = "0";
        profile.style.display = "none";
        header.style.display = "none";
        setTimeout(function() {
            let header = document.querySelector(".c-header-index");
            let header_image = document.querySelector(".c-header-index__image");
            header.style.width = "800px";
            header_image.style.height = "100px";
        }, 150);
        setTimeout(function() {
            let background_layer = document.querySelector(".c-background__layer");
            background_layer.style.opacity = "1";
        }, 200);
        showHeader();
        let name = search_input.value.toLowerCase();
        await fetch('http://census.daybreakgames.com/s:CreateProjectTom/get/ps2:v2/character/?name.first_lower=' + name + '&c:resolve=faction')
            .then(response =>
                response.json())
            .then(async data => {
                console.log(data);
                var kd;
                var score;
                var kills;
                var deaths;
                var time;
                var score_minute;
                var code_tag = data.character_list[0].faction.code_tag.toLowerCase();
                var rank = data.character_list[0].battle_rank.value;
                var br_value = data.character_list[0].battle_rank.value;
                let profile = document.querySelector(".c-profile");
                let backgroundindex = document.querySelector(".c-background-index");
                var general_details = document.querySelector(".js-players-general")
                let profile_name = document.querySelector(".js-profile__name");
                let profile_certs = document.querySelector(".js-profile__certs");
                var leaderboard = document.querySelector(".js-leaderboard");
                var card__title_general = document.querySelector(".js-card__title-general");
                var card__title_generalcln = card__title_general.cloneNode(true);

                leaderboard.style.display = "none";
                general_details.style.display = "flex";
                general_details.innerHTML = "";
                general_details.appendChild(card__title_generalcln);

                profile_name.innerHTML = '<img class="c-profile__name-logo" src="https://census.daybreakgames.com/files/ps2/images/static/' + data.character_list[0].faction.image_id + '.png" alt=""><h1 class="c-lead--xxl">' + data.character_list[0].name.first + '</h1>'

                profile_certs.innerHTML = '<div class="o-layout o-layout__item o-layout--justify-end o-layout--align-baseline"><svg class="c-profile__certs-svg" width="60%" height="24"><text class="c-profile__certs-svg-text" x="8" y="24" fill="#dbdce685">UNTILL NEXT CERT</text><line x1="0" y1="5" x2="100%" y2="5" style="stroke:#15161F80;stroke-width:5" /><line x1="0" y1="5" x2="' + Math.round(data.character_list[0].certs.percent_to_next * 100) + '%" y2="5" style="stroke:#FF566280;stroke-width:5" /></svg><div class="c-lead--xxl u-color-alpha">' + data.character_list[0].certs.available_points + '</div></div><div class="o-layout o-layout__item o-layout--justify-end u-mb-sm"><div class="c-lead u-color-neutral-xx-light u-text-font-weight-bd">Certs</div></div><div class="o-layout o-layout__item o-layout--justify-end o-layout--align-center"><div class="c-lead--lg u-color-alpha-dark">' + (Number(data.character_list[0].certs.earned_points) + Number(data.character_list[0].certs.gifted_points)) + '</div></div><div class="o-layout o-layout__item o-layout--justify-end"><div class="c-lead--sm u-color-neutral-xx-light u-text-font-weight-bd">Total Certs earned</div></div>'


                backgroundindex.style.backgroundImage = ("url(img/jpg/Backgroundindex" + data.character_list[0].faction.code_tag + ".jpg)");
                let characterid = data.character_list[0].character_id;
                showHeader();
                await fetch('http://census.daybreakgames.com/s:CreateProjectTom/get/ps2:v2/characters_stat_history/?character_id=' + characterid + '&c:limit=50&c:sort=all_time:-1')
                    .then(response =>
                        response.json())
                    .then(data => {
                        console.log(data);
                        for (var i = 0; i < data.characters_stat_history_list.length; i++) {
                            if (data.characters_stat_history_list[i].stat_name == "kills") {
                                var kills = Number(data.characters_stat_history_list[i].all_time)
                            }
                            if (data.characters_stat_history_list[i].stat_name == "deaths") {
                                var deaths = Number(data.characters_stat_history_list[i].all_time)
                            }
                            if (data.characters_stat_history_list[i].stat_name == "score") {
                                var score = Number(data.characters_stat_history_list[i].all_time)
                            }
                            if (data.characters_stat_history_list[i].stat_name == "time") {
                                var time = Number(data.characters_stat_history_list[i].all_time) / 60
                            }
                        }
                        score_minute = Number.parseFloat(score / time).toFixed(2);
                        kd = Number.parseFloat(kills / deaths).toFixed(2);
                        for (var i = 0; i < data.characters_stat_history_list.length; i++) {
                            let name = data.characters_stat_history_list[i].stat_name;
                            let all_time = data.characters_stat_history_list[i].all_time;
                            if (name == "facility_defend") {
                                name = "Facilities Defended";
                            } else if (name == "facility_capture") {
                                name = "Facilities Captured";
                            } else if (name == "battle_rank") {
                                name = "Battle Rank";
                                all_time = "Rank " + all_time;
                            } else if (name == "time") {
                                name = "Time Spent";
                                all_time = Math.round(Number(all_time) / 3600) + "h";
                            }
                            general_details.innerHTML += "<div class='o-layout o-layout__item o-layout--justify-space-between c-leaderboard-field'><div class='o-layout'><p class='c-leaderboard__text'>KDR</p></div><p class='c-leaderboard__score'> " + kd + "</p></div>";
                            general_details.innerHTML += "<div class='o-layout o-layout__item o-layout--justify-space-between c-leaderboard-field'><div class='o-layout'><p class='c-leaderboard__text'>" + name.charAt(0).toUpperCase() + name.slice(1) + "</p></div><p class='c-leaderboard__score'> " + numberWithCommas(all_time) + "</p></div>";
                        }
                    })
                    .catch(error => console.error(error))
                await fetch('http://census.daybreakgames.com/s:CreateProjectTom/get/ps2:v2/experience_rank/?rank=' + data.character_list[0].battle_rank.value + '&c:show=rank,' + data.character_list[0].faction.code_tag.toLowerCase() + '')
                    .then(response =>
                        response.json())
                    .then(data => {
                        console.log(data);
                        let profile_kd = document.querySelector(".js-profile__KD");
                        let profile__score_minute = document.querySelector(".js-profile__score_minute");
                        profile_kd.innerHTML = '<div class="o-layout o-layout--justify-start o-layout--align-baseline u-mb-sm"><div class="c-lead--xl u-text-font-weight-sm u-color-alpha-dark">' + kd + '</div><div class="o-layout__item c-lead--sm u-color-neutral-xx-light u-text-font-weight-bd">Kill/Death</div></div></div><div class="o-layout o-layout--justify-start"><img class="c-profile__br-logo" src="https://www.planetside2.com/images/players/global/battlerank-icons/br-' + code_tag + '-' + br_value + '.png" alt=""><div class="c-lead--xl u-text-font-weight-sm u-color-alpha-dark">' + rank + '</div><div class="o-layout__item c-lead--sm u-color-neutral-xx-light u-text-font-weight-bd">Rank</div></div>';
                        profile__score_minute.innerHTML = '<div class="o-layout o-layout--justify-start"><div class="c-lead--lg u-text-font-weight-sm u-color-alpha-dark">' + score_minute + '</div><div class="o-layout__item c-lead--sm u-color-neutral-xx-light u-text-font-weight-bd">Score/minute</div></div>';
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        profile.style.display = "block";
    })
}

async function getAPI() {
    // character?c:resolve=stat_history&stat_history.stat_name=score&c:limit=30
    await fetch('http://census.daybreakgames.com/s:CreateProjectTom/get/ps2:v2/characters_stat_history/?c:limit=10&stat_name=score&c:sort=all_time:-1&c:join=character^inject_at:character^show:name')
        .then(response =>
            response.json())
        .then(data => {
            let player_div = document.querySelector(".js-players-score");
            let scores = {};
            let i;
            for (i = 0; i < data.characters_stat_history_list.length; i++) {
                scores[data.characters_stat_history_list[i].character.name.first] = parseInt(data.characters_stat_history_list[i].all_time);
                let place = i + 1
                player_div.innerHTML += "<div class='o-layout o-layout__item o-layout--justify-space-between c-leaderboard-field'><div class='o-layout'><div class='c-leaderboard__place'>" + place + "</div><p class='c-leaderboard__text'>" + data.characters_stat_history_list[i].character.name.first + "</p></div><p class='c-leaderboard__score'> " + numberWithCommas(data.characters_stat_history_list[i].all_time) + "</p></div>";
            }
            // for (i = 0; i < data.character_list.length; i++) {
            //     if (data.character_list[i].stats != true) {
            //         player_div.innerHTML += "<li>" + data.character_list[i].stats.stat_history[8].all_time + "</li>";
            //     }
            // }
        })
        .catch(error => console.error(error))
    await fetch('http://census.daybreakgames.com/s:CreateProjectTom/get/ps2:v2/characters_stat_history/?c:limit=10&stat_name=kills&c:sort=all_time:-1&c:join=character^inject_at:character^show:name')
        .then(response =>
            response.json())
        .then(data => {
            let player_div = document.querySelector(".js-players-kills");
            let scores = {};
            let i;
            for (i = 0; i < data.characters_stat_history_list.length; i++) {
                scores[data.characters_stat_history_list[i].character.name.first] = parseInt(data.characters_stat_history_list[i].all_time);
                let place = i + 1
                player_div.innerHTML += "<div class='o-layout o-layout__item o-layout--justify-space-between c-leaderboard-field'><div class='o-layout'><div class='c-leaderboard__place'>" + place + "</div><p class='c-leaderboard__text'>" + data.characters_stat_history_list[i].character.name.first + "</p></div><p class='c-leaderboard__score'> " + numberWithCommas(data.characters_stat_history_list[i].all_time) + "</p></div>";
            }
            // for (i = 0; i < data.character_list.length; i++) {
            //     if (data.character_list[i].stats != true) {
            //         player_div.innerHTML += "<li>" + data.character_list[i].stats.stat_history[8].all_time + "</li>";
            //     }
            // }
        })
        .catch(error => console.error(error))
    // Met de fetch API proberen we de data op te halen.
    // Als dat gelukt is, gaan we naar onze showResult functie.
    document.querySelector(".c-loading").style.opacity = 0;
    document.querySelector(".c-loading").style.display = "none";
    document.querySelector(".c-loaded").style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    // 1 We will query the API with longitude and latitude.
    getAPI();
    submitForm();
});