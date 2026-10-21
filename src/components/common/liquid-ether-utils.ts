import * as THREE from 'three';

export const DEFAULT_LIQUID_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

export function makePaletteTexture(stops: string[]): THREE.DataTexture {
  let arr: string[];
  if (Array.isArray(stops) && stops.length > 0) {
    arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
  } else {
    arr = ['#ffffff', '#ffffff'];
  }

  const width = arr.length;
  const data = new Uint8Array(width * 4);

  for (let index = 0; index < width; index += 1) {
    const color = new THREE.Color(arr[index]);
    data[index * 4 + 0] = Math.round(color.r * 255);
    data[index * 4 + 1] = Math.round(color.g * 255);
    data[index * 4 + 2] = Math.round(color.b * 255);
    data[index * 4 + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
