import { CONFIGS } from "@/config";

export type DefaultMetaDataType = {
    title:
    | string
    | {
        template: string;
        default: string;
    };
    description: string;
    url?: string;
    image?: string;
    keywords?: string[];
    alt?: string;
    twitterTitle?: string;
    twitterDesc?: string;
    canonicalUrl?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
};

export function getDefaultMetadata({
    title,
    description,
    url = CONFIGS.URL.CLIENT_BASE_URL,
    image = CONFIGS.IMAGE,
    keywords = [],
    alt,
    twitterTitle,
    twitterDesc,
    canonicalUrl,
    openGraphTitle,
    openGraphDescription,
}: DefaultMetaDataType) {
    const titleObj =
        typeof title === "string"
            ? {
                default: title,
                template: "%s | Ayinla Films",
            }
            : title;

    return {
        title: titleObj,
        description,
        keywords,
        openGraph: {
            title: openGraphTitle || titleObj.default,
            description: openGraphDescription || description,
            url,
            siteName: "Ayinla Films",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: alt ?? titleObj.default,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: twitterTitle ?? titleObj.default,
            description: twitterDesc ?? description,
            images: [image],
        },
        alternates: {
            canonical: canonicalUrl || url,
        },
        metadataBase: new URL(CONFIGS.URL.CLIENT_BASE_URL),
        authors: [{ name: "Ayinla Films", url: CONFIGS.URL.CLIENT_BASE_URL }],
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                maxVideoPreview: -1,
                maxImagePreview: "large",
                maxSnippet: -1,
            },
        },
        category: "Film Production",
    };
}
