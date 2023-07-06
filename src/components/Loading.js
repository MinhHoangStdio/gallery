import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Loading = () => {
  const { loading } = useAuth();
  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Typography sx={{ color: "white" }}>Đợi xíu nha</Typography>
        <CircularProgress sx={{ color: "white" }} />
      </Stack>
    </Backdrop>
  );
};

export default Loading;
