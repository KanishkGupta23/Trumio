import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaComputer } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import ProfileCard from "./components/profileCard";
import ScrapeDataCard from "./components/scrapeDataCard";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [scrapedData, setscrapedData] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setInput(""); // Clear message input on new chat
    setProfileData(null);
    setscrapedData(null);
  };

  const hitRequest = async (e) => {
    // Prevent form from submitting the traditional way
    e.preventDefault();

    if (!input) {
      alert("You must write something...!");
      return;
    }

    setLoading(true);
    setResponse(""); // Reset response when new input is submitted

    try {
      let newMessages = [{ type: "userMsg", text: input }];

      // Check for specific commands
      if (input.toLowerCase().includes("fetch profile")) {
        const username = input.split("fetch profile of ")[1]?.trim();
        if (username) {
          const res = await axios.post(
            "http://127.0.0.1:8000/fetch_linkedin_profile",
            { username }
          );
          setProfileData(res.data);

          newMessages.push({
            type: "profileCardMsg",
            profileData: res.data,
          });
        } else {
          newMessages.push({
            type: "responseMsg",
            text: "Please provide a valid username.",
          });
        }
      } else if (input.toLowerCase().includes("scrape website")) {
        const url = input.split("scrape website ")[1]?.trim();
        if (url) {
          const res = await axios.post(
            "http://localhost:8000/scrape_website/",
            { url }
          );
          setscrapedData(res.data.dom_chunks.join("\n"));
          newMessages.push({
            type: "scrapedMsg",
            scrapedData: res.data.dom_chunks.join("\n"),
          });
        } else {
          newMessages.push({
            type: "responseMsg",
            text: "Please provide a valid website URL.",
          });
        }
      } else {
        // Fallback response
        newMessages.push({
          type: "responseMsg",
          text: "Sorry, this functionality isn't available right now.",
        });
      }

      // Update messages
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setIsResponseScreen(true);
      setInput(""); // Clear input after submission
    } catch (err) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "responseMsg", text: "Something Went Wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-screen min-h-screen overflow-x-hidden bg-[#142238] text-white">
      {isResponseScreen ? (
        <div className="middle h-[85vh]">
          <div className="header flex items-center py-[20px] justify-between w-[100vw] px-[300px]">
            <h2 className="text-2xl">Tech Trekkers</h2>
            <button
              id="chatBtn"
              className="newChat p-[10px] rounded-[10px] cursor-pointer text-white px-[10px]"
              onClick={newChat}
            >
              New Chat
            </button>
          </div>
          <div className="messages overflow-y-auto max-h-[70vh]">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.type === "userMsg" ? "flex-end" : "flex-start",
                }}
              >
                {msg.type === "userMsg" && (
                  <div className="userMsg">{msg.text}</div>
                )}
                {msg.type === "responseMsg" && (
                  <div className="responseMsg">{msg.text}</div>
                )}
                {msg.type === "profileCardMsg" && (
                  <div className="profileMsg">
                    <ProfileCard profileData={msg.profileData} />
                  </div>
                )}
                {msg.type === "scrapedMsg" && (
                  <div className="scrapedMsg">
                    <ScrapeDataCard scrapedData={msg.scrapedData} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <div className="middle h-[80vh] flex items-center flex-col justify-center ">
          <h1 className="text-5xl">Hey! Wanna scrap LinkedIn?</h1>
          <div className="boxes mt-10 flex items-center gap-2">
            <div
              className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-[#ffffff] relative min-h-[20vh] p-[10px] bg-[#abb8da]"
              onClick={() => setInput("fetch profile of williamhgates")}
            >
              <p className="text-[20px] text-black">
                Fetch profile of
                <br /> williamhgates
              </p>
              <i className="absolute right-3 bottom-3 text-[18px] text-black">
                <FaComputer />
              </i>
            </div>
            <div
              className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-[#ffffff] relative min-h-[20vh] p-[10px] bg-[#abb8da]"
              onClick={() => setInput("scrape website https://amazon.com")}
            >
              <p className="text-[20px] text-black">
                Scrape Website
                <br /> https://amazon.com
              </p>
              <i className="absolute right-3 bottom-3 text-[18px] text-black">
                <FaComputer />
              </i>
            </div>
            <div
              className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-[#ffffff] relative min-h-[20vh] p-[10px] bg-[#abb8da]"
              onClick={() => setInput("How is the weather today?")}
            >
              <p className="text-[20px] text-black">
                How is the <br /> weather today?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px] text-black">
                <FaComputer />
              </i>
            </div>
            <div
              className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-[#ffffff] relative min-h-[20vh] p-[10px] bg-[#abb8da]"
              onClick={() => setInput("Recite me a story")}
            >
              <p className="text-[20px] text-black">
                Recite me a <br /> story.
              </p>
              <i className="absolute right-3 bottom-3 text-[18px] text-black">
                <FaComputer />
              </i>
            </div>
          </div>
        </div>
      )}

      <div className="bottom w-[100%] flex flex-col items-center ">
        <form
          className="inputBox w-[60%] py-[5px] flex items-center bg-[#ffffff] rounded-[30px]"
          onSubmit={hitRequest}
        >
          <input
            onChange={handleInputChange}
            value={input}
            type="text"
            className="p-[10px] pl-[20px] bg-transparent flex-1 border-none outline-none text-black"
            placeholder="Write your message here..."
            id="messageBox"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                hitRequest(e);
              }
            }}
          />
          {input === "" ? null : (
            <i
              className="text-blue-600 mr-5 cursor-pointer text-[20px]"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </form>
        {loading && <p>Loading...</p>}
        <p className="mt-3">
          This chatbot is created by Tech Trekkers. This chatbot uses LinkedIn
          API.
        </p>
      </div>
    </div>
  );
}

export default App;
