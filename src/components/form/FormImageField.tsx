"use client";

import type { DropResult } from "@hello-pangea/dnd";
import { useFormContext } from "react-hook-form";

import PreviewModal from "@/components/PreviewModal";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    DragDropContext,
    Draggable,
    Droppable,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import Image from "next/image";

type MixedImage = {
    id: string;
    file?: File;
    url?: string;
    previewUrl: string;
    isNew: boolean;
};

export const MAX_IMAGES = 8;

export default function FormImageField({
    name,
    existingImage = [],
}: {
    name: string;
    existingImage?: string[];
}) {
    const form = useFormContext();
    const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
    const [mixedImages, setMixedImages] = useState<MixedImage[]>([]);

    useEffect(() => {
        if (existingImage.length && mixedImages.length === 0) {
            const initial = existingImage.map(url => ({
                id: url,
                url,
                previewUrl: url,
                isNew: false,
            }));
            setMixedImages(initial);
            form.setValue(name, initial.map(i => i.url!));
        }
    }, [existingImage, mixedImages.length, form, name]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.currentTarget.value = "";

        const imageFiles = files.filter(f => f.type.startsWith("image/"));
        if (!imageFiles.length) return;

        const totalAfter = mixedImages.length + imageFiles.length;
        if (totalAfter > MAX_IMAGES) {
            toast.error(`Maximum of ${MAX_IMAGES} images allowed.`);
            imageFiles.splice(MAX_IMAGES - mixedImages.length);
        }

        const newItems: MixedImage[] = imageFiles.map(file => ({
            id: nanoid(),
            file,
            previewUrl: URL.createObjectURL(file),
            isNew: true,
        }));

        const combined = [...mixedImages, ...newItems];
        setMixedImages(combined);
        form.setValue(
            name,
            combined.map(img => img.isNew ? img.file! : img.url!)
        );
    };

    const handleDragEnd = (res: DropResult) => {
        if (!res.destination) return;
        const arr = [...mixedImages];
        const [moved] = arr.splice(res.source.index, 1);
        arr.splice(res.destination.index, 0, moved);
        setMixedImages(arr);
        form.setValue(
            name,
            arr.map(img => img.isNew ? img.file! : img.url!)
        );
    };

    const handleDelete = (id: string) => {
        const arr = mixedImages.filter(i => i.id !== id);
        setMixedImages(arr);
        form.setValue(
            name,
            arr.map(img => img.isNew ? img.file! : img.url!)
        );
    };
    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem>
                    <FormControl>
                        <label
                            htmlFor="dropzone-file"
                            className={clsx(
                                "flex flex-col items-center justify-center min-h-[10rem] border rounded-xl mt-4 p-4",
                                form.formState.errors[name]
                                    ? "border-[#e7000b]"
                                    : "border-[#EAECF0]",
                            )}
                            tabIndex={0}
                        >
                            {mixedImages.length === 0
                                ? (
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <Image
                                            src={"/images/upload.png"}
                                            alt="Upload"
                                            className="mb-2 object-cover`"
                                            width={60}
                                            height={60}
                                        />
                                        <p className="text-sm text-gray-500 text-center">
                                            <span
                                                className={clsx(
                                                    "font-semibold",
                                                    form.formState.errors[name]
                                                        ? "text-[#e7000b]"
                                                        : "text-[#175CD3]",
                                                )}
                                            >
                                                Click to Upload
                                            </span>
                                            {" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-500 text-center">
                                            SVG, PNG, JPEG or GIF (max. 5MB each)
                                        </p>
                                    </div>
                                )
                                : (
                                    <DragDropContext onDragEnd={handleDragEnd}>
                                        <Droppable droppableId="image-grid" direction="horizontal">
                                            {provided => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className="w-full rs-grid gap-4 relative overflow-x-auto"
                                                >
                                                    {mixedImages.map((item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(prov, snap) => (
                                                                <div
                                                                    ref={prov.innerRef}
                                                                    {...prov.draggableProps}
                                                                    {...prov.dragHandleProps}
                                                                    style={prov.draggableProps.style}
                                                                    onMouseEnter={() => setHoveredImageId(item.id)}
                                                                    onMouseLeave={() => setHoveredImageId(null)}
                                                                    className={clsx(
                                                                        "relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow",
                                                                        snap.isDragging && "z-50 shadow-lg",
                                                                    )}
                                                                >
                                                                    {/* {item.url
                                                                        ? (
                                                                            <LazyLoadImage
                                                                                src={item.previewUrl}
                                                                                alt={`Preview ${index}`}
                                                                                className="w-full h-full object-cover transition-all hover:scale-105 hover:cursor-pointer"
                                                                            />
                                                                        )
                                                                        : ( */}
                                                                    <div className="relative size-full">
                                                                        <Image
                                                                            src={item.previewUrl}
                                                                            alt={`Preview ${index}`}
                                                                            className="object-cover transition-all hover:scale-105 hover:cursor-pointer"
                                                                            fill
                                                                        />
                                                                    </div>
                                                                    {/* )} */}
                                                                    {hoveredImageId === item.id && (
                                                                        <div className="absolute top-0 right-0 p-2 flex items-center justify-between w-full">
                                                                            <button
                                                                                className="cursor-pointer mt-2"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    handleDelete(item.id);
                                                                                }}
                                                                            >
                                                                                <FaTrash className="text-red-600 text-xl" />
                                                                            </button>
                                                                            <PreviewModal preview={item.previewUrl} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                )}

                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
