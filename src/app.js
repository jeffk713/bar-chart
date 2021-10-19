$(document).ready(() => {
  //get input upon submitting
  let inputObj = {};

  $(".form").submit((event) => {
    event.preventDefault();
    for (let i = 0; i < 5; i++) {
      Object.assign(inputObj, {
        [`data${i + 1}`]: {
          name: $(`input[name=data_name${i + 1}]`).val(),
          value: $(`input[name=data_value${i + 1}]`).val(),
        },
      });
    }

    console.log(inputObj);
  });
});
