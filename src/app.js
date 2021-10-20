const getInputObj = () => {
  let objToAddData = {};

  for (let i = 1; i < 6; i++) {
    if ($(`input[name=data_name${i}]`).val() === "") {
      break;
    }
    Object.assign(objToAddData, {
      [`data${i}`]: {
        name: $(`input[name=data_name${i}]`).val(),
        value: Number($(`input[name=data_value${i}]`).val()),
      },
    });
  }

  Object.assign(objToAddData, {
    display: $("select[name=data_side]").val(),
  });

  Object.assign(objToAddData, {
    size: {
      width: $(`input[name=chart_width]`).val(),
      height: $(`input[name=chart_height]`).val(),
    },
  });

  return objToAddData;
};

const getHtmlToInsert = (data) => {
  console.log(`${data.display}_chart`);
  let html = "";
  html += `<div class=${data["display"]}_chart>`;

  for (let i = 1; i < 6; i++) {
    if (!data.hasOwnProperty([`data${i}`])) {
      break;
    }

    html += `<div class=chart_element${i}>`;
    html += `<div class='element_value'>${
      data[`data${i}`]["value"]
    }</div><div class='element_label'>${data[`data${i}`]["name"]}</div></div>`;
  }

  html += "</div>";

  // TO ADD LATER WHEN Y-AXIS IS DONE
  // html +=
  //   '<div class="chart_y"><div class="y_max">100</div><div class="y_min">0</div></div>';

  return html;
};

const adjustChartSize = (data) => {
  $(`.${data["display"]}_chart`).css("width", data["size"]["width"]);
  $(`.${data["display"]}_chart`).css("height", data["size"]["height"]);
};

// const drawBarChart = (data, options, element) => {

// }

$(document).ready(() => {
  //get input upon submitting

  $(".form").submit((event) => {
    event.preventDefault();

    const inputData = getInputObj();

    console.log(inputData);

    const htmlToInsert = getHtmlToInsert(inputData);

    $(".section_left").append(htmlToInsert);

    adjustChartSize(inputData);
  });
});
