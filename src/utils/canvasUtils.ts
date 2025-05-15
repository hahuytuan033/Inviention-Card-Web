import type { Element } from '../types';

export const addTextElement = (nextId: number, elements: Element[]): Element => {
  return {
    id: nextId,
    type: 'text',
    content: 'Thêm văn bản của bạn tại đây',
    x: 100,
    y: 100,
    width: 200,
    height: 50,
    fontSize: 24,
    color: '#000000',
    rotation: 0,
    zIndex: elements.length,
  };
};

export const addShapeElement = (nextId: number, elements: Element[], shape: 'rectangle' | 'circle'): Element => {
  return {
    id: nextId,
    type: shape,
    x: 100,
    y: 100,
    width: 100,
    height: shape === 'circle' ? 100 : 80,
    color: '#1e88e5',
    rotation: 0,
    zIndex: elements.length,
  };
};

export const exportCanvas = (elements: Element[], canvasRef: React.RefObject<HTMLDivElement>) => {
  const exportCanvas = document.createElement('canvas');
  const context = exportCanvas.getContext('2d');
  const canvas = canvasRef.current;

  if (!canvas || !context) return;

  exportCanvas.width = canvas.offsetWidth;
  exportCanvas.height = canvas.offsetHeight;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  const drawPromises = sortedElements.map(element => {
    return new Promise<void>((resolve) => {
      if (element.type === 'text') {
        context.font = `${element.fontSize}px Arial`;
        context.fillStyle = element.color || '#000000';
        context.fillText(element.content || '', element.x, element.y + (element.fontSize || 24));
        resolve();
      } else if (element.type === 'rectangle') {
        context.fillStyle = element.color || '#1e88e5';
        context.fillRect(element.x, element.y, element.width, element.height);
        resolve();
      } else if (element.type === 'circle') {
        context.beginPath();
        context.fillStyle = element.color || '#1e88e5';
        context.arc(
          element.x + element.width / 2,
          element.y + element.height / 2,
          element.width / 2,
          0,
          2 * Math.PI
        );
        context.fill();
        resolve();
      } else if (element.type === 'image' && element.src) {
        const img = new window.Image() as HTMLImageElement;
        img.onload = () => {
          context.drawImage(img, element.x, element.y, element.width, element.height);
          resolve();
        };
        img.src = element.src;
      } else {
        resolve();
      }
    });
  });

  Promise.all(drawPromises).then(() => {
    const link = document.createElement('a');
    link.download = 'canvas-design.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  });
};