import { Typography, Paper } from "@mui/material";
import { useEffect } from "react";

function LogsDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { logs } = useSelector((state: any) => state.log);

  const useEffect = () => {
    dispatch(getDevContainerLog(name));
  };

  return (
    <Paper variant="outlined" style={{ padding: 16, overflow: "auto" }}>
      <Typography variant="body2" component="pre">
        {logs.logs}
      </Typography>
    </Paper>
  );
}

export default LogsDetail;
