import React, { useState, useRef } from 'react';
import { Button, ProgressBar, Alert, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const FileUpload = ({ onFileUpload, accept = "*", maxSize = 10 * 1024 * 1024 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    
    // Validar tamanho
    if (file.size > maxSize) {
      setError(`Arquivo muito grande. Tamanho máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    // Validar tipo
    if (accept !== "*" && !file.type.match(accept)) {
      setError(`Tipo de arquivo não suportado. Tipos aceitos: ${accept}`);
      return;
    }

    setError(null);
    setPreviewFile(file);
    setShowPreview(true);
  };

  const handleUpload = async () => {
    if (!previewFile) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simular upload progressivo
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Aqui você faria o upload real para o servidor
      const formData = new FormData();
      formData.append('file', previewFile);
      
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setProgress(100);

      // Simular resposta do servidor
      const uploadedFile = {
        id: Date.now(),
        name: previewFile.name,
        size: previewFile.size,
        type: previewFile.type,
        url: URL.createObjectURL(previewFile),
        uploaded_at: new Date().toISOString()
      };

      onFileUpload(uploadedFile);
      setShowPreview(false);
      setPreviewFile(null);
      setProgress(0);
      
    } catch (error) {
      setError('Erro ao fazer upload do arquivo. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return 'mdi:file-pdf-box';
    if (type.includes('image')) return 'mdi:file-image-box';
    if (type.includes('video')) return 'mdi:file-video-box';
    if (type.includes('audio')) return 'mdi:file-music-box';
    if (type.includes('zip') || type.includes('rar')) return 'mdi:file-archive-box';
    return 'mdi:file-document-box';
  };

  return (
    <>
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed #dee2e6',
          borderRadius: '8px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: dragActive ? '#f8f9fa' : '#fff',
          borderColor: dragActive ? '#0d6efd' : '#dee2e6'
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        <Icon 
          icon="mdi:cloud-upload" 
          className="mb-3" 
          style={{ fontSize: '48px', color: dragActive ? '#0d6efd' : '#6c757d' }}
        />
        
        <h5 className="mb-2">Arraste e solte arquivos aqui</h5>
        <p className="text-muted mb-3">ou clique para selecionar</p>
        
        <div className="text-muted small">
          <p className="mb-1">Tipos aceitos: {accept === "*" ? "Todos" : accept}</p>
          <p className="mb-0">Tamanho máximo: {(maxSize / 1024 / 1024).toFixed(1)}MB</p>
        </div>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>

      {/* Modal de Preview */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewFile && (
            <div className="text-center">
              <Icon 
                icon={getFileIcon(previewFile.type)} 
                style={{ fontSize: '64px', color: '#0d6efd' }}
                className="mb-3"
              />
              <h6>{previewFile.name}</h6>
              <p className="text-muted">{formatFileSize(previewFile.size)}</p>
              
              {uploading && (
                <div className="mt-3">
                  <ProgressBar now={progress} className="mb-2" />
                  <small className="text-muted">Fazendo upload... {progress}%</small>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)} disabled={uploading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Fazendo Upload...' : 'Confirmar Upload'}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .upload-area:hover {
          border-color: #0d6efd !important;
          background-color: #f8f9fa !important;
        }
        
        .drag-active {
          border-color: #0d6efd !important;
          background-color: #e7f3ff !important;
        }
      `}</style>
    </>
  );
};

export default FileUpload; 