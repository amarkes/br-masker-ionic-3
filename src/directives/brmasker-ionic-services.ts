import { Directive, OnInit, Injectable } from '@angular/core';

export class BrMaskServicesModel {
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  money: boolean;
  percent: boolean;
  type: 'alfa' | 'num' | 'all' = 'alfa';
  decimal: number = 2;
  decimalCaracter: string = `,`;
  thousand: string;
  userCaracters: boolean = false;
  numberAndTousand: boolean = false;
}

@Directive({
  selector: '[brmasker]',
})

@Injectable()
export class BrMaskerIonicServices3 implements OnInit {
  brmasker: BrMaskServicesModel = new BrMaskServicesModel();
  constructor() {
  }

  ngOnInit(): void {
    if (!this.brmasker.type) {
      this.brmasker.type = 'all';
    }

    if (!this.brmasker.decimal) {
      this.brmasker.decimal = 2;
    }

    if (!this.brmasker.decimalCaracter) {
      this.brmasker.decimalCaracter = ',';
    }
  }



  writeCreateValue(value: string, config: BrMaskServicesModel = new BrMaskServicesModel()): string {
    if (value && config.phone) {
      return value.replace(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/gi, '$1 ($2) $3-$4');
    }
    if (value && config.money) {
      return this.writeValueMoney(value, config);
    }
    if (value && config.person) {
      return this.writeValuePerson(value);
    }

    if (value && config.percent) {
      return this.writeValuePercent(value);
    }

    if (value && config.numberAndTousand) {
      return this.writeValueNumberAndThousand(value);
    }

    if (value && config.userCaracters) {
      return this.writeValueusingSpecialCharacters(value);
    }

    if (value && config.mask) {
      this.brmasker.mask = config.mask;
      if (config.len) {
        this.brmasker.len = config.len;
      }
      return this.onInput(value);
    }
    return value;
  }

  writeValuePercent(value: string): string {
    value.replace(/\D/gi, '');
    value.replace(/%/gi, '');
    return value.replace(/([0-9]{0})$/gi, '%$1');
  }

  writeValuePerson(value: string): string {
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, '\$1.\$2.\$3\-\$4');
    } else {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, '\$1.\$2.\$3\/\$4\-\$5');
    }
  }

  writeValueMoney(value: string, config: BrMaskServicesModel = new BrMaskServicesModel()): string {
    return this.moneyMask(value, config);
  }

  writeValueNumberAndThousand(value: string, config: BrMaskServicesModel = new BrMaskServicesModel()): string {
    return this.thousand(value);
  }

  writeValueusingSpecialCharacters(value: string, config: BrMaskServicesModel = new BrMaskServicesModel()): string {
    return this.usingSpecialCharacters(value, config.mask, config.len);
  }


  private moneyMask(value: any, config: BrMaskServicesModel): string {
    const decimal = config.decimal || this.brmasker.decimal;

    value = value
      .replace(/\D/gi, '')
      .replace(new RegExp("([0-9]{" + decimal + "})$", "g"), config.decimalCaracter + '$1');

    if (value.length === decimal + 1) {
      return "0" + value; // leading 0 so we're not left with something weird like ",50"
    } else if (value.length > decimal + 2 && value.charAt(0) === '0') {
      return value.substr(1); // remove leading 0 when we don't need it anymore
    }
    if (config.thousand && value.length > (Number(4) + Number(config.decimal))) {
      value = value.replace(new RegExp(`([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`, `g`), `${config.thousand}$1${config.decimalCaracter}$2`);
    }
    if (config.thousand && value.length > (Number(8) + Number(config.decimal))) {
      value = value.replace(new RegExp(`([0-9]{3})${config.thousand}([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`, `g`), `${config.thousand}$1${config.thousand}$2${config.decimalCaracter}$3`);
    }

    return value;
  }

  private onInput(value: any): string {
    const ret = this.formatField(value, this.brmasker.mask, this.brmasker.len);
    return ret;
  }

  private thousand(value: string): string {
    let val = value.replace(/\D/gi, '');
    const reverse = val.toString().split('').reverse().join('');
    const thousands = reverse.match(/\d{1,3}/g);
    val = thousands.join(`${this.brmasker.thousand || '.'}`).split('').reverse().join('');
    return val;
  }

  private usingSpecialCharacters(campo: string, Mascara: string, tamanho: number): string {
    if (!tamanho) { tamanho = 99999999999; }
    let boleanoMascara;
    const exp = /\-|\.|\,| /gi;
    const campoSoNumeros = campo.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === ','));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

  private formatField(campo: string, Mascara: string, tamanho: number): any {
    if (!tamanho) { tamanho = 99999999999; }
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
    const campoSoNumeros = campo.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === ':'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

}
