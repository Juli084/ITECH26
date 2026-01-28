"use client";

import { useState } from "react";
import { Film, ShoppingCart } from "lucide-react";

interface MediaItem {
    url: string;
    type: string;
}

interface ProductGalleryProps {
    media: MediaItem[];
    productName: string;
}

export function ProductGallery({ media, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Safety check in case media is empty or undefined, though logic below handles it too
    if (!media || media.length === 0) {
        return (
            <div className="space-y-6">
                <div className="aspect-square bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 group">
                    <ShoppingCart className="w-32 h-32 text-slate-100" />
                </div>
            </div>
        );
    }

    const selectedMedia = media[selectedIndex] || media[0];

    return (
        <div className="space-y-6">
            <div className="aspect-square bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 group relative transition-all duration-300">
                {selectedMedia.type === "VIDEO" ? (
                    <video
                        key={selectedMedia.url} // Key forces re-render if video changes
                        src={selectedMedia.url}
                        controls
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <img
                        key={selectedMedia.url} // Key helps with transition awareness
                        src={selectedMedia.url}
                        alt={productName}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                    />
                )}
            </div>

            {media.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {media.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`aspect-square bg-slate-50 border rounded-2xl overflow-hidden p-2 cursor-pointer transition-all duration-200 ${i === selectedIndex
                                    ? "border-primary ring-2 ring-primary/20 scale-95"
                                    : "border-slate-100 hover:border-primary/50 hover:scale-105"
                                }`}
                        >
                            {item.type === "VIDEO" ? (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-lg">
                                    <Film className="w-6 h-6 text-white" />
                                </div>
                            ) : (
                                <img src={item.url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
