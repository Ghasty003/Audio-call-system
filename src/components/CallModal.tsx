import { useEffect, useState, useRef } from "react";
import { MdWifiCalling2, MdCall, MdOutlineCallEnd } from 'react-icons/md';
import { AiOutlineCopy } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { MediaConnection } from "peerjs";

import usePeer from '../hooks/usePeer';

function CallModal() {

    const [myId, setMyId] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [call, setCall] = useState<MediaConnection>(null!);
    const [stream, setStream] = useState<MediaStream>(null!);

    const userAudio = useRef<HTMLAudioElement>(null!);

    const peer = usePeer();

    useEffect(() => {
        peer.on("open", id => {
            console.log(id);
            setMyId(id);
        });

        peer.on("connection", (conn) => {
            console.log("Connected")
            conn.on("data", data => {
                setMessage(data as string);
            })
        });

        peer.on("call", call => {
            setCall(call);
        });

        ( async () => {
            const mStream = await navigator.mediaDevices.getUserMedia({
                video: false, 
                audio: true
            });

            setStream(mStream)
        })();
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(myId);
        toast("Copied!", {
            position: "top-left",
            autoClose: 2000
        });
    }

    const handleCall = () => {
        if (!userId) return;
        
        const conn = peer.connect(userId);
        conn.on("open", () => {
            conn.send(`${name} is calling...`);
        });

        const call = peer.call(userId, stream);

        call.on("stream", userStream => {
            userAudio.current.srcObject = userStream;
            userAudio.current.addEventListener("loadedmetadata", () => {
                userAudio.current.play();
            })
        });
    }

    const handleAccept = () => {
        call.answer(stream);

        call.on("stream", myStream => {
            userAudio.current.srcObject = myStream;
            userAudio.current.onloadeddata = () => {
                userAudio.current.play();
            }
        })
    }

    const handleDecline = () => {
        setMessage("");
    }

    return (
        <div className="bg-[#cecece] flex items-center flex-col pt-6 w-[400px] h-[500px] mt-10 relative left-1/2 -translate-x-1/2 rounded">
            
            <div className="bg-primary rounded-tl-md rounded-tr-md shadow-lg px-2 py-1 w-36">
                <p className="font-bold">Name</p>
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="bg-transparent w-full outline-none" />
            </div>

            <ToastContainer
                position="top-left"
                autoClose={2000}
             />

            <button onClick={handleCopy} className="flex items-center gap-2 mt-10 bg-primary px-3 py-2 rounded-md drop-shadow-2xl">
                <AiOutlineCopy />
                Copy ID
            </button>

            <div className="bg-primary rounded-tl-md rounded-tr-md shadow-lg px-2 py-1 w-36 mt-10">
                <p className="font-bold">ID to call</p>
                <input value={userId} onChange={e => setUserId(e.target.value)} type="text" className="bg-transparent w-full outline-none" />
            </div>


            <audio hidden ref={userAudio}></audio>

            <button onClick={handleCall} className='mt-10'>
                <MdWifiCalling2 color="#4776e6" size={30} />
            </button>

            {
                message && (
                    <div className="mt-4">

                        <p className="text-primary text-center mb-2 font-semibold">{message}</p>

                        <div className="flex items-center gap-4">
                            <div onClick={handleAccept} className="flex flex-col bg-primary rounded-2xl py-2 w-20 items-center cursor-pointer">
                                <MdCall />
                                <p>Accept</p>
                            </div>

                            <div onClick={handleDecline} className="flex flex-col bg-red-500 rounded-2xl py-2 w-20 items-center cursor-pointer">
                                <MdOutlineCallEnd />
                                <p>Decline</p>
                            </div>
                        </div>
                     </div>
                )
            }

        </div>
    );
}

export default CallModal;