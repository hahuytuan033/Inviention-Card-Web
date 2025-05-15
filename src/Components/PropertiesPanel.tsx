import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import type { Element } from '../types';

interface PropertiesPanelProps {
  selectedElement: Element | null;
  updateElement: (id: number, updates: Partial<Element>) => void;
  deleteElement: () => void;
  moveLayer: (direction: 'up' | 'down') => void;
}

export default function PropertiesPanel({
  selectedElement,
  updateElement,
  deleteElement,
  moveLayer,
}: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Chọn một phần tử để chỉnh sửa thuộc tính
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2">Thuộc tính Phần tử</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vị trí</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <span className="text-xs text-gray-500">X</span>
              <input
                type="number"
                value={Math.round(selectedElement.x)}
                onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Y</span>
              <input
                type="number"
                value={Math.round(selectedElement.y)}
                onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kích thước</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <span className="text-xs text-gray-500">Chiều rộng</span>
              <input
                type="number"
                value={Math.round(selectedElement.width)}
                onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500">Chiều cao</span>
              <input
                type="number"
                value={Math.round(selectedElement.height)}
                onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xoay</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="360"
              value={selectedElement.rotation || 0}
              onChange={(e) => updateElement(selectedElement.id, { rotation: Number(e.target.value) })}
              className="block w-full mt-1"
            />
            <span className="ml-2 text-sm">{selectedElement.rotation || 0}°</span>
          </div>
        </div>
        {selectedElement.type === 'text' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kích thước Phông chữ</label>
              <input
                type="number"
                value={selectedElement.fontSize}
                onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
              <input
                type="color"
                value={selectedElement.color}
                onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                className="block w-full mt-1 h-8"
              />
            </div>
          </>
        )}
        {(selectedElement.type === 'rectangle' || selectedElement.type === 'circle') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Màu nền</label>
            <input
              type="color"
              value={selectedElement.color}
              onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
              className="block w-full mt-1 h-8"
            />
          </div>
        )}
        {selectedElement.type === 'image' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Kích thước ảnh</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <span className="text-xs text-gray-500">Chiều rộng</span>
                <input
                  type="number"
                  value={Math.round(selectedElement.width)}
                  onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
                />
              </div>
              <div>
                <span className="text-xs text-gray-500">Chiều cao</span>
                <input
                  type="number"
                  value={Math.round(selectedElement.height)}
                  onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm text-sm"
                />
              </div>
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Lớp</label>
          <div className="flex mt-1 space-x-2">
            <button
              className="flex items-center justify-center p-2 border rounded hover:bg-gray-50"
              onClick={() => moveLayer('up')}
              title="Đưa lên trước"
            >
              <ChevronUp size={16} />
            </button>
            <button
              className="flex items-center justify-center p-2 border rounded hover:bg-gray-50"
              onClick={() => moveLayer('down')}
              title="Đưa ra sau"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <button
          className="w-full mt-4 flex items-center justify-center p-2 border border-red-200 text-red-600 rounded hover:bg-red-50"
          onClick={deleteElement}
        >
          <Trash2 size={16} className="mr-1" />
          Xóa Phần tử
        </button>
      </div>
    </div>
  );
}