import React, { useState, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { FileUploadValidator, ValidationUtils } from '../../utils/validation';

const EnhancedFileUpload = ({ 
  onFileUpload, 
  onFileRemove,
  accept = "*", 
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  showPreview = true,
  multiple = false,
  className = "",
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const inputRef = useRef(null);

  // Debounced validation
  const debouncedValidation = useCallback(
    ValidationUtils.debounce((file) => {
      const validation = FileUploadValidator.validateDocument(file);
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          [file.name]: validation.errors
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[file.name];
          return newErrors;
        });
      }
    }, 300),
    []
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  }, []);

  const handleFiles = useCallback((fileList) => {
    const newFiles = [];
    const newErrors = {};

    fileList.forEach(file => {
      // Validar arquivo
      const validation = FileUploadValidator.validateDocument(file);
      
      if (!validation.isValid) {
        newErrors[file.name] = validation.errors;
        return;
      }

      // Verificar se já existe
      if (files.find(f => f.name === file.name && f.size === file.size)) {
        newErrors[file.name] = ['Arquivo já foi adicionado'];
        return;
      }

      // Verificar limite de arquivos
      if (files.length + newFiles.length >= maxFiles) {
        newErrors[file.name] = [`Máximo de ${maxFiles} arquivos permitidos`];
        return;
      }

      const fileObj = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        uploaded_at: new Date().toISOString()
      };

      newFiles.push(fileObj);
    });

    setFiles(prev => [...prev, ...newFiles]);
    setErrors(prev => ({ ...prev, ...newErrors }));

    // Validar em tempo real
    newFiles.forEach(fileObj => {
      debouncedValidation(fileObj.file);
    });
  }, [files, maxFiles, debouncedValidation]);

  const handleUpload = async (fileObj) => {
    if (!fileObj || uploading) return;

    setUploading(true);
    setProgress(prev => ({ ...prev, [fileObj.id]: 0 }));

    try {
      // Simular upload progressivo
      const interval = setInterval(() => {
        setProgress(prev => {
          const current = prev[fileObj.id] || 0;
          if (current >= 90) {
            clearInterval(interval);
            return { ...prev, [fileObj.id]: 90 };
          }
          return { ...prev, [fileObj.id]: current + 10 };
        });
      }, 200);

      // Simular chamada da API
      const formData = new FormData();
      formData.append('file', fileObj.file);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setProgress(prev => ({ ...prev, [fileObj.id]: 100 }));

      // Simular resposta do servidor
      const uploadedFile = {
        id: fileObj.id,
        name: fileObj.name,
        size: fileObj.size,
        type: fileObj.type,
        url: fileObj.preview || URL.createObjectURL(fileObj.file),
        uploaded_at: fileObj.uploaded_at
      };

      onFileUpload(uploadedFile);
      
      // Remover arquivo da lista local
      setFiles(prev => prev.filter(f => f.id !== fileObj.id));
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fileObj.name]: ['Erro ao fazer upload do arquivo. Tente novamente.']
      }));
    } finally {
      setUploading(false);
      setProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileObj.id];
        return newProgress;
      });
    }
  };

  const handleRemoveFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove) {
      // Limpar preview URL se existir
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      setFiles(prev => prev.filter(f => f.id !== fileId));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fileToRemove.name];
        return newErrors;
      });
      
      if (onFileRemove) {
        onFileRemove(fileId);
      }
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
    if (type.includes('word')) return 'mdi:file-word-box';
    if (type.includes('excel')) return 'mdi:file-excel-box';
    return 'mdi:file-document-box';
  };

  const getFileTypeColor = (type) => {
    if (type.includes('pdf')) return '#dc3545';
    if (type.includes('image')) return '#28a745';
    if (type.includes('video')) return '#ffc107';
    if (type.includes('audio')) return '#17a2b8';
    if (type.includes('zip') || type.includes('rar')) return '#6f42c1';
    return '#6c757d';
  };

  return (
    <div className={`enhanced-file-upload ${className}`}>
      {/* Área de Upload */}
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${disabled ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          style={{ display: 'none' }}
        />
        
        <div className="upload-content">
          <Icon 
            icon="mdi:cloud-upload" 
            className="upload-icon"
          />
          
          <h5 className="upload-title">
            {dragActive ? 'Solte os arquivos aqui' : 'Arraste e solte arquivos aqui'}
          </h5>
          
          <p className="upload-subtitle">
            ou clique para selecionar
          </p>
          
          <div className="upload-info">
            <p className="upload-types">
              Tipos aceitos: {accept === "*" ? "Todos" : accept}
            </p>
            <p className="upload-size">
              Tamanho máximo: {(maxSize / 1024 / 1024).toFixed(1)}MB
            </p>
            <p className="upload-count">
              Máximo: {maxFiles} arquivos
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className="files-list">
          <h6 className="files-title">Arquivos ({files.length}/{maxFiles})</h6>
          
          {files.map((fileObj) => (
            <div key={fileObj.id} className="file-item">
              <div className="file-info">
                <Icon 
                  icon={getFileIcon(fileObj.type)} 
                  className="file-icon"
                  style={{ color: getFileTypeColor(fileObj.type) }}
                />
                
                <div className="file-details">
                  <h6 className="file-name">{fileObj.name}</h6>
                  <p className="file-meta">
                    {formatFileSize(fileObj.size)} • {fileObj.type}
                  </p>
                </div>
              </div>

              <div className="file-actions">
                {progress[fileObj.id] !== undefined ? (
                  <div className="upload-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress[fileObj.id]}%` }}
                      />
                    </div>
                    <span className="progress-text">{progress[fileObj.id]}%</span>
                  </div>
                ) : (
                  <>
                    {fileObj.preview && showPreview && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setPreviewFile(fileObj);
                          setShowPreviewModal(true);
                        }}
                      >
                        <Icon icon="mdi:eye" />
                      </button>
                    )}
                    
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpload(fileObj)}
                      disabled={uploading}
                    >
                      <Icon icon="mdi:upload" />
                      Upload
                    </button>
                    
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveFile(fileObj.id)}
                      disabled={uploading}
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                  </>
                )}
              </div>

              {errors[fileObj.name] && (
                <div className="file-errors">
                  {errors[fileObj.name].map((error, index) => (
                    <p key={index} className="error-message">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de Preview */}
      {showPreviewModal && previewFile && (
        <div className="preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h5>Visualizar Arquivo</h5>
              <button 
                className="btn-close"
                onClick={() => setShowPreviewModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="preview-body">
              {previewFile.preview ? (
                <img 
                  src={previewFile.preview} 
                  alt={previewFile.name}
                  className="preview-image"
                />
              ) : (
                <div className="preview-placeholder">
                  <Icon 
                    icon={getFileIcon(previewFile.type)} 
                    className="preview-icon"
                    style={{ color: getFileTypeColor(previewFile.type) }}
                  />
                  <p>{previewFile.name}</p>
                  <small>{formatFileSize(previewFile.size)}</small>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .enhanced-file-upload {
          width: 100%;
        }

        .upload-area {
          border: 2px dashed #dee2e6;
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #fff;
          position: relative;
        }

        .upload-area:hover:not(.disabled) {
          border-color: #0d6efd;
          background-color: #f8f9fa;
        }

        .upload-area.drag-active {
          border-color: #0d6efd;
          background-color: #e7f3ff;
        }

        .upload-area.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .upload-content {
          pointer-events: none;
        }

        .upload-icon {
          font-size: 48px;
          color: #6c757d;
          margin-bottom: 16px;
        }

        .upload-title {
          margin-bottom: 8px;
          color: #212529;
        }

        .upload-subtitle {
          color: #6c757d;
          margin-bottom: 16px;
        }

        .upload-info {
          font-size: 12px;
          color: #6c757d;
        }

        .upload-info p {
          margin-bottom: 4px;
        }

        .files-list {
          margin-top: 24px;
        }

        .files-title {
          margin-bottom: 16px;
          color: #212529;
        }

        .file-item {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          background: #fff;
        }

        .file-info {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .file-icon {
          font-size: 24px;
          margin-right: 12px;
        }

        .file-details {
          flex: 1;
        }

        .file-name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .file-meta {
          margin: 0;
          font-size: 12px;
          color: #6c757d;
        }

        .file-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .upload-progress {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background-color: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #0d6efd;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 12px;
          color: #6c757d;
          min-width: 40px;
        }

        .file-errors {
          margin-top: 8px;
        }

        .error-message {
          color: #dc3545;
          font-size: 12px;
          margin: 0;
        }

        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }

        .preview-content {
          background: #fff;
          border-radius: 12px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: hidden;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #dee2e6;
        }

        .preview-header h5 {
          margin: 0;
        }

        .btn-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6c757d;
        }

        .preview-body {
          padding: 24px;
          text-align: center;
        }

        .preview-image {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .preview-placeholder {
          padding: 40px;
        }

        .preview-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-sm {
          padding: 4px 8px;
          font-size: 11px;
        }

        .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: #fff;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
          border-color: #0a58ca;
        }

        .btn-outline-primary {
          background-color: transparent;
          border-color: #0d6efd;
          color: #0d6efd;
        }

        .btn-outline-primary:hover {
          background-color: #0d6efd;
          color: #fff;
        }

        .btn-outline-danger {
          background-color: transparent;
          border-color: #dc3545;
          color: #dc3545;
        }

        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default EnhancedFileUpload; 