export default function templateWrapper(htmlString, id) {
  return `
<template id="${id}">
  ${htmlString()}
</template>
`;
}
