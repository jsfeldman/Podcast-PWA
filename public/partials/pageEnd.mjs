import templateWrapper from "../utils/templateWrapper.mjs";
import searchBoxHtml from "../templates/searchBox.mjs";

export default `
    </main>
    ${templateWrapper(searchBoxHtml, "search-box-template")}
  </body>
</html>
`;
