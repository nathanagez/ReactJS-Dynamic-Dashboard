export const dragHelper = () => {
    const element: any = document.getElementsByClassName('ant-card-head');
    for (let item of element) {
        item.classList.add('react-grid-dragHandler');
        item.style.cursor = "pointer";
    }
}