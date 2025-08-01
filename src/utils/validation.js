// Sistema de Validação para Produtos
export class ProductValidator {
  static validateProduct(product) {
    const errors = {};

    // Validação do nome
    if (!product.name || product.name.trim().length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
    } else if (product.name.length > 100) {
      errors.name = 'Nome deve ter no máximo 100 caracteres';
    }

    // Validação da descrição
    if (!product.description || product.description.trim().length < 10) {
      errors.description = 'Descrição deve ter pelo menos 10 caracteres';
    } else if (product.description.length > 1000) {
      errors.description = 'Descrição deve ter no máximo 1000 caracteres';
    }

    // Validação do preço
    if (!product.price || isNaN(product.price) || product.price <= 0) {
      errors.price = 'Preço deve ser um valor válido maior que zero';
    }

    // Validação da categoria
    if (!product.category || product.category.trim().length === 0) {
      errors.category = 'Categoria é obrigatória';
    }

    // Validação do produtor
    if (!product.producer || product.producer.trim().length === 0) {
      errors.producer = 'Produtor é obrigatório';
    }

    // Validação dos watts
    if (!product.watts || isNaN(product.watts) || product.watts <= 0) {
      errors.watts = 'Watts deve ser um valor válido maior que zero';
    }

    // Validação da URL da imagem
    if (product.image_url) {
      try {
        new URL(product.image_url);
      } catch {
        errors.image_url = 'URL da imagem deve ser válida';
      }
    }

    // Validação de arquivos
    if (product.files && product.files.length > 0) {
      const fileErrors = [];
      product.files.forEach((file, index) => {
        if (file.size > 10 * 1024 * 1024) { // 10MB
          fileErrors.push(`Arquivo ${file.name} excede 10MB`);
        }
        if (!['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type)) {
          fileErrors.push(`Tipo de arquivo ${file.name} não é suportado`);
        }
      });
      if (fileErrors.length > 0) {
        errors.files = fileErrors;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static validateFile(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB padrão
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
      maxFiles = 10
    } = options;

    const errors = [];

    // Verificar tamanho
    if (file.size > maxSize) {
      errors.push(`Arquivo excede o tamanho máximo de ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
    }

    // Verificar tipo
    if (!allowedTypes.includes(file.type)) {
      errors.push(`Tipo de arquivo não suportado. Tipos aceitos: ${allowedTypes.join(', ')}`);
    }

    // Verificar nome
    if (file.name.length > 255) {
      errors.push('Nome do arquivo muito longo');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateForm(formData) {
    const errors = {};

    // Validação de campos obrigatórios
    Object.keys(formData).forEach(field => {
      if (formData[field] === '' || formData[field] === null || formData[field] === undefined) {
        errors[field] = 'Campo obrigatório';
      }
    });

    // Validação específica por tipo de campo
    if (formData.email && !this.isValidEmail(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (formData.phone && !this.isValidPhone(formData.phone)) {
      errors.phone = 'Telefone inválido';
    }

    if (formData.cpf && !this.isValidCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  static isValidCPF(cpf) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  }

  static sanitizeInput(input) {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove caracteres perigosos
      .replace(/\s+/g, ' '); // Remove espaços extras
  }

  static formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }
}

// Validação específica para upload de arquivos
export class FileUploadValidator {
  static validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return ProductValidator.validateFile(file, {
      maxSize,
      allowedTypes
    });
  }

  static validateDocument(file) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    return ProductValidator.validateFile(file, {
      maxSize,
      allowedTypes
    });
  }

  static validateVideo(file) {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    return ProductValidator.validateFile(file, {
      maxSize,
      allowedTypes
    });
  }
}

// Utilitários de validação
export const ValidationUtils = {
  // Debounce para validação em tempo real
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Validação em tempo real
  realTimeValidation: (value, validator) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = validator(value);
        resolve(result);
      }, 300);
    });
  },

  // Formatação de erros
  formatErrors: (errors) => {
    return Object.keys(errors).map(field => ({
      field,
      message: errors[field]
    }));
  }
};

export default ProductValidator; 