let pagePreview;

export const initPagePreview = () => {
    pagePreview = document.getElementById('pagePreview');
    if (!pagePreview) {
        console.error('Elemento pagePreview não encontrado!');
        return false;
    }
    return true;
};

export { pagePreview };