import { configureStore } from "@reduxjs/toolkit";

import Interface from "./slice/Interface";

export default configureStore({
    reducer: {
        interface: Interface
    }
});