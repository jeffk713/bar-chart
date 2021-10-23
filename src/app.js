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
    chart: {
      name: $("input[name=chart_name]").val(),
      size: Number($("input[name=chart_font_size]").val()),
      color: $("select[name=chart_color]").val(),
    },
  });

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
    html += `<div class="chart_container"><p class="chart_title">${data["chart"]["name"]}</p><div class="chart"><p class="y_max">${data["biggestValue"]}</p>`;
  } else {
    html += `<div class="chart_container"><p class="chart_title">${data["chart"]["name"]}</p><div class="chart"><p class="y_max">${data["biggestValue"]}</p><p class="y_min">${data["smallestValue"]}</p>`;
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
  $(".chart_title").css("font-size", data["chart"]["size"]);
  $(".chart_title").css("color", data["chart"]["color"]);

  $(".chart").css("width", data["size"]["width"]);
  $(".chart").css("height", data["size"]["height"]);

  $(".bar").css("width", (data["size"]["width"] * 0.9) / data["numOfData"]);
  $(".bar").css("margin-left", data["barGap"]);

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

  $(".y_min").css(
    "top",
    `${
      data["size"]["height"] -
      data["size"]["height"] * (data["smallestValue"] / data["biggestValue"]) -
      10
    }px`
  );
};

const drawBarChart = (data) => {
  $(".chart_container").empty();

  const htmlToInsert = getHtmlToInsert(data);
  $(`.section_${data["display"]}`).append(htmlToInsert);

  adjustStyles(data);
};

$(document).ready(() => {
  alert("Demo chart will display after this message for 5seconds.");

  let demoInput = {
    barGap: 15,
    biggestValue: 164,
    smallestValue: 140,
    display: "left",
    numOfData: 3,
    chart: {
      color: "red",
      name: "height (cm)",
      size: 20,
    },
    data1: {
      barColor: "red",
      labelColor: "red",
      name: "child 1",
      value: 140,
      valuePosition: "0%",
    },
    data2: {
      barColor: "green",
      labelColor: "green",
      name: "child 2",
      value: 164,
      valuePosition: "0%",
    },
    data3: {
      barColor: "orange",
      labelColor: "orange",
      name: "child 3",
      value: 159,
      valuePosition: "0%",
    },
    size: {
      width: 400,
      height: 300,
    },
  };

  drawBarChart(demoInput);

  setTimeout(() => {
    $(".chart_container").empty();
  }, 2900);

  demoInput = {
    barGap: 20,
    biggestValue: 6,
    smallestValue: 1,
    display: "right",
    numOfData: 3,
    chart: {
      color: "red",
      name: "workout frequency per week",
      size: 20,
    },
    data1: {
      barColor: "red",
      labelColor: "red",
      name: "person 1",
      value: 3,
      valuePosition: "0%",
    },
    data2: {
      barColor: "green",
      labelColor: "green",
      name: "person 2",
      value: 6,
      valuePosition: "0%",
    },
    data3: {
      barColor: "orange",
      labelColor: "orange",
      name: "person 3",
      value: 1,
      valuePosition: "0%",
    },
    size: {
      width: 400,
      height: 300,
    },
  };

  setTimeout(() => {
    drawBarChart(demoInput);
  }, 3000);

  setTimeout(() => {
    $(".chart_container").empty();
  }, 6000);

  $(".form").submit((event) => {
    event.preventDefault();

    const inputData = getInputObj();
    console.log(inputData);

    if (inputData["numOfData"] === 0) {
      return alert("please enter at least one data");
    }

    drawBarChart(inputData);
  });
});
