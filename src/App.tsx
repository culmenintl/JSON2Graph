import Root from "./components/Root";
import logo from "./logo.svg";

function App() {
  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34]">
        {/* <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin"
          alt="logo"
        />
        <style>
          {
            "\
            .animate-speed{\
              animation-duration:20s;\
            }\
          "
          }
        </style> */}
        <Root />
      </header>
    </div>
  );
}

export default App;
