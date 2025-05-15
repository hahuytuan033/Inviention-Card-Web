import { Move, Type, Square, Circle, Image as ImageIcon, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import type { Tool } from '../types';

interface ToolbarProps {
  selectedTool: Tool;
  onToolSelect: (tool: Tool) => void;
  onAddText: () => void;
  onAddShape: (shape: 'rectangle' | 'circle') => void;
  onImageUploadClick: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleLayers: () => void;
  onExport: () => void;
}

export default function Toolbar({
  selectedTool,
  onToolSelect,
  onAddText,
  onAddShape,
  onImageUploadClick,
  onZoomIn,
  onZoomOut,
  onToggleLayers,
}: ToolbarProps) {
  return (
    <div className="bg-white w-16 border-r flex flex-col items-center py-4">
      <button
        className={`p-2 rounded-full mb-4 ${selectedTool === 'move' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
        onClick={() => onToolSelect('move')}
        title="Chọn & Di chuyển"
      >
        <Move size={24} />
      </button>
      <button
        className={`p-2 rounded-full mb-4 ${selectedTool === 'text' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onToolSelect('text');
          onAddText();
        }}
        title="Thêm Văn bản"
      >
        <Type size={24} />
      </button>
      <button
        className={`p-2 rounded-full mb-4 ${selectedTool === 'rectangle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onToolSelect('rectangle');
          onAddShape('rectangle');
        }}
        title="Thêm Hình chữ nhật"
      >
        <Square size={24} />
      </button>
      <button
        className={`p-2 rounded-full mb-4 ${selectedTool === 'circle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onToolSelect('circle');
          onAddShape('circle');
        }}
        title="Thêm Hình tròn"
      >
        <Circle size={24} />
      </button>
      <button
        className={`p-2 rounded-full mb-4 ${selectedTool === 'image' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
        onClick={() => {
          onToolSelect('image');
          onImageUploadClick();
        }}
        title="Tải lên Hình ảnh"
      >
        <ImageIcon size={24} />
      </button>
      <div className="mt-auto">
        <button
          className="p-2 rounded-full mb-4 hover:bg-gray-100"
          onClick={onZoomIn}
          title="Phóng to"
        >
          <ZoomIn size={24} />
        </button>
        <button
          className="p-2 rounded-full mb-4 hover:bg-gray-100"
          onClick={onZoomOut}
          title="Thu nhỏ"
        >
          <ZoomOut size={24} />
        </button>
        <button
          className="p-2 rounded-full mb-4 hover:bg-gray-100"
          onClick={onToggleLayers}
          title="Bật/Tắt Bảng Lớp"
        >
          <Layers size={24} />
        </button>
      </div>
    </div>
  );
}