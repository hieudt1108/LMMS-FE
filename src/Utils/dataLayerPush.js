export const dataLayerPush = (event, details) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...details,
  });
};
