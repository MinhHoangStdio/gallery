import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import Options from "./Options";
import useFirestore from "../../firebase/db/useFirestore";
import { useAuth } from "../../context/AuthContext";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const { currentUser } = useAuth();
  const { documents } = useFirestore();
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageList variant="quilted" cols={4} rowHeight={200}>
          {documents.map((item, index) => (
            <ImageListItem
              key={item?.id}
              cols={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              }
              rows={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows
              }
            >
              {currentUser?.uid === item?.data?.uid && (
                <Options imageId={item?.id} />
              )}
              <img
                {...srcset(
                  item?.data?.imageURL,
                  200,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].rows,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].cols
                )}
                alt={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                loading="lazy"
                className="listImage"
              />
              <Typography
                variant="body2"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  color: "white",
                  background: "rgba(0,0,0, .3)",
                  p: "5px",
                  borderTopRightRadius: 8,
                }}
              >
                {moment(item?.data?.timestamp?.toDate()).fromNow()}
              </Typography>
              <Tooltip
                title={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
              >
                <Avatar
                  sx={{
                    position: "absolute",
                    bottom: "3px",
                    right: "3px",
                    cursor: "pointer",
                  }}
                  src={item?.data?.uPhoto}
                  imgProps={{ "aria-hidden": true }}
                />
              </Tooltip>
            </ImageListItem>
          ))}
        </ImageList>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
