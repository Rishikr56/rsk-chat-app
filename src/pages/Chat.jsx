import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";
import ThemeToggle from "../context/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [activeContact, setActiveContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const socketRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // socketRef.current = io("https://rsk-chat-backend.onrender.com/", {
    //   auth: { token: localStorage.getItem("token") },
    // });
    // socket.on("connect", () => {
    //   console.log("Socket connected:", socket.id);
    // });
    // socket.emit("message", "Hello server");
    // socket.on("welcome", (data) => console.log(data));
  }, []);

  async function sendMessage() {
    if (!msg.trim()) return;
    console.log(msg);
    setMsg("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendMessage();
  }

  async function searchMobile(searchPhone) {
    const phoneRes = await axiosInstance.post(
      "/auth/search-mobile-no",
      searchPhone,
    );
    console.log("response from server", phoneRes);
  }

  async function getRelatedContact() {
    const contactsRes = await axiosInstance.get(
      "/auth/get-all-related-contact",
    );
    console.log(contactsRes);
  }

  const isValidPhone = (val) => /^[6-9]\d{9}$/.test(val.replace(/\s/g, ""));

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchPhone.toLowerCase()) ||
      c.phone.includes(searchPhone),
  );

  const activeContactData = contacts[activeContact];

  return (
    <div className="flex h-screen bg-amber-50 dark:bg-gray-950 transition-colors duration-200">
      {/* ── Sidebar ── */}
      <div className="w-80 bg-white dark:bg-gray-900 border-r border-amber-100 dark:border-gray-800 flex flex-col flex-shrink-0 transition-colors duration-200">
        {/* Sidebar Header */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-amber-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.163 2 11.322c0 2.773 1.228 5.261 3.178 6.98L4 22l4.239-1.66A10.94 10.94 0 0 0 12 20.644c5.523 0 10-4.163 10-9.322S17.523 2 12 2Z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
              RSK-CHAT
            </span>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-3 border-b border-amber-100 dark:border-gray-800">
          <div className="flex items-center bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-xl px-3 py-2 gap-2 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 dark:focus-within:ring-violet-900/40 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMobile(searchPhone);
              }}
              type="number"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Search name or number..."
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Add Contact Result */}
          {isValidPhone(searchPhone) &&
            !contacts.find((c) => c.phone === searchPhone) && (
              <div className="mt-2 flex items-center gap-3 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-xl px-3 py-2 cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/40 transition">
                <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    +91 {searchPhone}
                  </p>
                  <p className="text-xs text-violet-500 dark:text-violet-400">
                    Tap to start chat
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase px-4 py-2.5 tracking-wider font-medium">
            {searchPhone ? "Results" : "Recent"}
          </p>

          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                No contacts yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Search a number to start chatting
              </p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-amber-50 dark:border-gray-800 transition ${
                  activeContact === contacts.indexOf(contact)
                    ? "bg-violet-50 dark:bg-violet-950/40 border-l-2 border-l-violet-500"
                    : "hover:bg-amber-50 dark:hover:bg-gray-800"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full ${contact.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                >
                  {contact.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {contact.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                    {contact.last}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {contact.time}
                  </span>
                  {contact.unread > 0 && (
                    <span className="bg-violet-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings */}
        <div className="p-3 border-t border-amber-100 dark:border-gray-800">
          <button className="w-full flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-800 text-sm font-medium py-2 px-3 rounded-xl transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Settings
          </button>
        </div>
      </div>

      {/* ── Chat Area ── */}
      {activeContactData ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-white dark:bg-gray-900 border-b border-amber-100 dark:border-gray-800 px-5 py-3 flex items-center gap-3 transition-colors duration-200">
            <div
              className={`w-10 h-10 rounded-full ${activeContactData.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
            >
              {activeContactData.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {activeContactData.name}
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
                  />
                </svg>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 space-y-3 transition-colors duration-200"
            style={{
              background: theme === "dark" ? "#161320" : "#f3f0ff",
            }}
          >
            {/* Received */}
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-xs shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-800 dark:text-gray-100">
                  Hey bhai kya chal raha hai?
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1">
                  11:30 AM
                </p>
              </div>
            </div>

            {/* Sent */}
            <div className="flex justify-end">
              <div className="bg-violet-600 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-xs shadow-sm">
                <p className="text-sm text-white">Sab theek hai, tu bata!</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className="text-xs text-violet-200">11:31 AM</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-violet-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white dark:bg-gray-900 border-t border-amber-100 dark:border-gray-800 px-4 py-3 transition-colors duration-200">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-300 transition flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </button>
              <input
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                value={msg}
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-amber-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/40 transition"
              />
              <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-300 transition flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button>
              <button
                onClick={sendMessage}
                className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white rounded-xl w-10 h-10 flex items-center justify-center transition flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-950 transition-colors duration-200">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-950/40 rounded-2xl flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-violet-600 dark:text-violet-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.163 2 11.322c0 2.773 1.228 5.261 3.178 6.98L4 22l4.239-1.66A10.94 10.94 0 0 0 12 20.644c5.523 0 10-4.163 10-9.322S17.523 2 12 2Z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
            Welcome to RSK-CHAT
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Select a contact to start chatting
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
