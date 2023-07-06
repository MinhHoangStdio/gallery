import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from "uuid";
import uploadFileWithProgress from "../../../firebase/storage/uploadFileWithProgress";
import addDocument from "../../../firebase/db/addDocument";
import { useAuth } from "../../../context/AuthContext";

const ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const { currentUser, setAlert } = useAuth();
  useEffect(() => {
    const uploadImage = async () => {
      //tên file sẽ có đuôi .jpg(hoặc đuôi khác), pop để lấy ra phần tử cuối :v tức cái đuôi á, thành ra cái imageName nó sẽ có tên là ádấd.jpg chẳng hạn
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      //   console.log({ imageName });
      try {
        const url = await uploadFileWithProgress(
          file,
          `gallery/${currentUser.uid}`,
          imageName,
          setProgress
        );
        // console.log({ url });

        setImageURL(null);
        // -> up ảnh xong rồi thì cút thoai, để ẩn đi á mà

        const galleryDoc = {
          imageURL: url,
          uid: currentUser?.uid || "",
          uEmail: currentUser?.email || "",
          uName: currentUser?.displayName || "",
          uPhoto: currentUser?.photoURL || "",
        };
        await addDocument("gallery", galleryDoc, imageName);
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 8000,
          location: "main",
        });
        console.log(error);
      }
    };
    //Set ảnh từ file trước rồi sau up thành công mới set về null nghe mày
    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
          src={imageURL}
          alt="images gallery"
          loading="lazy"
        />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,.5)",
};
