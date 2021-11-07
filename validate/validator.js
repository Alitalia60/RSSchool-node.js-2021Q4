 // class accepts alias and full name options and test array of 'arguments'
 // if they are duplicate or absent.
 // optAlias =  short name of option: -c, -i, -o
 // optFullName = full name of option: --config, --input, --output
 // isRequired = false (default). If = true, option required otherwise return Error
 
 class Validator {
     constructor(optAlias, optFullName, isRequired = false) {
         this.optAlias = optAlias; 
         this.optFullName = optFullName; 
         this.isRequired = isRequired;
     }
     isValid = function(arguments) {
         let nextArg = null;
         let option = arguments.filter(item => (item == this.optAlias) || (item == this.optFullName));
         if (option.length < 1) {
             // опций более одной
             console.error(ERR[1], ERR[3]);

         } else if (option.length < 1) {
             // нет опции 
             if (this.isRequired) {
                 console.error(ERR[2]);
             }
         } else {
             return arguments[1].split("-");
         }
     }
 }