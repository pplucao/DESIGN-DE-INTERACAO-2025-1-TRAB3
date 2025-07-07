export const initPagePreview = () => {
  const pagePreview = document.getElementById('pagePreview');

  if (!pagePreview) {
    console.error('Elemento pagePreview não encontrado!');
    return false;
  }
  return true;
};
