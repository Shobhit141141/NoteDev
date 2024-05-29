import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import MonacoEditor from "./CodeEditor";

export default function ResizableDemo() {
  return (
    <div className="w-[80vw] h-[85vh] flex justify-center m-auto">
      {/* <ResizablePanelGroup
        direction="vertical"
        className="w-[500px] border border-gray-300 rounded-lg shadow-lg"
      >
        <ResizablePanel defaultSize={25} className="flex flex-col">
          <div className="flex items-center justify-center h-full p-6 bg-red-500">
            <span className="font-semibold text-white">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-gray-400 h-2 cursor-row-resize" />
        <ResizablePanel defaultSize={75} className="flex flex-col">
          <div className="flex items-center justify-center h-full p-6 bg-yellow-400 min-h-[200px]">
            <span className="font-semibold text-gray-800">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup> */}
      <ResizablePanelGroup
        direction="horizontal"
        className="w-[80vw] rounded-lg border"
      >
         <ResizableHandle />
        <ResizablePanel defaultSize={100}>
          <div className="flex h-[100%] items-center justify-center p-6 bg-yellow-300">
            <div className="min-w-[40%] h-[100%]">
              {/* <AceEditorComponent /> */}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        {/* <ResizableHandle />
        <ResizablePanel defaultSize={100}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6 bg-appbg">
               
                  <ImagePreview/>
              
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6 bg-green-400">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel> */}
      </ResizablePanelGroup>
    </div>
  );
}
