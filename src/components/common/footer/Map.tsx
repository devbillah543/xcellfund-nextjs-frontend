"use client";

import { useGlobal } from '@/providers/GlobalProvider';
import React from 'react';

export default function Map() {
    const { global, loading } = useGlobal();

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
