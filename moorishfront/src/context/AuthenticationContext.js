import React from "react";

const isAuthenticated = React.createContext(["false", () => {}]);
export default isAuthenticated;