# brmasker-ionic

[![GitHub issues](https://img.shields.io/github/issues/amarkes/br-masker-ionic-3.svg)](https://github.com/amarkes/br-masker-ionic-3/issues)
[![GitHub stars](https://img.shields.io/github/stars/amarkes/br-masker-ionic-3.svg)](https://github.com/amarkes/br-masker-ionic-3/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/amarkes/br-masker-ionic-3.svg)](https://github.com/amarkes/br-masker-ionic-3/network)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/amarkes/br-masker-ionic-3/master/LICENSE)
[![Build Status](https://travis-ci.org/amarkes/brmasker-ionic.svg?branch=master)](https://travis-ci.org/amarkes/br-masker-ionic-3)


return custom mask in input for ionic 3

# Required
- node v8.2.1 or up
- npm 5.3.0 or up
- ionic 3.9.2

# install

```sh
npm install brmasker-ionic-3 --save
```

### HTML

### correct usage

```html
<ion-item>
	<ion-input type="text" name="cpf" placeholder="CPF" [brmasker]="{mask:'000.000.000-00', len:14}"></ion-input>
</ion-item>
```

### usage in input

```html
<input type="text" name="cpf" placeholder="CPF" [brmasker]="{mask:'000.000.000-00', len:14}" value="">
```

# Module

```javascript
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  imports: [
    BrMaskerModule
  ],
})

```

# Inputs

* brmasker: BrModel

```js
	BrModel = {
	 mask: string;
	 len: number;
	 money: boolean;
	 phone: boolean;
	 person: boolean;
	}
```


| Name | type | info |
| ------ | ------ | ------ |
| mask | string | Optional |
| len | string | Optional |
| money | boolean | Optional |
| phone | boolean | Optional |
| person | boolean | Optional |

### Exemple for CPF/CNPJ `999.999.999-99` / `99.999.999/9999-99`



```html
<ion-item>
	<ion-input type="text" name="cpf" placeholder="CPF/CNPJ" [brmasker]="{person: true}"></ion-input>
</ion-item>
```

### usage in input

```html
<input type="text" name="cpf" placeholder="CPF/CNPJ" [brmasker]="{person: true}" value="">
```

### Exemple for Real `999,99`



```html
<ion-item>
	<ion-input type="text" name="money" placeholder="(R$) Real" [brmasker]="{money: true}"></ion-input>
</ion-item>
```

### usage in input

```html
<input type="text" name="money" placeholder="(R$) Real" [brmasker]="{money: true}" value="">
```

### Exemple for Phone `(99) 9999-9999` / `(99) 99999-9999`



```html
<ion-item>
	<ion-input type="text" name="phone" placeholder="Phone" [brmasker]="{phone: true}"></ion-input>
</ion-item>
```

### usage in input

```html
<input type="text" name="phone" placeholder="Phone" [brmasker]="{phone: true}" value="">
```



# Characters

`- . / ( ) , * + @ # $ & %`



### data
```html
[brmasker]="{mask:'00/00/0000', len:10}"
```
### cep
```html
[brmasker]="{mask:'00.000-000', len:10}"
```

### custom cpf
```html
[brmasker]="{mask:'000.000.000-00', len:14}"
```

### custom cnpj
```html
[brmasker]="{mask:'00.000.000/0000-00', len:18}"
```

### custom telefone
```html
[brmasker]="{mask:'(00) 0000-0000', len:14}"
```

### custom whatsapp
```html
[brmasker]="{mask:'(00) 00000-0000', len:15}"
```



# Build for developer

### Only use if you change the component

### Build

```sh
npm run build
```

### Publish

```sh
npm publish
```

# Changelog

### v1.0.3

- Updating devdependencies

### v1.0.2

- fix number in phone and person

### v1.0.1

- fix compiler project for npm

### v1.0.0

- Suport reactive form
