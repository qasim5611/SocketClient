import io from "socket.io-client";

import ApiUrl from "./../redux/url";

let socket;
export default socket = io(ApiUrl);
