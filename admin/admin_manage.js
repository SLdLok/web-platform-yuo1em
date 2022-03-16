display("account-manager");
function display(screenName) {
  if (screenName === "account-manager") {
    document.getElementById(
      "ContentBox"
    ).innerHTML = `<div class="h-100 w-100" style="margin: 1.25rem;">
    <div class="row">
      <div class="col-2"><label class="form-label text-center text-secondary">UID : </label></div>
      <div class="col-8"><input type="" id="input_UID" class="form-control w-100"/></div>
      <div class="col-2"></div>
    </div>
    <br/>
    <div class="row">
    
    <div class="col-10"><button class="btn btn-sm w-100 btn-primary" onclick="accountLoadData()">Search & Load</button></div>
    <div class="col-2"></div>
    </div>

    <div class="row">
    <br/>
      <label class="text-secondary" id="SearchOutput" style="font-size: 0.75rem;"> > Nothing Happened</label>
      <br/><br/>
    </div>
    <div class="row">

      <div class="col-12">
      <!-- INPUT -->
        <div class="row">
          <div class="col-3"><label class="form-label text-center text-secondary"><span style="font-size: 0.4rem;">Display Name :</span></label></div>
          <div class="col-9"><input id="input_displayName" type='text' class="form-control w-75"/></div>
        </div>
        <div class="row">
          <div class="col-3"><label class="form-label text-center text-secondary"><span style="font-size: 0.4rem;">Access :</span></label></div>
          <div class="col-9">
          <select class="form-select form-select-sm w-75" id="input_access" aria-label=".form-select-sm example">
          <option selected></option>
          <option value="unsigned">Unsigned</option>
          <option value="student">student</option>
          <option value="teacher">teacher</option>
          <option value="admin">admin</option>
        </select>
        </div>
        </div>
        <div class="row">
          <div class="col-3"><label class="form-label text-center text-secondary"><span style="font-size: 0.4rem;">Owned Point :</span></label></div>
          <div class="col-9"><input type='number' id="input_pointOwned" class="form-control w-75"/></div>
        </div>
        <div class="row">
          <div class="col-3"><label class="form-label text-center text-secondary"><span style="font-size: 0.4rem;">Daily Question Limit :</span></label></div>
          <div class="col-9"><input type='number' id="input_dailyQuestionLimit" class="form-control w-75"/></div>
        </div>
        <div class="row">
          <div class="col-3"><label class="form-label text-center text-secondary"><span style="font-size: 0.4rem;">Daily Quiz Limit :</span></label></div>
          <div class="col-9"><input type='number' id="input_dailyQuizLimit" class="form-control w-75"/></div>
        </div>
        <div class="row">
        <label class="form-label text-secondary hide w-100"></label>
      <button type="button" class="btn btn-success w-25" onclick="accountSaveData()">Save</button>
      <button type="button" class="btn btn-secondary w-25" onclick="accountLoadData()">Load</button>
      <button type="button" class="btn btn-danger w-25">Del.</button>
      </div>
      </div>


    </div>



    </div>
    `;
  } else if (screenName === "file-manager") {
    document.getElementById(
      "ContentBox"
    ).innerHTML = `
    `;
  }
}

// Var
var UserDataJSONText = "";

// Other Function

function accountLoadData() {
  var uid = document.getElementById("input_UID")
    .value;
  console.log(uid);
  var docRef = db.collection("UserData").doc(uid);
  document.getElementById(
    "SearchOutput"
  ).innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div> <span class="sr-only"> Loading...</span>`;
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        document.getElementById(
          "SearchOutput"
        ).innerHTML =
          "Account[" +
          uid +
          "] is Found. Data Loaded.";
        console.log("Document data:", doc.data());

        // Load Data
        UserDataJSONText = JSON.stringify(
          doc.data()
        );

        document.getElementById(
          "input_displayName"
        ).value = doc.data().DisplayID;
        document.getElementById(
          "input_pointOwned"
        ).value = doc.data().PointOwned;
        document.getElementById(
          "input_access"
        ).value = doc.data().Role;
        document.getElementById(
          "input_dailyQuestionLimit"
        ).value = doc.data().DailyQuestionLimit;
        document.getElementById(
          "input_dailyQuizLimit"
        ).value = doc.data().DailyQuizLimit;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        document.getElementById(
          "SearchOutput"
        ).innerHTML =
          "Account[" + uid + "] is not Found. ";
      }
    })
    .catch((error) => {
      console.log(
        "Error getting document:",
        error
      );
    });
}

function accountSaveData() {
  var uid = document.getElementById("input_UID")
    .value;
  console.log(uid);
  var docRef = db.collection("UserData").doc(uid);
  document.getElementById(
    "SearchOutput"
  ).innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div> <span class="sr-only"> Loading...</span>`;

  // Set the "capital" field of the city 'DC'
  return docRef
    .update({
      DailyQuestionLimit: document.getElementById(
        "input_dailyQuestionLimit"
      ).value,
      DailyQuizLimit: document.getElementById(
        "input_dailyQuizLimit"
      ).value,
      PointOwned: document.getElementById(
        "input_pointOwned"
      ).value,
      Role: document.getElementById(
        "input_access"
      ).value,
      DisplayID: document.getElementById(
        "input_displayName"
      ).value
    })
    .then(() => {
      console.log(
        "Document successfully updated!"
      );
      document.getElementById(
        "SearchOutput"
      ).innerHTML =
        "Account[" + uid + "] is saved.";
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error(
        "Error updating document: ",
        error
      );
      document.getElementById(
        "SearchOutput"
      ).innerHTML =
        "Account[" +
        uid +
        "] don't save successfully. ERROR:[<span style='font-size: 0.5rem;'" +
        error +
        "</span>]";
    });
}
