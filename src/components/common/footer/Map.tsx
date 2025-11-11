import { useGlobal } from '@/providers/GlobalProvider';
import React from 'react'

export default function Map() {
    const {global} = useGlobal();
  return (
    <div>
        <iframe src={global?.footer?.location.map_embed_url} width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
    </div>
  )
}
