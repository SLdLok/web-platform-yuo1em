var storage = firebase.storage();
var storageRef = storage.ref();

// Point to Folder Path
var forumStorage = storageRef.child('Forum');

// Create the file metadata
var metadata = {
  contentType: 'image/jpeg',
};

// Upload Method (putFolder eg. "forum")
function uploadFile(file, putFolder, metadata) {
  // Upload file with metadata
  var uploadTask = storageRef
    .child(putFolder + '/' + file.name)
    .put(file, metadata);

  // listen the state change
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}
//  uploadButton Test(Remove)
function btnUpload() {
  uploadFile(document.getElementById('fileButton').value, 'test', metadata);
}
console.log('Loading Upload Script');
