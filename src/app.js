const getInputObj = () => {
  let objToAddData = {};

  for (let i = 1; i < 6; i++) {
    if ($(`input[name=data_name${i}]`).val() === "") {
      Object.assign(objToAddData, { numOfData: i - 1 });
      break;
    } else if (i === 5) {
      Object.assign(objToAddData, { numOfData: i });
    }

    Object.assign(objToAddData, {
      [`data${i}`]: {
        name: $(`input[name=data_name${i}]`).val(),
        value: Number($(`input[name=data_value${i}]`).val()),
        barColor: $(`select[name=bar_color${i}]`).val(),
        labelColor: $(`select[name=label_color${i}]`).val(),
      },
    });

    if (i === 1) {
      Object.assign(objToAddData, {
        biggestValue: Number($(`input[name=data_value${i}]`).val()),
      });
    } else if (
      Number($(`input[name=data_value${i}]`).val()) > objToAddData.biggestValue
    ) {
      objToAddData.biggestValue = Number($(`input[name=data_value${i}]`).val());
    }
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
  let html = "";

  html += '<div class="chart_container"><div class="chart">';

  for (let i = 1; i < 6; i++) {
    if (!data.hasOwnProperty([`data${i}`])) {
      break;
    }

    html += `<div class='bar bar${i}'>`;
    html += `<div class='bar_value'>${
      data[`data${i}`]["value"]
    }</div><div class='bar_label label${i}'>${
      data[`data${i}`]["name"]
    }</div></div>`;
  }

  html += "</div></div>";

  // TO ADD LATER WHEN Y-AXIS IS DONE
  // html +=
  //   '<div class="chart_y"><div class="y_max">100</div><div class="y_min">0</div></div>';

  return html;
};

const adjustChartSize = (data) => {
  $(`.${data["display"]}_chart`).css("width", data["size"]["width"]);
  $(`.${data["display"]}_chart`).css("height", data["size"]["height"]);

  $(".bar").css("width", (data["size"]["width"] * 0.9) / data["numOfData"]);

  for (let i = 1; i < data["numOfData"] + 1; i++) {
    $(`.bar${i}`).css(
      "height",
      data["size"]["height"] *
        0.9 *
        (data[`data${i}`]["value"] / data["biggestValue"])
    );
  }
};

const adjustStyles = (data) => {
  for (let i = 1; i < data["numOfData"] + 1; i++) {
    $(`.label${i}`).css("color", data[`data${i}`]["labelColor"]);
    $(`.bar${i}`).css("background-color", data[`data${i}`]["barColor"]);
  }
};

// const drawBarChart = (data, options, element) => {

// }

$(document).ready(() => {
  //get input upon submitting

  $(".form").submit((event) => {
    event.preventDefault();

    const inputData = getInputObj();
    console.log(inputData);

    $(".chart_container").empty();

    const htmlToInsert = getHtmlToInsert(inputData);
    $(`.section_${inputData["display"]}`).append(htmlToInsert);

    adjustChartSize(inputData);
    adjustStyles(inputData);
  });
});
