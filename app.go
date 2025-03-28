package main

import (
	"context"
	"encoding/base64"
	"errors"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// // Greet returns a greeting for the given name
// func (a *App) Greet(name string) string {
// 	return fmt.Sprintf("Hello %s, It's show time!", name)
// }

type SaveDialogOptiosWrapper struct {
	DialogTitle     string `json:"Title"`
	FileType        string `json:"FileType"`
	DefaultFilename string `json:"DefaultFilename"`
}

func (a *App) SaveFileDialogWrapper(saveDialogOptionsWapper SaveDialogOptiosWrapper) string {
	var saveopt runtime.SaveDialogOptions

	saveopt.DefaultFilename = saveDialogOptionsWapper.DefaultFilename
	saveopt.Title = saveDialogOptionsWapper.DialogTitle
	saveopt.ShowHiddenFiles = true
	createFileFilter := func(filetype string) (runtime.FileFilter, error) {
		var dispname string
		var pattern string
		switch filetype {
		case "json":
			dispname = "Excalidraw - JSON (*.excalidraw)"
			pattern = "*.excalidraw"
		case "svg", "png":
			dispname = "Images(*." + filetype + ")"
			pattern = "*." + filetype
		default:
			return runtime.FileFilter{DisplayName: "", Pattern: ""}, errors.New("Invalid file type")
		}
		return runtime.FileFilter{DisplayName: dispname, Pattern: pattern}, nil
	}
	filefilterstruct, err := createFileFilter(saveDialogOptionsWapper.FileType)
	if err != nil {
		return ""
	}
	saveopt.Filters = []runtime.FileFilter{filefilterstruct}

	filename, err := runtime.SaveFileDialog(a.ctx, saveopt)
	if err != nil {
		return ""
	} else {
		return filename
	}
}

func (*App) SaveTextFile(filepath string, filedata string) string {
	bytedata := []byte(filedata)
	err := os.WriteFile(filepath, bytedata, 0644)
	if err != nil {
		return ""
	}
	return filepath
}

func (*App) SaveBase64File(filepath string, filedata string) string {
	var err error
	bytedata, err := base64.StdEncoding.DecodeString(filedata)
	if err != nil {
		return ""
	}
	err = os.WriteFile(filepath, bytedata, 0644)
	if err != nil {
		return ""
	}
	return filepath

}
