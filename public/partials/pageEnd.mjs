import templateWrapper from "../utils/templateWrapper.mjs";
import searchBoxHtml from "../templates/searchBox.mjs";
import searchBoxCss from "../css/searchBox.mjs";

import titleCardHtml from "../templates/titleCard.mjs";
import titleCardCss from "../css/searchBox.mjs";

export default `
    </main>
    ${templateWrapper(searchBoxHtml, searchBoxCss, "search-box-template")}
    ${templateWrapper(titleCardHtml, titleCardCss, "title-card-template")}
  </body>
</html>
`;
