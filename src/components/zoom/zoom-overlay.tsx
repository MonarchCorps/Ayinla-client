'use client';

import { MouseEvent, useState } from 'react';

const MAGNIFIER_SIZE = 300;
const ZOOM_LEVEL = 2.5;

type Props = {
    src: string;
    width: number;
    height: number;
};

export default function ZoomOverlay({ src, width, height }: Props) {
    const [zoomable, setZoomable] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 });

    const updatePosition = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        setPosition({
            x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
            y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
            mouseX: x - MAGNIFIER_SIZE / 2,
            mouseY: y - MAGNIFIER_SIZE / 2,
        });
    };

    return (
        <div
            onMouseEnter={(e) => {
                setZoomable(true);
                updatePosition(e);
            }}
            onMouseLeave={() => setZoomable(false)}
            onMouseMove={updatePosition}
            className="absolute inset-0"
        >
            <div
                style={{
                    backgroundPosition: `${position.x}px ${position.y}px`,
                    backgroundImage: `url(${src})`,
                    backgroundSize: `${width * ZOOM_LEVEL}px ${height * ZOOM_LEVEL}px`,
                    backgroundRepeat: 'no-repeat',
                    display: zoomable ? 'block' : 'none',
                    top: `${position.mouseY}px`,
                    left: `${position.mouseX}px`,
                    width: `${MAGNIFIER_SIZE}px`,
                    height: `${MAGNIFIER_SIZE}px`,
                }}
                className="z-50 border-4 rounded-full pointer-events-none absolute border-gray-500"
            />
        </div>
    );
}
