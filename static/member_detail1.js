$(document).ready(function () {
    get_card();

    $('#card_area').on('click', '.open_card', function () {
        let object_id = $(this).attr('name')
        $('#popupd_iframe').attr('src', "/popupd?member_num=" + member_num + "&object_id=" + object_id);
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupd').fadeIn(300);
    })

    $('#close_popupd').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupd').fadeOut(300);
    })

    
    $('.open_popupp').click(function () {
        $('#popupp_iframe').attr('src', "/popupp?member_num=" + member_num + "&object_id=0");
        $('html, body').css({
            'overflow': 'hidden'
        });
        $('#popupp').fadeIn(300);
    })

    $('#close_popupp').click(function () {
        $('html, body').css({
            'overflow': 'auto'
        });
        $('#popupp').fadeOut(300);
    })
})
//bgm//
$(document).ready(() => {
    const button = $('#play-pause-button');
    const video = $('#video');

    button.on('click', () => {
      if (video[0].paused) {
        video[0].play();
        button.text('bgm off ♪');
      } else {
        video[0].pause();
        button.text('bgm on ♫');
      }
    });

    video.on('ended', () => {
      button.text('bgm on ♫');
    });
  });
//

function hide_close_btn() {
    $('#close_popupp').hide()
}

function show_close_btn() {
    $('#close_popupp').show()
}

function re_load() {
    window.location.reload();
}

function get_card() {
   $('#card_area').empty()
    fetch(`/card?num=${member_num}`).then((res) => res.json()).then((data) => {
        let rows = data['card_list']
        rows.forEach((a, index) => {
            let card_title = a['card_title']
            let card_text = a['card_text']
            let card_img = a['card_img']
            let object_id = a['_id']

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
                             </div>`
            $('#card_area').prepend(temp_html)
        })
    })
}