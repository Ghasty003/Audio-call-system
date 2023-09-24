import { useState, useEffect, useRef } from "react";
import { FaMicrophone } from 'react-icons/fa';
import { MdOutlineCallEnd } from 'react-icons/md';
import { useSelector } from 'react-redux';

import avatar from "../assets/call-avatar.png";

function CallScreen({ show }: { show: boolean }) {

    const { nameToShow } = useSelector((state: any) => state.interface);
    
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const intervalRef = useRef<any>();

    const handleEndCall = () => {
        window.location.reload();
    }

    const handleMute = () => {

    }

    useEffect(() => {

        if (!show) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 59) {
                    setMinutes(prevMinutes => prevMinutes + 1);
                    return 0;
                } else {
                    return prevSeconds + 1;
                }
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [show]);

    return (
        <div className={`${show ? "flex" : "hidden"} items-center justify-center flex-col`}>
            <img src={avatar} alt="avatar"
                className="w-[400px] h-[400px]"
            />

            <div className="flex flex-col items-center gap-2">
                <h2 className="text-5xl"> {
                    nameToShow !== "" ? nameToShow : "User"
                } </h2>
                <p>{minutes !== 0 ? ((minutes - 1).toString().padStart(2, '0')) : minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
            </div>

            <div className="flex items-center gap-10 mt-20">
                <div onClick={handleMute} className="flex flex-col bg-[#648df9] rounded-full p-3 items-center cursor-pointer">
                    <FaMicrophone size={24} />
                </div>

                <div onClick={handleEndCall} className="flex flex-col bg-red-500 rounded-full p-3 items-center cursor-pointer">
                    <MdOutlineCallEnd size={24} />
                </div>
            </div>
        </div>
    );
}

export default CallScreen;