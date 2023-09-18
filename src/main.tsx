import App from "./App"

// import tailwind styles
import "./App.css"

import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
// rome-ignore lint/style/noNonNullAssertion: <explanation>
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<App />)
