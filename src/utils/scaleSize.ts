// utils/scaleSize.ts
export const scaleSize = (size) => {
    const screenWidth = window.innerWidth;
    const baseWidth = 375; // Largura de referência (ex.: iPhone 11)
    const scaledSize = Math.round((size * screenWidth) / baseWidth);
  
    // Define limites mínimos e máximos
    const minSize = size * 0.7; // 70% do tamanho original
    const maxSize = size * 1.5; // 150% do tamanho original
  
    return Math.min(Math.max(scaledSize, minSize), maxSize);
  };