import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography/Typography";


export default function Loading({title}: {title: string}) {
  return (
      <Container sx={{mt: 5}} component="main" maxWidth="xl">
        <Box mt={20} component={'div'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <CircularProgress/>
          <Typography variant="h4" color="primary" gutterBottom>
            {title}
          </Typography>
        </Box>
      </Container>
  );
}