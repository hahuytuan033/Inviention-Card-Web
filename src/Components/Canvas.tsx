import type { Element } from '../types';

interface CanvasProps {
  elements: Element[];
  selectedElement: Element | null;
  zoom: number;
  onCanvasClick: () => void;
  onMouseDown: (element: Element, e: React.MouseEvent) => void;
  updateElement: (id: number, updates: Partial<Element>) => void;
}

export default function Canvas({
  elements,
  selectedElement,
  zoom,
  onCanvasClick,
  onMouseDown,
  updateElement,
}: CanvasProps) {
  const renderElement = (element: Element) => {
    const isSelected = selectedElement && selectedElement.id === element.id;
    const elementStyle = {
      position: 'absolute' as const,
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `rotate(${element.rotation}deg)`,
      zIndex: element.zIndex,
      border: isSelected ? '2px dashed #2196f3' : 'none',
      cursor: 'move',
      userSelect: 'none' as const,
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onMouseDown={(e) => onMouseDown(element, e)}
          >
            {isSelected ? (
              <textarea
                value={element.content}
                onChange={(e) => updateElement(element.id, { content: e.target.value })}
                style={{
                  width: '100%',
                  height: '100%',
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div
                style={{
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                {element.content}
              </div>
            )}
          </div>
        );
      case 'rectangle':
        return (
          <div
            key={element.id}
            style={{
              ...elementStyle,
              backgroundColor: element.color,
            }}
            onMouseDown={(e) => onMouseDown(element, e)}
          />
        );
      case 'circle':
        return (
          <div
            key={element.id}
            style={{
              ...elementStyle,
              backgroundColor: element.color,
              borderRadius: '50%',
            }}
            onMouseDown={(e) => onMouseDown(element, e)}
          />
        );
      case 'image':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onMouseDown={(e) => onMouseDown(element, e)}
          >
            <img
              src={element.src}
              alt="Nội dung đã tải lên"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white shadow-lg"
      style={{
        width: '800px',
        height: '600px',
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={onCanvasClick}
    >
      {elements.map(renderElement)}
    </div>
  );
}