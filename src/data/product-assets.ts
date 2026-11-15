const chintCircuitImages = import.meta.glob("/src/assets/chint/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const moraCircuitImages = import.meta.glob("/src/assets/mora circuit/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function getCircuitImage(images: Record<string, string>, folder: string, fileName: string) {
  const image = images[`/src/assets/${folder}/${fileName}`];
  if (!image) {
    throw new Error(`Missing product image "${fileName}" in "${folder}".`);
  }
  return image;
}

export const getChintCircuitImage = (fileName: string) =>
  getCircuitImage(chintCircuitImages, "chint", fileName);

export const getMoraCircuitImage = (fileName: string) =>
  getCircuitImage(moraCircuitImages, "mora circuit", fileName);
