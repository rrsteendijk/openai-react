import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Grid, LinearProgress, CircularProgress } from "@mui/material";
import Message from "./Message";
import OpenAI from "openai";
import { MessageDto } from "../models/MessageDto";
import SendIcon from "@mui/icons-material/Send";
import { useModuleName } from '../contexts/ModuleNameContext';


const Chat: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());
  const [input, setInput] = useState<string>("");
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const assistantId = "asst_5thCkkx4rNkuIbCaRQA9hm4g";
  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    initChatBot();
  }, []);

  useEffect(() => {
    setMessages([
      {
        content: "Hoi, hoe kan ik je helpen?",
        isUser: false,
      },
    ]);
  }, [threadId]);

  const initChatBot = async () => {
    const thread = await openai.beta.threads.create();
    setThreadId(thread.id);
  };

  const createNewMessage = (content: string, isUser: boolean) => {
    const newMessage = new MessageDto(isUser, content);
    return newMessage;
  };

  const { setModuleName } = useModuleName(); // Aangenomen dat je context zo is opgezet

  const extractAndStoreModuleName = (assistantResponse) => {
    const searchTerm = "Jouw module heet";
    const startIndex = assistantResponse.indexOf(searchTerm);
    if (startIndex !== -1) {
      const endIndex = assistantResponse.indexOf(".", startIndex);
      const moduleName = assistantResponse.substring(startIndex + searchTerm.length, endIndex).trim();
      console.log(`Module naam opgeslagen: ${moduleName}`); // Log de module naam
      setModuleName(moduleName); // Update de context in plaats van localStorage
    }
  };

  const handleSendMessage = async () => {
    if (!threadId) return;

    messages.push(createNewMessage(input, true));
    setMessages([...messages]);
    setInput("");

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: input,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    let response = await openai.beta.threads.runs.retrieve(threadId, run.id);

    while (response.status === "in_progress" || response.status === "queued") {
      console.log("waiting...");
      setIsWaiting(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      response = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    setIsWaiting(false);

    const messageList = await openai.beta.threads.messages.list(threadId);

    const lastMessage = messageList.data
      .filter((message) => message.run_id === run.id && message.role === "assistant")
      .pop();

    if (lastMessage) {
      const responseText = lastMessage.content[0]["text"].value;
      console.log(responseText);
      extractAndStoreModuleName(responseText);
      setMessages([...messages, createNewMessage(responseText, false)]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container className="ChatContainer">
      <Grid container direction="column" spacing={2} paddingBottom={2}>
        {messages.map((message, index) => (
          <Grid item alignSelf={message.isUser ? "flex-end" : "flex-start"} key={index}>
            <Message key={index} message={message} />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" paddingBottom={5} justifyContent={"space-between"}>
        <Grid item sm={11} xs={9}>
          <TextField
            label="Type your message"
            variant="outlined"
            disabled={isWaiting}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isWaiting && <LinearProgress color="inherit" />}
        </Grid>
        <Grid item sm={1} xs={3}>
          <Button variant="contained" size="small" color="primary" onClick={handleSendMessage} disabled={isWaiting}>
            {isWaiting && <CircularProgress color="inherit" />}
            {!isWaiting && <SendIcon fontSize="large" />}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;