// ZoomImage.tsx
import Image from 'next/image';
import ZoomOverlay from './zoom-overlay';

type Props = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export default function ZoomImage({ src, width, height, alt }: Props) {
    return (
        <div className="flex justify-center items-center">
            <div
                className="relative overflow-hidden"
                style={{ width, height }}
            >
                <Image
                    className="object-cover border z-10"
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={true}
                />
                <ZoomOverlay src={src} width={width} height={height} />
            </div>
        </div>
    );
}
