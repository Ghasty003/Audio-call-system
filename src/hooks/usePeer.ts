import { Peer } from "peerjs";


function usePeer() {

    const peer = new Peer({
        host: "0.peerjs.com",
        path: "/",
        pingInterval: 5000,
        port: 443
    })

    return peer;
}

export default usePeer;