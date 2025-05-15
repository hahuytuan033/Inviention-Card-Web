import { useState, useEffect } from 'react';
import type { Element } from '../types';

export const useDrag = (
  selectedElement: Element | null,
  updateElement: (id: number, updates: Partial<Element>) => void,
  zoom: number
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (element: Element, e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !selectedElement) return;
    let newX = (e.clientX - dragStart.x) / zoom;
    let newY = (e.clientY - dragStart.y) / zoom;
    updateElement(selectedElement.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectedElement, dragStart, zoom]);

  return { handleMouseDown, isDragging };
};