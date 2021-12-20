const {argumentsError, commandsError, fileCheckError}  =  require("../errors/myError")


let a = 2;
let b = 3;
if (a != b) {
  new argumentsError(" ошибка агументов ")//.sayError();


} else {
  console.log("a  равно b");
}
