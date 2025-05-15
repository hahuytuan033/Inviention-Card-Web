import { useState, useRef } from 'react';
import type { RefObject } from 'react';
import { Download } from 'lucide-react';
import Toolbar from './Components/Toolbar';
import PropertiesPanel from './Components/PropertiesPanel';
import LayersPanel from './Components/LayersPanel';
import Canvas from './Components/Canvas';
import type { Element } from './types';
import type { Tool } from './types';
import { addTextElement, addShapeElement, exportCanvas } from './utils/canvasUtils';
import { useDrag } from './hooks/useDrag';

export default function CanvaClone() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [nextId, setNextId] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showLayers, setShowLayers] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateElement = (id: number, updates: Partial<Element>) => {
    setElements(elements.map(el => (el.id === id ? { ...el, ...updates } : el)));
  };

  const { handleMouseDown } = useDrag(selectedElement, updateElement, zoom);

  const handleAddText = () => {
    const newElement = addTextElement(nextId, elements);
    setElements([...elements, newElement]);
    setNextId(nextId + 1);
    setSelectedElement(newElement);
    setSelectedTool(null);
  };

  const handleAddShape = (shape: 'rectangle' | 'circle') => {
    const newElement = addShapeElement(nextId, elements, shape);
    setElements([...elements, newElement]);
    setNextId(nextId + 1);
    setSelectedElement(newElement);
    setSelectedTool(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newElement: Element = {
          id: nextId,
          type: 'image',
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          rotation: 0,
          zIndex: elements.length,
          src: reader.result as string,
        };
        setElements([...elements, newElement]);
        setNextId(nextId + 1);
        setSelectedElement(newElement);
        setSelectedTool(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      setElements(elements.filter(el => el.id !== selectedElement.id));
      setSelectedElement(null);
    }
  };

  const moveLayer = (direction: 'up' | 'down') => {
    if (!selectedElement) return;
    const currentIndex = elements.findIndex(el => el.id === selectedElement.id);
    if (
      (direction === 'up' && currentIndex === elements.length - 1) ||
      (direction === 'down' && currentIndex === 0)
    ) {
      return;
    }
    const newElements = [...elements];
    const targetIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
    [newElements[currentIndex], newElements[targetIndex]] = [newElements[targetIndex], newElements[currentIndex]];
    newElements.forEach((el, index) => {
      el.zIndex = index;
    });
    setElements(newElements);
    setSelectedElement(newElements[targetIndex]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white border-b p-2 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Dev Nguyễn</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={() => exportCanvas(elements, canvasRef)}
        >
          <Download size={16} className="mr-1" />
          Xuất
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Toolbar
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onImageUploadClick={() => fileInputRef.current?.click()}
          onZoomIn={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          onZoomOut={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          onToggleLayers={() => setShowLayers(!showLayers)}
          onExport={() => exportCanvas(elements, canvasRef)}
        />
        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />

        <div className="flex-1 relative overflow-auto bg-gray-300 flex items-center justify-center">
          <Canvas
            elements={elements}
            selectedElement={selectedElement}
            zoom={zoom}
            onCanvasClick={() => setSelectedElement(null)}
            onMouseDown={handleMouseDown}
            updateElement={updateElement}
          />
        </div>

        <PropertiesPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
          deleteElement={deleteSelectedElement}
          moveLayer={moveLayer}
        />

        {showLayers && (
          <LayersPanel
            elements={elements}
            selectedElement={selectedElement}
            onElementSelect={(element, e) => {
              e.stopPropagation();
              setSelectedElement(element);
            }}
            onClose={() => setShowLayers(false)}
          />
        )}
      </div>

      <div className="bg-gray-100 border-t p-2 flex justify-between text-sm text-gray-600">
        <div>Thu phóng: {Math.round(zoom * 100)}%</div>
        <div>
          {selectedElement
            ? `Đã chọn: ${selectedElement.type} (${Math.round(selectedElement.x)}, ${Math.round(selectedElement.y)})`
            : 'Canvas: 800 × 600'}
        </div>
      </div>
    </div>
  );
}