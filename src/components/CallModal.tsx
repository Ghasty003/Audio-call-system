import { MdWifiCalling2 } from 'react-icons/md';
import { AiOutlineCopy } from "react-icons/ai";

function CallModal() {
    return (
        <div className="bg-[#cecece] flex items-center flex-col pt-6 w-[300px] h-[400px] mt-10 relative left-1/2 -translate-x-1/2 rounded">
            
            <div className="bg-primary rounded-tl-md rounded-tr-md shadow-lg px-2 py-1 w-36">
                <p className="font-bold">Name</p>
                <input type="text" className="bg-transparent w-full outline-none" />
            </div>

            <button className="flex items-center gap-2 mt-10 bg-primary px-3 py-2 rounded-md drop-shadow-2xl">
                <AiOutlineCopy />
                Copy ID
            </button>

            <div className="bg-primary rounded-tl-md rounded-tr-md shadow-lg px-2 py-1 w-36 mt-10">
                <p className="font-bold">ID to call</p>
                <input type="text" className="bg-transparent w-full outline-none" />
            </div>

            <button className='mt-10'>
                <MdWifiCalling2 color="#4776e6" size={30} />
            </button>
        </div>
    );
}

export default CallModal;