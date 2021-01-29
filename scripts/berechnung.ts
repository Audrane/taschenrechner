enum OneOperator {
    ZehnExpo,
    Expo,
    Facto,
    Sin,
    Cos,
    Tan,
    Asin,
    Acos,
    Atan,
    PPM,
    root,
    log,
    ln,
    inv,
    PLusOuMoins,
    PourCentage,
    power,
    power2,
    XhochY
}

var firstNbre: number = NaN;
var IsExpHoch: boolean = false;

/**
 * checkinput return
 * @param operator
 * @constructor
 */

function OperateOne(operator) {
    //wenn nichts eingegeben ist break else nachste zeile
    if (!IsInputCorrect()) return;
    //getinput return das ergebnis von zb 2+2=4
    var actualInput: number = getInput();
    //ist typ unser enum also ein der sonderfunktionen
    var SelectedOperator: OneOperator = <OneOperator>operator;
    //var result: number = NaN;
    if (SelectedOperator == OneOperator.ZehnExpo) {
        actualInput = Math.pow(10, actualInput);
    }

    if (SelectedOperator == OneOperator.Expo) {
        actualInput = Math.exp(actualInput);
    }
    if (SelectedOperator == OneOperator.root) {
        actualInput = Math.sqrt(actualInput);
    }
    if (SelectedOperator == OneOperator.ln) {

    }

    if (SelectedOperator == OneOperator.Facto) {

        var result: number = 1;
        if (actualInput === 0 || actualInput === 1)
            result = 1;

        for (var i = actualInput - 1; i >= 1; i--) {
            result *= i;
        }
        actualInput = result;
    }


    if (SelectedOperator == OneOperator.log) {
        actualInput = Math.log(actualInput);
    }
    if (SelectedOperator == OneOperator.Acos) {
        actualInput = Math.acos(actualInput);
    }
    if (SelectedOperator == OneOperator.Asin) {
        actualInput = Math.asin(actualInput);
    }
    if (SelectedOperator == OneOperator.Atan) {
        actualInput = Math.atan(actualInput);
    }
    if (SelectedOperator == OneOperator.Cos) {
        actualInput = Math.cos(actualInput);
    }
    if (SelectedOperator == OneOperator.Sin) {
        actualInput = Math.sin(actualInput);
    }
    if (SelectedOperator == OneOperator.Tan) {
        actualInput = Math.tan(actualInput);
    }
    if (SelectedOperator == OneOperator.inv) {
        actualInput = (1 / actualInput);
    }
    if (SelectedOperator == OneOperator.PPM) {
        actualInput = (1 / 10 ^ 6);
    }

    if (SelectedOperator == OneOperator.PLusOuMoins) {
        actualInput = -(actualInput);
    }
    if (SelectedOperator == OneOperator.PourCentage) {
        actualInput = (actualInput / 100);
    }

    if (SelectedOperator == OneOperator.power) {
        actualInput = Math.pow(actualInput, 2);
    }

    if (SelectedOperator == OneOperator.power2) {
        actualInput = Math.pow(actualInput, 2);
    }

    if (SelectedOperator == OneOperator.XhochY) {
        document.getElementById("exponent").style.visibility = 'visible';
        IsExpHoch = true;
        firstNbre = actualInput;
        //var a = (<HTMLSelectElement>document.getElementById("exponent")).value;
        // if (isNaN(nbre)) return;
//alert("bjr");
        /** var numb1: number = Number("<input type=\"text\" placeholder=\"nummer eingeben\" id=\"ok" + "\"'>");
         var numb2 = Number("<input type='button' value='submit' id='ex'>");
         var numb3=numb1+numb2;
         alert(numb3);

         //var t=(<HTMLSelectElement>document.getElementsByTagName("inp");
         result = Math.pow(nbre, numb1);
         */

    }
    (<HTMLSelectElement>document.getElementById("result")).value = IsExpHoch ? "" : actualInput.toString();

}


/**
 * zb 2+2+8
 * @constructor
 */
function IsInputCorrect(): boolean {
    var operation = (<HTMLSelectElement>document.getElementById("result")).value;
    return true;
}

function SendOperation(operation): number {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/calculator/add', false);
    xhr.setRequestHeader("Content-type", "application/json");
    var result: number = null;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //string converti en object
            var x1 = JSON.parse(xhr.response);

            result = x1.wert;
        } else result = NaN;

    };
    var data = JSON.stringify({"operation": operation});
    xhr.send(data);
    while (result == null)
        continue;
    return result;
}

function f(val) {
    (<HTMLSelectElement>document.getElementById("result")).value += val;
}

function getInput(): number {
    if (!IsInputCorrect()) return;
    var opeResult: number = NaN;
    var operation = (<HTMLSelectElement>document.getElementById("result")).value;
    //operation ist zb 5+5+2--> wenn es gültig ist oder ein operato enthält
    if (operation.indexOf("+") >= 0 ||
        operation.indexOf("-") >= 0 ||
        operation.indexOf("*") >= 0 ||
        operation.indexOf("/") >= 0)
    //dann Sendeoperator return was der server uns zuruck geschickt hat zb 2+2+1= 5
    //dann operesult enthält das endergebnis
        opeResult = SendOperation(operation);
    return isNaN(opeResult) ? Number(operation.toString()) : opeResult;
}

function solve() {
    if (IsExpHoch) {
        let secondNbre: number = getInput();
        var result: number = Math.pow(firstNbre, secondNbre);
        (<HTMLInputElement>document.getElementById("result")).value = result.toString();
        IsExpHoch = false;
        firstNbre = NaN;
        document.getElementsByTagName("span")[0].setAttribute("class","dodo");
        //return;

    } else (<HTMLInputElement>document.getElementById("result")).value = getInput().toString();

    /*
     let x = (<HTMLInputElement>document.getElementById("result")).value;
     var xhr = new XMLHttpRequest();
     xhr.open("POST", '/calculator/add', true);
     xhr.setRequestHeader("Content-type", "application/json");
     xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
             //string converti en object
             var x1 = JSON.parse(xhr.response);

             (<HTMLInputElement>document.getElementById("result")).value = x1.wert;
         }

     };

     var data = JSON.stringify({"operation": x});
     xhr.send(data);

     */

}


function back() {
    var value = (<HTMLInputElement>document.getElementById("result")).value;
    (<HTMLInputElement>document.getElementById("result")).value = value.substr(0, value.length - 1);
}


/**
 Je recupere ce que le benutzer a eingeben zb 2+2
 avec eval(2+2) jai le resultat ->4
 dans le textfield qui a pour id result j speichern le resultat
 */


