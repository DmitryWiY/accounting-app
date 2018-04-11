import {Injectable} from "@angular/core";

@Injectable()

export default class JsonToCsv {


  parse(inputData, fileName) {
    let data = inputData;

    let str = "";
    let lineHead = "";
    let line = "";
    let count = 0;

    data.map(function (el) {
      let elData = el;


      for (let a in elData) {
        if (a !== 'guid') {
          if (count === 0) {
            lineHead += '"' + a + '",';
          }

          line += '"' + elData[a] + '",';
        }
      }


      if (count === 0) {
        str += lineHead + '\r\n';
      }

      line = line.slice(0, -1);
      str += line + '\r\n';
      line = '';

      count += 1;

    });

    this.toLink(str, fileName + '.csv');

  }


  toLink(dataToLink, fileName) {
    let blob = new Blob([dataToLink], {type: "text/csv;charset=utf8;"});

    let link = document.createElement("a");
    link.setAttribute("href", window.URL.createObjectURL(blob));
    link.setAttribute("class", 'export');
    link.setAttribute("download", fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

