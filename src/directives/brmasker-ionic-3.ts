import { Directive, Input, HostListener, OnInit, ElementRef, Renderer} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export class BrModel {
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  money: boolean;
}

@Directive({
  selector: '[brmasker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: BrMaskerIonic3,
    multi: true
  }]
})
export class BrMaskerIonic3 implements OnInit, ControlValueAccessor {
  @Input() brmasker: BrModel = new BrModel();
  @HostListener('keyup', ['$event'])
  inputKeyup(event: any): void {
      event.target.value = this.returnValue(event.target.value);
  }
  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
  }
  ngOnInit(): void {
  }
  writeValue(fn: any): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', this.returnValue(fn));
  }
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  returnValue(value: string): any {
    if (!this.brmasker.mask) { this.brmasker.mask = ''; }
    if (value) {
      if (this.brmasker.money) {
        return this.moneyMask(this.onInput(value));
      }
      if (this.brmasker.phone) {
        return this.phoneMask(value);
      }
      if (this.brmasker.person) {
        return this.peapollMask(value);
      }
      return this.onInput(value);
    } else {
      return '';
    }
  }
  private phoneMask(v: any): void {
    if (v.length > 14) {
      this.brmasker.len = 15;
      this.brmasker.mask = '(99) 99999-9999';
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '(99) 9999-9999';
    }
    return this.onInput(v);
  }
  private peapollMask(v: any): void {
    if (v.length > 14) {
      this.brmasker.len = 18;
      this.brmasker.mask = '99.999.999/9999-99';
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '999.999.999-99';
    }
    return this.onInput(v);
  }
  private moneyMask(v: any): string {
    let tmp = v;
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    return tmp;
  }
  private onInput(value: any): void {
    const ret = this.formataCampo(value, this.brmasker.mask, this.brmasker.len);
    return ret;
    // if (ret) {
    //   this.element.nativeElement.value = ret;
    // }
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any {
    if (!tamanho) { tamanho = 99999999999 ; }
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%| /g;
    const campoSoNumeros = campo.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#'));
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
