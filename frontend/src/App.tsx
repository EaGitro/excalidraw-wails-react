
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/dist/types/excalidraw/types";
import { useState } from "react";
import { saveFileDialog } from "./utils/fileDialog";
import { Toaster } from "react-hot-toast";
import SvgJsonFile from "./components/icons/json-file";
import SvgSvg from "./components/icons/svg";
import SvgPng from "./components/icons/png";

// import {ReactComponent as  JsonIcon } from "./assets/images/icons/json-file.svg"



function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  return (
    <>
      <Toaster />
      <div style={{ height: "97vh" }}>
        <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} >
          <MainMenu>
            {/* <MainMenu.Group title="Save as ..."> */}
            <MainMenu.Item onSelect={async () => { saveFileDialog("json", excalidrawAPI as ExcalidrawImperativeAPI) }}
              icon={<SvgJsonFile></SvgJsonFile>}
            >
              Save as Excalidraw JSON file
            </MainMenu.Item>
            <MainMenu.Item onSelect={async () => { saveFileDialog("png", excalidrawAPI as ExcalidrawImperativeAPI) }}
              icon={<SvgSvg></SvgSvg>}
            >
              Save as png file
            </MainMenu.Item>
            <MainMenu.Item onSelect={async () => { saveFileDialog("svg", excalidrawAPI as ExcalidrawImperativeAPI) }}
              icon={<SvgPng></SvgPng>}
            >
              Save as svg file
            </MainMenu.Item>
            {/* </MainMenu.Group> */}
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.CommandPalette />
            <MainMenu.DefaultItems.SearchMenu />
            <MainMenu.DefaultItems.Help />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.ToggleTheme />
          </MainMenu>
        </Excalidraw>
      </div>
    </>
  );
}

export default App
