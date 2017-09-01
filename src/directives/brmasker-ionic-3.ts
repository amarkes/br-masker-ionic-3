import { Directive, Input, HostListener, ElementRef } from '@angular/core';

/**
 * Generated class for the BrmaskerIonic_3Directive directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[brmasker]' // Attribute selector
})
export class BrMaskerIonic3 {
  @Input('brmasker') brmaskere: any;
  @HostListener('keyup', ['$event'])
  inputChanged(event: any): void {
    if (event.target.value) {
      this.onInput(event.target.value);
    }
  }
  constructor(private element: ElementRef) {
  }
  private onInput(value: any): void {
    const ret = this.formataCampo(value, this.brmaskere.mask, this.brmaskere.len);
    
    if (ret) {
      this.element.nativeElement.value = ret;
    }
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any {
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\R|\$|\&|\%| /g;
    const campoSoNumeros = campo.toString().replace( exp, '' );
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara  = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === 'R'));
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
