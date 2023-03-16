
$(document).ready(function () {
    $('#password_check_btn').on('click', function () {
        check_password();
    })

    $('#close_popupe').on('click', function () {
        $('#popupe').fadeOut(300);
        window.parent.show_popupp_close_btn();
    })
})

function check_password() {
    let password = $('#password_input').val()

    let formData = new FormData();
    formData.append("password_give", password);

    fetch(`/detail/${member_num}`, { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        //console.log(data)
        if (data['check'] == '1') {
            $('#popupe_iframe').attr('src', "/popupe?member_num=" + member_num + "&object_id=" + object_id);
            $('#popupe').fadeIn(300);
            window.parent.hide_popupp_close_btn();
        } else {
            alert(data['msg']);
        }
    });
}