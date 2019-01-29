import Cropper from "cropperjs";

export const cropper = new Cropper(canvas, {
    fillColor: '#fff',
    aspectRatio: 1,
    width: 200,
    height: 200,
    center: true,
    highlight: true,
    zoomable: false,
    zoomOnWheel: false
});

