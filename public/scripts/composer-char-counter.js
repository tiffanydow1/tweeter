
//function that keeps track of the number of characters used while typing in the text area.
 $(document).ready(function() {

    let charMax = 140;

  $('textarea').on('keyup', function() {
    let textLength = $(this).val().length;
    let remainingText = charMax - textLength;

    let textCounter = $(this).siblings('.counter').text(remainingText);

     if (remainingText < 0) {
      $('.new-tweet span').addClass('color');
     } else if (remainingText > 0) {
      $('.new-tweet span').removeClass('color');
     }
   });
 });


