import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";

export default function Copyright(props: any) {
  return (
      <Typography mb={4} variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Tasker
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}