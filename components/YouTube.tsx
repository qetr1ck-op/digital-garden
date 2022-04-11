import React from 'react'

interface Props {
  src: string
}

export const YouTube: React.FC<Props> = ({ src }) => (
  <div className="flex justify-center">
    <iframe
      width="100%"
      height="380"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)
