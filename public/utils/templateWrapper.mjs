export default function templateWrapper(htmlString, cssString, id) {
  return `
<template id="${id}">
  <style>
    ${cssString}
  </style>
  ${htmlString()}
</template>
`;
}
