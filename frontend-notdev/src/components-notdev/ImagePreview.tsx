import React from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";

const ImagePreview: React.FC = () => {
  const onDownload = (src: string) => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <div className="w-[100vw] h-[70vh] m-auto flex justify-center items-center">
      <div className="w-[80vw] h-[60vh] flex justify-center items-center overflow-hidden"> {/* Tailwind classes for the container */}
        <Image
          className="w-full h-full object-cover" // Tailwind classes for the Image component
          src={
            "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
          }
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => (
              <Space size={16} className="toolbar-wrapper">
                <DownloadOutlined
                  onClick={() =>
                    onDownload(
                      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                    )
                  }
                />
                <SwapOutlined rotate={90} onClick={onFlipY} />
                <SwapOutlined onClick={onFlipX} />
                <RotateLeftOutlined onClick={onRotateLeft} />
                <RotateRightOutlined onClick={onRotateRight} />
                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
              </Space>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
