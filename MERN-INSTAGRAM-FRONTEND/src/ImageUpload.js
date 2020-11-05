import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";
import { Input, Button, makeStyles } from "@material-ui/core";
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginTop: "4px",
    paddingLeft: "4px",
  },
  button: {
    marginTop: "20px",
  },
  fileInput: {
    marginTop: "30px",
  },
}));

const ImageUpload = ({ username }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            axios.post("/upload", {
              caption: caption,
              user: username,
              image: url,
            });

            // post image inside db
            db.collection("posts").add({
              imageUrl: url,
              caption: caption,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        placeholder="Enter a caption"
        className={classes.inputField}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div>
        <input
          className={classes.fileInput}
          type="file"
          onChange={handleChange}
        />
        <div>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div>

      <br />
    </div>
  );
};

export default ImageUpload;
