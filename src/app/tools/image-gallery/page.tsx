'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Download, 
  Grid3X3, 
  List,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageItem {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  tags: string[];
}

export default function ImageGalleryPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    try {
      const newImages: ImageItem[] = acceptedFiles.map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        tags: []
      }));

      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg']
    },
    multiple: true,
    disabled: isUploading
  });

  const deleteImage = (id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.url);
    }
    setImages(prev => prev.filter(img => img.id !== id));
    setSelectedImages(prev => prev.filter(imgId => imgId !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const deleteSelectedImages = () => {
    selectedImages.forEach(id => {
      const image = images.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
    });
    setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);
  };

  const downloadImage = (image: ImageItem) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSelectedImages = async () => {
    for (const id of selectedImages) {
      const image = images.find(img => img.id === id);
      if (image) {
        downloadImage(image);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between downloads
      }
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const selectAllImages = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map(img => img.id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serif font-bold text-gradient">
          Image Gallery
        </h1>
        <p className="text-muted-foreground">
          Create and manage beautiful image galleries with smart organization
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
              <p className="text-muted-foreground">Uploading images...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <p className="text-foreground font-medium text-lg">
                  {isDragActive ? 'Drop your images here' : 'Drag & drop images here'}
                </p>
                <p className="text-muted-foreground">
                  or click to select files
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Supports JPEG, PNG, GIF, WebP, SVG
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      {images.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              />
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-background text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-background text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredImages.length} of {images.length} images
            {selectedImages.length > 0 && ` • ${selectedImages.length} selected`}
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border border-accent/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-accent font-medium">
              {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadSelectedImages}
                className="flex items-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={deleteSelectedImages}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Images Display */}
      {filteredImages.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Images</h2>
            <button
              onClick={selectAllImages}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              {selectedImages.length === filteredImages.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`group relative bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${
                      selectedImages.includes(image.id) ? 'ring-2 ring-accent' : 'border-border'
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.id)}
                          onChange={() => toggleImageSelection(image.id)}
                          className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => downloadImage(image)}
                            className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteImage(image.id)}
                            className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-foreground truncate">{image.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>{formatFileSize(image.size)}</div>
                        <div>{image.uploadDate.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-muted/30 transition-colors ${
                      selectedImages.includes(image.id) ? 'ring-2 ring-accent' : 'border-border'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
                    />
                    
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{image.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {formatFileSize(image.size)} • {image.uploadDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => downloadImage(image)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No images uploaded yet</p>
          <p className="text-muted-foreground">Upload your first image to get started</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No images found</p>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-full bg-card border border-border rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold truncate">{selectedImage.name}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-[70vh] mx-auto rounded-lg"
                />
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    {formatFileSize(selectedImage.size)} • 
                    {selectedImage.uploadDate.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadImage(selectedImage)}
                      className="flex items-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}