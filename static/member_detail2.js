// const button = document.getElementById('mybgm');
// const iframe = document.getElementById('myif');
// button.addEventListener('click', () => {
//   iframe.src = 'https://www.youtube.com/embed/74_yqNBhQbA?start=3';
//   iframe.contentWindow.postMessage(
//     '{"event":"command","func":"playVideo","args":""}',
//     '*'
//   );
// });

$(document).ready(function () {
    get_card();
    $('#openp').on('click', function () {
        $('#popupp').fadeIn(300);
    });
    // popup_detail.html 팝업창을 띄우는 부분 (카드 상세보기 띄우기)
    $('#card_area').on('click', '.open_card', function () {
        let object_id = $(this).attr('name');
        $('#popupd_iframe').attr(
            'src',
            '/popupd?member_num=' + member_num + '&object_id=' + object_id
        );
        $('html, body').css({
            overflow: 'hidden',
        });
        $('#popupd').fadeIn(300);
    });

    // popup_detail.html 팝업창을 닫는 부분 (카드 상세보기 닫기)
    $('#close_popupd').click(function () {
        $('html, body').css({
            overflow: 'auto',
        });
        $('#popupd').fadeOut(300);
    });

    // popup_password.html 팝업창을 띄우는 부분 (비밀번호 확인창 띄우기)
    $('#openp').click(function () {
        $('#popupp_iframe').attr(
            'src',
            '/popupp?member_num=' + member_num + '&object_id=0'
        );
        $('html, body').css({
            overflow: 'hidden',
        });
        $('#popupp').fadeIn(300);
    });

    // popup_password.html 팝업창을 닫는 부분 (비밀번호 확인창 닫기)
    $('#close_popupp').click(function () {
        $('html, body').css({
            overflow: 'auto',
        });
        $('#popupp').fadeOut(300);
    });
});

function hide_popupd_close_btn() {
    $('#close_popupd').hide()
}

function show_popupd_close_btn() {
    $('#close_popupd').show()
}

function hide_popupp_close_btn() {
    $('#close_popupp').hide()
}

function show_popupp_close_btn() {
    $('#close_popupp').show()
}

function re_load() {
    window.location.reload();
}


function get_card() {
    $('#card_area').empty();
    fetch(`/card?num=${member_num}`)
        .then((res) => res.json())
        .then((data) => {
            let rows = data['card_list'];
            rows.forEach((a, index) => {
                let card_title = a['card_title'];
                let card_text = a['card_text'];
                let card_img = a['card_img'];
                let object_id = a['_id'];
                let temp_html = `<div id="card_img${index}" class="card_img open_card" name="${object_id}">
                              <a href="#">
                                  <img style="width: 302.5px; height: 302.5px; object-fit:cover;"
                                      src="${card_img}" alt=""
                                      onerror="document.getElementById('card_img${index}').style.display='none';
                                               document.getElementById('card_txt${index}').style.display='block';">
                              </a>
                           </div>
                           <div id="card_txt${index}" class="card_txt open_card" name="${object_id}">
                               <a href="#">
                                   <h3>${card_title}</h3>
                                   <p>${card_text}</p>
                               </a>
                           </div>`;
                $('#card_area').prepend(temp_html);
            });
        });
}
//bgm//
$(document).ready(function () {
  var audioPlayer = document.getElementById('audio-player');
  var playPauseButton = document.getElementById('play-pause-button');
  var isPlaying = false;

  playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseButton.textContent = 'bgm on ♫';
      isPlaying = false;
    } else {
      audioPlayer.currentTime = 3;
      audioPlayer.play();
      playPauseButton.textContent = 'bgm off 🔇';
      isPlaying = true;
    }
  });
});
//
