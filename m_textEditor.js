document
  .getElementById("editorTextInput")
  .addEventListener("input", (event) => {
    document.getElementById(
      "m_editorTextInput"
    ).value = document.getElementById(
      "editorTextInput"
    ).value;
    m_updateText();
  });
document
  .getElementById("m_editorTextInput")
  .addEventListener("input", (event) => {
    document.getElementById(
      "editorTextInput"
    ).value = document.getElementById(
      "m_editorTextInput"
    ).value;
    updateText();
    m_updateText();
  });

function m_updateText() {
  document.getElementById(
    "m_editorTextInput"
  ).value = document
    .getElementById("m_editorTextInput")
    .value.replace(/\n/g, "<br />");
  document.getElementById(
    "m_displayTextOutput"
  ).innerHTML = document.getElementById(
    "m_editorTextInput"
  ).value;
  MathJax.typeset();
}

function textStyle(style) {
  var input = document.getElementById(
    "m_editorTextInput"
  );
  if (style == "bold") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle("b", "b");
    } else {
      m_replaceStyle("b", "b");
    }
  } else if (style == "italic") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle("i", "i");
    } else {
      m_replaceStyle("i", "i");
    }
  } else if (style == "underline") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle("u", "u");
    } else {
      m_replaceStyle("u", "u");
    }
  } else if (style == "insertUnorderedList") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle("ul", "ul");
    } else {
      m_replaceStyle("ul", "ul");
    }
  } else if (style == "insertOrderedList") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle("ol", "ol");
    } else {
      m_replaceStyle("ol", "ol");
    }
  } else if (style == "justifyLeft") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle(
        "p style='text-align: left'",
        "p"
      );
    } else {
      m_replaceStyle(
        "p style='text-align: left'",
        "p"
      );
    }
  } else if (style == "justifyCenter") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle(
        "p style='text-align: center'",
        "p"
      );
    } else {
      m_replaceStyle(
        "p style='text-align: center'",
        "p"
      );
    }
  } else if (style == "justifyRight") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle(
        "p style='text-align: right'",
        "p"
      );
    } else {
      m_replaceStyle(
        "p style='text-align: right'",
        "p"
      );
    }
  } else if (style == "justifyFull") {
    if (window.getSelection().toString() == "") {
      m_replaceStyle(
        "p style='text-align: justify'",
        "p"
      );
    } else {
      m_replaceStyle(
        "p style='text-align: justify'",
        "p"
      );
    }
  } else if (style == "insertLink") {
    if (window.getSelection().toString() == "") {
    } else {
      var txtarea = document.getElementById(
        "m_editorTextInput"
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
    "m_displayTextOutput"
  ).innerHTML = document.getElementById(
    "m_editorTextInput"
  ).value;
  m_updateText();
}

function addLink() {
  m_replaceStyleWithInnerHTML(
    `a href='` +
      document.getElementById(
        "m_popup-link-input1"
      ).value +
      `'`,
    document.getElementById("m_popup-link-input2")
      .value,
    `a`
  );
  document.getElementById(
    "m_popup-link-input1"
  ).value = "https://";
  m_updateText();
}
function m_addImg() {
  m_replaceStyle(
    `img class="img-fluid" src='` + url + `'`,
    "img"
  );
  m_updateText();
}

function m_replaceStyle(startTag, endTag) {
  // javascript
  var txtarea = document.getElementById(
    "m_editorTextInput"
  );
  var start = txtarea.selectionStart;
  var finish = txtarea.selectionEnd;
  var allText = txtarea.value;
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
  txtarea.value = newText;
}

function m_replaceStyleWithInnerHTML(
  startTag,
  content,
  endTag
) {
  // javascript
  var txtarea = document.getElementById(
    "m_editorTextInput"
  );
  var start = txtarea.selectionStart;
  var finish = txtarea.selectionEnd;
  var allText = txtarea.value;
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
  txtarea.value = newText;
}
