'use client';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Image from 'next/image';

const mdxComponents = {
  Image
};

const RenderMdx = ({ content, preview }) => {
  const previewContent = preview ? content : content;

  return (
    <div className={preview ? 'custom-quill preview' : 'custom-quill'}>
      <ReactQuill
        value={previewContent}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
      />
    </div>
  );
};

export default RenderMdx;
