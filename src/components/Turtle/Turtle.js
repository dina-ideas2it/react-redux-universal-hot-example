import React from 'react';
const styles = require('./Turtle.scss');

const turtle = () => {
  return (
    <div className={styles.turtle}>
    </div>
  );
};

export default turtle;


// function windowBlurHandler() {
//   $('[data-toggle="dropdown"][aria-expanded="true"]')
//   .closest('.dropdown.open').removeClass('open');
//   $(window).off('blur', windowBlurHandler);
// }
//
//
//
// $(window).on("shown.bs.dropdown", function(event){
//     $(window).on('blur', windowBlurHandler);
// });
//
// function windowBlurHandler() {
//   $('[data-toggle="dropdown"][aria-expanded="true"]')
//   .closest('.dropdown.open').removeClass('open');
//   $(document).off('blur', windowBlurHandler);
// }
//
// $(document).on("shown.bs.dropdown", function(event){
//     $(document).on('blur', windowBlurHandler);
// });
