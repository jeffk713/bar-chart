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
        valuePosition: $(`select[name=bar_value_position${i}]`).val(),
      },
    });

    if (i === 1) {
      Object.assign(objToAddData, {
        biggestValue: Number($(`input[name=data_value${i}]`).val()),
        smallestValue: Number($(`input[name=data_value${i}]`).val()),
      });
    } else if (
      Number($(`input[name=data_value${i}]`).val()) > objToAddData.biggestValue
    ) {
      objToAddData.biggestValue = Number($(`input[name=data_value${i}]`).val());
    } else if (
      Number($(`input[name=data_value${i}]`).val()) < objToAddData.smallestValue
    ) {
      objToAddData.smallestValue = Number(
        $(`input[name=data_value${i}]`).val()
      );
    }
  }

  Object.assign(objToAddData, {
    barGap: Number($("input[name=bar_gap]").val()),
  });

  Object.assign(objToAddData, {
    display: $("select[name=data_side]").val(),
  });

  Object.assign(objToAddData, {
    size: {
      width: Number($(`input[name=chart_width]`).val()),
      height: Number($(`input[name=chart_height]`).val()),
    },
  });

  return objToAddData;
};

const getHtmlToInsert = (data) => {
  let html = "";

  if (data["numOfData"] === 1) {
    html += `<div class="chart_container"><div class="chart"><p class="y_max">${data["biggestValue"]}</p>`;
  } else {
    html += `<div class="chart_container"><div class="chart"><p class="y_max">${data["biggestValue"]}</p><p class="y_min">${data["smallestValue"]}</p>`;
  }

  for (let i = 1; i < 6; i++) {
    if (!data.hasOwnProperty([`data${i}`])) {
      break;
    }

    html += `<div class='bar bar${i}'>`;
    html += `<div class='bar_value bar_value${i}'>${
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

const adjustStyles = (data) => {
  $(".chart").css("width", data["size"]["width"]);
  $(".chart").css("height", data["size"]["height"]);

  $(".bar").css("width", (data["size"]["width"] * 0.9) / data["numOfData"]);

  for (let i = 1; i < data["numOfData"] + 1; i++) {
    $(`.bar${i}`).css(
      "height",
      data["size"]["height"] *
        (data[`data${i}`]["value"] / data["biggestValue"])
    );
    $(`.label${i}`).css("color", data[`data${i}`]["labelColor"]);
    $(`.bar${i}`).css("background-color", data[`data${i}`]["barColor"]);
    $(`.bar_value${i}`).css("top", data[`data${i}`]["valuePosition"]);
  }

  $(".bar").css("margin-left", data["barGap"]);

  $(".y_min").css(
    "top",
    `${
      data["size"]["height"] -
      data["size"]["height"] * (data["smallestValue"] / data["biggestValue"]) -
      10
    }px`
  );
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

    adjustStyles(inputData);
  });
});
