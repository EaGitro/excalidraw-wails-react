import {  exportToBlob, exportToSvg, serializeAsJSON } from "@excalidraw/excalidraw";
import { SaveBase64File, SaveFileDialogWrapper, SaveTextFile } from "../../wailsjs/go/main/App"
import { main } from "../../wailsjs/go/models";
import toast from "react-hot-toast";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/dist/types/excalidraw/types";
import { blobToBase64, getDateString } from "./utils";

export async function saveFileDialog(exportType: "json" | "png" | "svg", excalidrawAPI: ExcalidrawImperativeAPI) {
    let saveopt = new main.SaveDialogOptiosWrapper;
    saveopt.FileType = exportType
    saveopt.Title = `save ${exportType} file`
    saveopt.DefaultFilename = `${getDateString()}.${exportType == "json" ? "excalidraw" : exportType}`

    let filepath = await SaveFileDialogWrapper(saveopt);

    console.log({ filepath })
    if (filepath === "") {
        toast.error("Failed to find path");
        return
    }
    const elements = excalidrawAPI.getSceneElements()
    const appState = excalidrawAPI.getAppState()
    const files = excalidrawAPI.getFiles()

    switch (exportType) {
        case "json": 
            const serializedJson = serializeAsJSON(elements, appState, files, "local");
            filepath = await SaveTextFile(filepath, serializedJson);
            break;
        
        case "png":
            const blob: Blob = await exportToBlob({elements, appState, files, mimeTypes:"image/png"})
            const base64 = await blobToBase64(blob)
            filepath = await SaveBase64File(filepath, base64)
            break
        case "svg":
            const svg: SVGSVGElement = await exportToSvg({elements, appState, files})
            filepath = await SaveTextFile(filepath, svg.outerHTML);
            break
    }




    if (filepath === "") {
        toast.error("Failed to save")
    }
    toast.success(`"${filepath.split("/").pop()}" saved successfully (${filepath})`)

}

