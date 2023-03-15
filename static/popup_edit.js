
$(document).ready(function () {
    if (object_id == '0') {
        $('#delete').hide()
        $('#edit').hide()
    } else {
        $('#add').hide()
    }
})

function add_card() {
    event.preventDefault();

    let card_title = $('#카드 제목 작성칸').val()
    let card_text = $('#카드 텍스트 작성칸').val()
    let card_img = $('#카드 이미지URL 작성칸').val()

    let formData = new FormData();
    formData.append("member_num_give", member_num);
    formData.append("card_title_give", card_title);
    formData.append("card_text_give", card_text);
    formData.append("card_img_give", card_img);
    formData.append("password_give", password);

    fetch('/card', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        //console.log(data)
        alert(data['msg'])
        if (data['reload'] == '1') {
            window.location.reload();
        }


    });
}