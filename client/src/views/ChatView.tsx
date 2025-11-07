import {
  AppBar,
  CircularProgress,
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
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import axios from "axios";

const appBarColor = blueGrey[900];
const textBubbleColor = blueGrey[600];

interface Chat {
  isUser: boolean;
  text: string;
  loading?: boolean;
}

export function ChatView() {
  const [chat, setChat] = useState<Chat[]>([]);
  const [textInput, setTextInput] = useState("");

  const onSend = async () => {
    if (textInput.length !== 0) {
      setChat([
        ...chat,
        {
          isUser: true,
          text: textInput,
        },
      ]);

      try {
        setChat((prevChat) => [
          ...prevChat,
          {
            isUser: false,
            text: "",
            loading: true,
          },
        ]);
        const res = await axios.post("http://localhost:3000/llm/prompt", {
          data: {
            prompt: textInput,
          },
        });

        setChat((prevChat) => prevChat.filter((item) => item.loading !== true));

        setChat((prevChat) => [
          ...prevChat,
          {
            isUser: false,
            text: res.data.data.answer,
          },
        ]);
      } catch (error) {
        console.log(error);
      }

      setTextInput("");
    }
  };

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSend();
    }
  };

  return (
    <>
      <Container maxWidth={false} disableGutters={true}>
        <AppBar position="static" sx={{ backgroundColor: appBarColor }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My GPT
          </Typography>
        </AppBar>
        <Grid2
          container
          rowSpacing={1}
          marginTop={"1rem"}
          sx={{ maxHeight: "45rem", overflow: "scroll" }}
        >
          {chat.map((chatRow, index) => (
            <Grid2 container size={12} key={index}>
              <Grid2 size={0.5}>
                {chatRow.isUser ? (
                  <AccountCircleIcon fontSize="large" />
                ) : (
                  <SmartToyIcon fontSize="large" />
                )}
              </Grid2>
              <Grid2 size={11}>
                {chatRow.loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <Paper
                    elevation={6}
                    sx={{
                      backgroundColor: textBubbleColor,
                      color: "white",
                      padding: "0.5rem",
                    }}
                  >
                    {chatRow.text}
                  </Paper>
                )}
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
        <TextField
          id="outlined-basic"
          label="Type here"
          value={textInput}
          onChange={onTextChange}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onSend}>
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
