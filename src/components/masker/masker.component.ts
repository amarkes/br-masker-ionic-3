import { Component, Input, Directive, forwardRef, Renderer, ElementRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    //'(blur)': '_onTouched()'
  },
  selector: '[brmasker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskerDirective),
    multi: true
  }]
})
export class MaskerDirective {
  constructor(private renderer: Renderer, private element: ElementRef) {}
  @Input('brmasker') brmaskere: any;
  private onInput(value): void {
    let ret = this.formataCampo(value, this.brmaskere.mask, this.brmaskere.len);
    if (ret) {
      if(this.element.nativeElement.getElementsByTagName('INPUT')[0]){
        this.element.nativeElement.getElementsByTagName('INPUT')[0].value = ret;
      } else {
        this.element.nativeElement.value = ret;
      }
    }
  }
  private formataCampo(campo: string, Mascara: string, tamanho: number): any { 
    var boleanoMascara; 
    var exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\R|\$|\&|\%| /g;
    let campoSoNumeros = campo.toString().replace( exp, "" ); 
    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;
    for(let i=0; i< TamanhoMascara; i++) { 
      if(i < tamanho) {
        boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == "/")); 
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == ",") || (Mascara.charAt(i) == "*") || (Mascara.charAt(i) == "+"));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "@") || (Mascara.charAt(i) == "#") || (Mascara.charAt(i) == "R"));
        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "$") || (Mascara.charAt(i) == "&") || (Mascara.charAt(i) == "%"));
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

