import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Send from "../../images/icons/Send.png"
import Instructions from "../../images/icons/Integration instructions.svg"
import { askChatBot, reportIncorrectResponse } from "../../apis/chat/chat";
import ReactMarkdown from "react-markdown";

const prompts = [
    "What is Zine?",
    "What is the recruitment process for zine?",
    "What is Raman",
    "Current projects at Zine"
    // "What is the recruitment process?"
]

interface ChatItem {
    message: string;
    author: "USER" | "BOT";
}

const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
// const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
function RenderMessageWithLinks({ message }: {message: string}) {
    return (
      <div className="whitespace-pre-wrap break-words">
        {message.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line.split(/\s+/g).map((word, wordIndex) =>
              word.match(URL_REGEX) ? (
                <a
                  key={wordIndex}
                  href={word.replace(/.$/, "")}
                  className="underline"
                  style={{color: "#aed8f2"}}
                  target="_blank"
                >
                  {word}{" "}
                </a>
              ) : (
                <React.Fragment key={wordIndex}>{word} </React.Fragment>
              )
            )}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }

const Chat = () => {
    const [prompt, setPrompt] = useState("")
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(prompts)
    const [loading, setLoading] = useState(false)
    const [reported, setReported] = useState(false)
    const [dots, setDots] = useState('.');
    const [chat, setChat] = useState<ChatItem[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    if (typeof window == "undefined") return <></>

    useEffect(() => {
        if (lastMessageRef.current) {
            // console.log('scrolling', containerRef.current.scrollTop, containerRef.current.scrollHeight)
            // containerRef.current!.scrollTop = containerRef.current!.scrollHeight
            lastMessageRef.current!.scrollIntoView()
            // console.log('scrolling done', containerRef.current!.scrollTop, containerRef.current!.scrollHeight)
        }
      }, [chat]);

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") return sendMessage()
    }

    const incorrectReponse = (responseid: number) => {
        if (reported) return
        setReported(true)
        reportIncorrectResponse(chat[responseid-1].message, chat[responseid].message, true)
    }

    const sendMessage = async (suggestedPrompt="") => {
        setPrompt("")
        if (!prompt && !suggestedPrompt) return
        if (loading) return
        setReported(false)
        const message = prompt || suggestedPrompt;

        const userMessage = { message: message, author: "USER" } as ChatItem
        setChat(prev => [...prev, userMessage])
        setLoading(true)
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots === '...' ? '.' : prevDots + '.'));
          }, 500);
        let sessionid = localStorage.getItem('chatsession')
        if (!sessionid) {
            sessionid = Math.random().toString(16).slice(2)
            localStorage.setItem('chatsession', sessionid)
        }

        const { answer, suggestions } = await askChatBot({prompt: message, session: sessionid})
        setSuggestedPrompts(suggestions)
        const chatMessage = { message: answer, author: "BOT" } as ChatItem
        setLoading(false)
        clearInterval(interval)
        setChat(prev => [...prev, chatMessage])

        if (!suggestedPrompts.includes(message)) await reportIncorrectResponse(message, answer, false)
    }

    return (
        <div className="md:container mx-auto font-poppins">
            <div className="flex flex-col mx-2 lg:mx-32" style={{ height: window.innerWidth > 768 ? "calc(100vh - 6rem)" : "calc(100vh - 9rem)" }}>
                <div className="flex-1 text-center overflow-y-auto overflow-x-hidden">
                { chat.length === 0 &&  <div>
                        <h2 className="text-2xl md:text-4xl font-extrabold mt-8 md:mt-8" style={{ color: "#0C72B0F2" }}>ZINE AI (BETA)</h2>
                        <div className="mt-4 md:mt-8">
                            <Image src={Instructions} />
                        </div>
                        <h5 className="text-lg md:text-xl -mt-2" style={{color: "#5A62684D"}}>Instructions</h5>
                        <div className="mt-2 md:mt-4 flex flex-col text-left gap-2 lg:w-3/4 text-sm md:text-normal mx-auto" style={{ color: "#8D989F" }}>
                            <div className="py-2 px-8 rounded-xl" style={{ background: "#D9D9D91A" }}>
                                <p>Feel free to ask questions about ZINE and RAMAN</p>
                            </div>
                            <div className="py-2 px-8 rounded-xl" style={{ background: "#D9D9D91A" }}>
                                <p>Refrain from using foul language, your questions will be used for fine tuning the model to provide better results</p>
                            </div>
                            <div className="py-2 px-8 rounded-xl" style={{ background: "#D9D9D91A" }}>
                                <p>Use clear and concise language to help the chatbot understand your query more accurately and provide a relevant response.</p>
                            </div>
                            <div className="py-2 px-8 rounded-xl" style={{ background: "#D9D9D91A" }}>
                                <p>The AI might generate wrong responses, flag the response for further development</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    chat && <div className="flex flex-col gap-2 mt-2 text-left text-sm md:text-normal" ref={containerRef} style={{ color: "#FFFFFF"}}>
                        {
                            chat.map((c, id) => {
                                return c.author === "USER" ? (
                                <div key={c.message} className="py-2 px-4 rounded-2xl rounded-br-none max-w-md md:max-w-4xl w-fit ml-auto" style={{ background: "#5ab4ec" }}>
                                    {c.message}
                                </div>
                                ) :
                                (
                                <div key={c.message}>
                                    <div className="py-2 px-4 rounded-2xl rounded-bl-none max-w-md flex relative md:max-w-4xl" style={{ background: "#0C72B0F2", width: "fit-content" }}>
                                        <div className="flex flex-col gap-4">
                                            <ReactMarkdown>{c.message}</ReactMarkdown>
                                        </div>
                                        {
                                        id === chat.length - 1 &&
                                        <button className="group ml-2 mt-1 mb-auto relative" onClick={() => incorrectReponse(id)}>
                                            {/* <span className="relative"> */}
                                                {/* <svg fill="#FEFEFE" xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 448 512">
                                                    <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/>
                                                </svg> */}
                                                <svg fill="#EEEEEE" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                                                <span className="opacity-0 group-hover:opacity-80 absolute bg-black transition-opacity duration-300 text-white text-xs -top-5 inline whitespace-nowrap left-1/2 text-center z-30 px-2 py-1 rounded-lg" style={{ width: "fit-content", transform: "translateX(-50%)"}}>
                                                    {reported ? "Reported!" : "Report incorrect response"}
                                                </span>
                                            {/* </span> */}
                                            {/* <div className="hidden group-hover:block absolute bg-black text-white -top-5 -right-18 z-30 px-2 rounded-lg">Report incorrect response</div> */}
                                        </button>
                                        }

                                    </div>
                                    {/* {
                                        id === chat.length - 1 && !reported &&
                                        <p className="text-sm text-blue-500 underline cursor-pointer ml-4" onClick={() => incorrectReponse(id)}>Report as incorrect response</p>
                                    } */}
                                </div>
                                )
                            })
                        }
                        {
                            loading && <div className="py-2 px-4 rounded-2xl rounded-bl-none mr-auto max-w-sm md:max-w-xl w-fit" style={{ background: "#0C72B0F2" }}>
                                {dots}
                            </div>
                        }
                        <div ref={lastMessageRef}></div>
                    </div>
                }
                </div>
                <div className="flex text-sm font-medium mt-4 gap-1 md:gap-2 overflow-x-auto" style={{ color: "#0C72B0F2" }}>
                    {
                        suggestedPrompts.map(p => (
                            <div key={p} className="rounded-3xl py-2 px-3 cursor-pointer whitespace-nowrap hover:opacity-75" onClick={() => {sendMessage(p)}} style={{ background: "#C2FFF48A", borderColor: "#0C72B0", borderWidth: 1.5 }}>{p}</div>
                        ))
                    }
                </div>
                <div className="flex rounded-xl overflow-hidden border-2 -mb-4 md:mb-2 mt-2" style={{ borderColor: "#AAA"}} >
                    <input ref={inputRef} className="py-2 px-4 w-full outline-none" placeholder="Ask Zine AI beta your questions" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}} onKeyDown={handleEnter}/>
                    <div className="pt-1 px-2 ml-1 mr-2 mt-1 cursor-pointer" onClick={() => sendMessage()}>
                        <Image src={Send} height={30} width={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat