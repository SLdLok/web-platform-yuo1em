var url = "";
function replaceStyle(startTag, endTag) {
  // javascript
  var txtarea = document.getElementById(
    textEditorName
  );
  var start = txtarea.selectionStart;
  var finish = txtarea.selectionEnd;
  if (allowV2 == true) {
    var allText = txtarea.innerHTML;
  } else {
    var allText = txtarea.value;
  }
  var sel = allText.substring(start, finish);
  var newText =
    allText.substring(0, start) +
    "<" +
    startTag +
    ">" +
    sel +
    "</" +
    endTag +
    ">" +
    allText.substring(finish, allText.length);
  if (allowV2 == true) {
    txtarea.innerHTML = newText;
  } else {
    document.body.innerHTML = document.body.innerHTML.replace(
      window.getSelection()
    );
  }
}

function EditorAddText(text) {
  // javascript
  var txtarea = document.getElementById(
    textEditorName
  );
  var start = txtarea.selectionStart;
  var finish = txtarea.selectionEnd;
  if (allowV2 == true) {
    var allText = txtarea.innerHTML;
  } else {
    var allText = txtarea.value;
  }

  var sel = allText.substring(start, finish);
  var newText =
    allText.substring(0, start) +
    text +
    allText.substring(finish, allText.length);
  if (allowV2 == true) {
    txtarea.innerHTML = newText;
  } else {
    txtarea.value = newText;
  }
}

function replaceStyleWithInnerHTML(
  startTag,
  content,
  endTag
) {
  // javascript
  var txtarea = document.getElementById(
    textEditorName
  );
  var start = txtarea.selectionStart;
  var finish = txtarea.selectionEnd;
  if (allowV2 == true) {
    var allText = txtarea.innerHTML;
  } else {
    var allText = txtarea.value;
  }
  var newText =
    allText.substring(0, start) +
    "<" +
    startTag +
    ">" +
    content +
    "</" +
    endTag +
    ">" +
    allText.substring(finish, allText.length);
  if (allowV2 == true) {
    txtarea.innerHTML = newText;
  } else {
    txtarea.value = newText;
  }
}

function textStyle(style) {
  var input = document.getElementById(
    "editorTextInput"
  );
  if (style == "bold") {
    if (window.getSelection().toString() == "") {
      replaceStyle("b", "b");
    } else {
      replaceStyle("b", "b");
    }
  } else if (style == "italic") {
    if (window.getSelection().toString() == "") {
      replaceStyle("i", "i");
    } else {
      replaceStyle("i", "i");
    }
  } else if (style == "underline") {
    if (window.getSelection().toString() == "") {
      replaceStyle("u", "u");
    } else {
      replaceStyle("u", "u");
    }
  } else if (style == "insertUnorderedList") {
    if (window.getSelection().toString() == "") {
      replaceStyle("ul", "ul");
    } else {
      replaceStyle("ul", "ul");
    }
  } else if (style == "insertOrderedList") {
    if (window.getSelection().toString() == "") {
      replaceStyle("ol", "ol");
    } else {
      replaceStyle("ol", "ol");
    }
  } else if (style == "justifyLeft") {
    if (window.getSelection().toString() == "") {
      replaceStyle(
        "p style='text-align: left'",
        "p"
      );
    } else {
      replaceStyle(
        "p style='text-align: left'",
        "p"
      );
    }
  } else if (style == "justifyCenter") {
    if (window.getSelection().toString() == "") {
      replaceStyle(
        "p style='text-align: center'",
        "p"
      );
    } else {
      replaceStyle(
        "p style='text-align: center'",
        "p"
      );
    }
  } else if (style == "justifyRight") {
    if (window.getSelection().toString() == "") {
      replaceStyle(
        "p style='text-align: right'",
        "p"
      );
    } else {
      replaceStyle(
        "p style='text-align: right'",
        "p"
      );
    }
  } else if (style == "justifyFull") {
    if (window.getSelection().toString() == "") {
      replaceStyle(
        "p style='text-align: justify'",
        "p"
      );
    } else {
      replaceStyle(
        "p style='text-align: justify'",
        "p"
      );
    }
  } else if (style == "insertLink") {
    if (window.getSelection().toString() == "") {
    } else {
      var txtarea = document.getElementById(
        "editorTextInput"
      );
      var start = txtarea.selectionStart;
      var finish = txtarea.selectionEnd;
      var allText = txtarea.value;
      var sel = allText.substring(start, finish);
      document.getElementById(
        "popup-link-input2"
      ).value = sel;
    }
  } else if (style == "insertImage") {
    if (window.getSelection().toString() == "") {
    } else {
    }
  }
  document.getElementById(
    "displayTextOutput"
  ).innerHTML = document.getElementById(
    "editorTextInput"
  ).value;
  updateText();
}

function addLink() {
  replaceStyleWithInnerHTML(
    `a href='` +
      document.getElementById("popup-link-input1")
        .value +
      `'`,
    document.getElementById("popup-link-input2")
      .value,
    `a`
  );
  document.getElementById(
    "popup-link-input1"
  ).value = "https://";
  updateText();
}

function updateText() {
  document.getElementById(
    "editorTextInput"
  ).value = document
    .getElementById("editorTextInput")
    .value.replace(/\n/g, "<br/>");
  document.getElementById(
    "displayTextOutput"
  ).innerHTML = document.getElementById(
    "editorTextInput"
  ).value;
  MathJax.typeset();
}

document
  .getElementById("editorTextInput")
  .addEventListener("input", (event) => {
    updateText();
  });

function msgProgress(state, progress) {
  if (state == "uploading") {
    document.getElementById(
      "progressLabel"
    ).innerHTML = progress + "% of File Uploaded";
  } else if (state == "ended") {
    document.getElementById(
      "progressLabel"
    ).innerHTML = "Uploaded";
    url = progress;
  }
}

function addImg() {
  replaceStyle(
    `img class="img-fluid" src='` + url + `'`,
    "img"
  );
  updateText();
}

document
  .getElementById("displayTextOutput")
  .addEventListener("input", (event) => {
    var patt2 = new RegExp("<div>", "g");
    var patt3 = new RegExp("</div>", "g");
    var t = document
      .getElementById("displayTextOutput")
      .innerHTML.replace(patt2, "<br/>")
      .replace(patt3, "");
    document.getElementById(
      "editorTextInput"
    ).value = t;
  });

var allowV2 = false;
var textEditorName = "editorTextInput";
// PASTE FUNCTION

function toggleEditorMode(modeV) {
  if (modeV == 1) {
    textEditorName = "editorTextInput";
    allowV2 = false;
  } else if (modeV == 2) {
    textEditorName = "displayTextOutput";
    allowV2 - true;
  }
}
