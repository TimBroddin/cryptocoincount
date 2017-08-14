import createHistory from "history/createBrowserHistory";
const history = (typeof window !== "undefined") ? createHistory() : {};
export default history;
