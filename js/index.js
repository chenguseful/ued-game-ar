$('.user-photo-show').on('click', function () {
    $(this).addClass('hidden');
    $('.user-box ul').removeClass('hidden');
})

$('.user-photo-sel').on('click', function () {
    const dom = $(this).html();
    $('.user-photo-show').removeClass('hidden').html(dom);
    $('.user-box ul').addClass('hidden');
})

$(document).on('click', '.no-thing', function () {
    mui.toast('敬请期待', {
        duration: 'long',
        type: 'div'
    })
})