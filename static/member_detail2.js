const button = document.getElementById('mybgm');
const iframe = document.getElementById('myif');
button.addEventListener('click', () => {
  iframe.src = 'https://www.youtube.com/embed/74_yqNBhQbA?start=3';
  iframe.contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    '*'
  );
});
function get_card() {
  $('#card_area').empty();

  fetch(`/card?num=${member_num}`)
    .then((res) => res.json())
    .then((data) => {
      let rows = data['card_list'];
      rows.forEach((a, index) => {
        let card_title = a['card_title'];
        let card_text = a['card_txt'];
        let card_img = a['card_img'];
        let object_id = a['_id'];

        let temp_html = `<div id="card_img${index}" class="card_img">
                                  <a href="#" name="${object_id}">
                                      <img style="width: 302.5px; height: 302.5px; object-fit:cover;"
                                          src="${card_img}" alt=""
                                          onerror="document.getElementById('card_img${index}').style.display='none';
                                                  document.getElementById('card_txt${index}').style.display='block';">
                                  </a>
                              </div>
                              <div id="card_txt${index}" class="card_txt">
                                  <a href="#" name="${object_id}">
                                      <h3>${card_title}</h3>
                                      <p>${card_text}</p>
                                  </a>
                              </div>`;
        $('#card_area').prepend(temp_html);
      });
    });
}

