"use client";

import { useGlobal } from '@/providers/GlobalProvider';
import { usePathname } from 'next/navigation';
import React from 'react';

const allowedPaths = ['/contact-us', '/about-us', '/locations'];

export default function Map() {
    const pathname = usePathname();
    const { global, loading } = useGlobal();
    // Only render map on allowed paths
    if (!allowedPaths.includes(pathname ?? '')) {
        return null;
    }
    // Show skeleton while loading
    if (loading || !global) {
        return (
            <div className="w-full h-[450px] bg-gray-300 rounded animate-pulse"></div>
        );
    }

    // Show map when data is loaded
    return (
        <div>
            <iframe
                src={global?.footer?.location?.map_embed_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
}
