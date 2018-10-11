import { Directive, Input, HostListener, OnInit, ElementRef, Renderer, Injectable } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class BrMaskModel {
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  phoneNotDDD: boolean;
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BrMaskerIonic3,
      multi: true
    }]
})

@Injectable()
export class BrMaskerIonic3 implements OnInit, ControlValueAccessor {
  @Input() brmasker: BrMaskModel = new BrMaskModel();

  @HostListener('keyup', ['$event'])
  inputKeyup(event: any): void {
    const value = this.returnValue(event.target.value);
    this.writeValue(value);
    event.target.value = value;
  }

  @HostListener('ionBlur', ['$event'])
  inputOnblur(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;
  }

  @HostListener('ionFocus', ['$event'])
  inputFocus(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;

  }

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
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

  writeValue(fn: any): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', fn);
  }

  registerOnChange(fn: any): void {
    return;
  }

  registerOnTouched(fn: any): void {
    return;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'true');
    } else {
      this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'false');
    }
  }

  writeCreateValue(value: string, config: BrMaskModel = new BrMaskModel()): any {
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

  writeValueMoney(value: string, config: BrMaskModel = new BrMaskModel()): string {
    return this.moneyMask(value, config);
  }



  returnValue(value: string): any {
    if (!this.brmasker.mask) { this.brmasker.mask = ''; }
    if (value) {
      let v = value;
      if (this.brmasker.type == 'alfa') {
        v = v.replace(/\d/gi, '');
      }
      if (this.brmasker.type == 'num') {
        v = v.replace(/\D/gi, '');
      }

      if (this.brmasker.money) {
        return this.moneyMask(this.onInput(v), this.brmasker);
      }
      if (this.brmasker.phone) {
        return this.phoneMask(v);
      }
      if (this.brmasker.phoneNotDDD) {
        return this.phoneNotDDDMask(v);
      }
      if (this.brmasker.person) {
        return this.peapollMask(v);
      }
      if (this.brmasker.percent) {
        return this.percentMask(v);
      }
      if (this.brmasker.numberAndTousand) {
        return this.thousand(v);
      }
      if (this.brmasker.userCaracters) {
        return this.usingSpecialCharacters(v, this.brmasker.mask, this.brmasker.len);
      }
      return this.onInput(v);
    } else {
      return '';
    }
  }

  private percentMask(v: any): void {
    let tmp = v;
    tmp = tmp.replace(/\D/gi, '');
    tmp = tmp.replace(/%/gi, '');
    tmp = tmp.replace(/([0-9]{0})$/gi, '%$1');
    return tmp;
  }

  private phoneMask(v: any): void {
    let n = v;
    if (n.length > 14) {
      this.brmasker.len = 15;
      this.brmasker.mask = '(99) 99999-9999';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{2})(\d)/gi, '$1 $2');
      n = n.replace(/(\d{5})(\d)/gi, '$1-$2');
      n = n.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '(99) 9999-9999';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{2})(\d)/gi, '$1 $2');
      n = n.replace(/(\d{4})(\d)/gi, '$1-$2');
      n = n.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(n);
  }

  private phoneNotDDDMask(v: any): void {
    let n = v;
    if (n.length > 9) {
      this.brmasker.len = 10;
      this.brmasker.mask = '99999-9999';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{5})(\d)/gi, '$1-$2');
      n = n.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.brmasker.len = 9;
      this.brmasker.mask = '9999-9999';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{4})(\d)/gi, '$1-$2');
      n = n.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(n);
  }

  private peapollMask(v: any): void {
    let n = v;
    if (n.length > 14) {
      this.brmasker.len = 18;
      this.brmasker.mask = '99.999.999/9999-99';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{2})(\d)/gi, '$1.$2');
      n = n.replace(/(\d{3})(\d)/gi, '$1.$2');
      n = n.replace(/(\d{3})(\d)/gi, '$1/$2');
      n = n.replace(/(\d{4})(\d{1,4})$/gi, '$1-$2');
      n = n.replace(/(\d{2})(\d{1,2})$/gi, '$1$2');
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '999.999.999-99';
      n = n.replace(/\D/gi, '');
      n = n.replace(/(\d{3})(\d)/gi, '$1.$2');
      n = n.replace(/(\d{3})(\d)/gi, '$1.$2');
      n = n.replace(/(\d{3})(\d{1,2})$/gi, '$1-$2');
    }
    return this.onInput(n);
  }

  private moneyMask(value: any, config: BrMaskModel): string {
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

  private onInput(value: any): void {
    const ret = this.formatField(value, this.brmasker.mask, this.brmasker.len);
    return ret;
    // if (ret) {
    //   this.element.nativeElement.value = ret;
    // }
  }

  private thousand(value: string): string {
    let val = value.replace(/\D/gi, '');
    const reverse = val.toString().split('').reverse().join('');
    const thousands = reverse.match(/\d{1,3}/g);
    if (thousands) {
        return thousands.join(`${this.brmasker.thousand || '.'}`).split('').reverse().join('');
    }
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
