export default `
.search-box {
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
.search-box__input {
  background-color: transparent;
  border: 1px solid lightgrey;
  padding: 8px;
  min-width: 180px;
  width: 600px;
  max-width: 80%;
  color: lightgrey;
}
.search-box__input::placeholder {
  color: lightgrey;
}
.search-box__button{
  background-color: transparent;
  border: 1px solid darkgrey;
  color: lightgrey;
}
`;
