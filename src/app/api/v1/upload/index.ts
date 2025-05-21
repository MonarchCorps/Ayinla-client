"use server";

import { CONFIGS } from "@/config";
import { cookies } from "next/headers";

export async function uploadToPresignedUrl(
    file: File,
    url: string
): Promise<string | null> {
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!res.ok) {
            console.error("Failed upload:", file.name, res.status);
            return null;
        }

        return url.split("?")[0];
    }
    catch (error) {
        console.error("Upload error:", file.name, error);
        return null;
    }
}

export async function getPresignedUrls({
    fileExtension,
    count = 1,
}: {
    fileExtension: string;
    count?: number;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

    const params = new URLSearchParams();
    params.append("file_extension", fileExtension);
    params.append("count", count.toString());

    const response = await fetch(`${CONFIGS.URL.API_BASE_URL}/uploads/presigned-urls?${params.toString()}`, {
        method: "GET",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    })

    return response.json();
}