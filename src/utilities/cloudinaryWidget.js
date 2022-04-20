export const optionsCloudinary = (multiple = false) => ({
  cloudName: import.meta.env.VITE_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
  sources: ["local", "camera"],
  showAdvancedOptions: false,
  cropping: !multiple,
  multiple,
  defaultSource: "local",
});