$(function () {

  const maxCount = 140;
  $('textarea').on('input', function() {
    let length = $(this).val().length;
    length = maxCount - length;
    $('.counter').text(length);
    $('.counter').css('color', 'black');
    if (length < 0) {
      $('.counter').css('color', 'red');
    }
  });
});