import { Type, Square, Circle, Image as ImageIcon } from 'lucide-react';
import type { Element } from '../types';

interface LayersPanelProps {
  elements: Element[];
  selectedElement: Element | null;
  onElementSelect: (element: Element, e: React.MouseEvent) => void;
  onClose: () => void;
}

export default function LayersPanel({
  elements,
  selectedElement,
  onElementSelect,
  onClose,
}: LayersPanelProps) {
  return (
    <div className="absolute right-64 bottom-0 bg-white border shadow-lg w-64 max-h-64 overflow-y-auto">
      <div className="p-2 bg-gray-100 border-b font-medium flex justify-between items-center">
        <span>Lớp</span>
        <button className="p-1 hover:bg-gray-200 rounded" onClick={onClose}>
          ✕
        </button>
      </div>
      <div>
        {[...elements].sort((a, b) => b.zIndex - a.zIndex).map(element => (
          <div
            key={element.id}
            className={`p-2 border-b flex items-center cursor-pointer hover:bg-blue-50 ${
              selectedElement && selectedElement.id === element.id ? 'bg-blue-100' : ''
            }`}
            onClick={(e) => onElementSelect(element, e)}
          >
            {element.type === 'text' && <Type size={16} className="mr-2" />}
            {element.type === 'rectangle' && <Square size={16} className="mr-2" />}
            {element.type === 'circle' && <Circle size={16} className="mr-2" />}
            {element.type === 'image' && <ImageIcon size={16} className="mr-2" />}
            <span className="text-sm truncate">
              {element.type === 'text'
                ? element.content?.substring(0, 15) + (element.content && element.content.length > 15 ? '...' : '')
                : `${element.type} ${element.id}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}