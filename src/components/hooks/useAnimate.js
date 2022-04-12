import { useEffect, useState, useRef } from 'react';
import Presets from '../utils/presets';

export const height = 700;
export const width = 700;
export const cell_size = 14;

export function useAnimate() {
  const canvasRef = useRef(null);
  const [gen, setGen] = useState(0);

  const [nextGrid, setNextGrid] = useState(
    Presets('quad_thunderbird', height, width, cell_size)
  );

  const ROWS = Math.floor(height / cell_size);
  const COLS = Math.floor(width / cell_size);

  const [initialGrid] = useState(
    new Array(ROWS).fill(null).map(() => new Array(COLS).fill(0))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function render(grid, context) {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          const cell = grid[row][col];

          context.beginPath();

          context.rect(col * cell_size, row * cell_size, cell_size, cell_size);

          if (cell === 1) {
            context.fillStyle = '#2590da';
          } else {
            context.fillStyle = '#020202';
          }
          context.fill();
          context.lineWidth = 0.5;
          context.strokeStyle = '#2590da';
          context.stroke();
        }
      }
    }
    // clear canvas before next render
    ctx.clearRect(0, 0, height, width);

    render(nextGrid, ctx);
  }, [nextGrid, gen]);

  return [
    canvasRef,
    cell_size,
    initialGrid,
    nextGrid,
    setNextGrid,
    gen,
    setGen,
    width,
    height,
  ];
}
