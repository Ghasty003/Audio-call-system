import { FaMicrophone } from 'react-icons/fa';
import { MdOutlineCallEnd } from 'react-icons/md';
import avatar from "../assets/call-avatar.png";

function CallScreen() {

    const handleMute = () => {

    }

    return (
        <div className="flex items-center justify-center flex-col">
            <img src={avatar} alt="avatar"
                className="w-[400px] h-[400px]"
            />

            <div className="flex flex-col items-center gap-2">
                <h2 className="text-5xl">Ghasty</h2>
                <p>00:00</p>
            </div>

            <div className="flex items-center gap-10 mt-4">
                <div onClick={handleMute} className="flex flex-col bg-[#648df9] rounded-full p-3 items-center cursor-pointer">
                    <FaMicrophone size={24} />
                </div>

                <div className="flex flex-col bg-red-500 rounded-full p-3 items-center cursor-pointer">
                    <MdOutlineCallEnd size={24} />
                </div>
            </div>
        </div>
    );
}

export default CallScreen;