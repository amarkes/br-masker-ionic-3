import { Directive, Input, HostListener } from '@angular/core';
@Directive({
  selector: '[brmasker]' // Attribute selector
})
export class BrMaskerIonic3 {
  @Input('brmasker') brmaskere: any;
  @Input() money: boolean = false;
  @Input() phone: boolean = false;
  @Input() person: boolean = false;
  @HostListener('keyup', ['$event'])
  inputChanged(event: any): void {
    if (event.target.value) {
      if (this.money) {
        event.target.value = this.moneyMask(this.onInput(event.target.value));
        return;
      }
      if (this.phone) {
        event.target.value = this.phoneMask(event.target.value);
        return;
      }
      if (this.person) {
        event.target.value = this.peapollMask(event.target.value);
        return;
      }
      event.target.value = this.onInput(event.target.value);
    }
  }
  constructor() {
  }
  private phoneMask(v: any): void {
    if (v.length > 14) {
      this.brmaskere.mask = '(99) 99999-9999';
    } else {
      this.brmaskere.mask = '(99) 9999-9999';
    }
    return this.onInput(v);
  }
  private peapollMask(v: any): void {
    if (v.length > 14) {
      this.brmaskere.mask = '99.999.999/9999-99';
    } else {
      this.brmaskere.mask = '999.999.999-99';
    }
    return this.onInput(v);
  }
  private moneyMask(v: any): string {
    let tmp = v;
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    return tmp;
  }
  private onInput(value: any): void {
    const ret = this.formataCampo(value, this.brmaskere.mask, this.brmaskere.len);
    return ret;
    // if (ret) {
    //   this.element.nativeElement.value = ret;
    // }
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any {
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%| /g;
    const campoSoNumeros = campo.toString().replace( exp, '' );
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara  = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') );
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
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
