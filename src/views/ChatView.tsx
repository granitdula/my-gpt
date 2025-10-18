import {
  AppBar,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";

const appBarColor = blueGrey[900];
const textBubbleColor = blueGrey[600];

export function ChatView() {
  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        <AppBar position="static" sx={{ backgroundColor: appBarColor }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My GPT
          </Typography>
        </AppBar>
        <Grid2 container rowSpacing={1} marginTop={"1rem"}>
          <Grid2 container size={12}>
            <Grid2 size={1}>
              <AccountCircleIcon fontSize="large" />
            </Grid2>
            <Grid2 size={10.5}>
              <Paper
                elevation={6}
                sx={{
                  backgroundColor: textBubbleColor,
                  color: "white",
                  padding: "0.5rem",
                }}
              >
                Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.
              </Paper>
            </Grid2>
          </Grid2>
          <Grid2 container size={12}>
            <Grid2 size={1}>
              <SmartToyIcon fontSize="large" />
            </Grid2>
            <Grid2 size={10.5}>
              <Paper
                elevation={6}
                sx={{ backgroundColor: textBubbleColor, color: "white" }}
              >
                Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.Created a big piece of text to fill this up to see how it
                looks.
              </Paper>
            </Grid2>
          </Grid2>
        </Grid2>
        <TextField
          id="outlined-basic"
          label="Type here"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
          sx={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "0 1rem 1rem 1rem",
          }}
        />
      </Container>
    </>
  );
}
