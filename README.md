# brmasker-ionic

[![GitHub issues](https://img.shields.io/github/issues/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/br-masker-ionic-3/issues)
[![GitHub stars](https://img.shields.io/github/stars/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/br-masker-ionic-3/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/amarkes/brmasker-ionic.svg)](https://github.com/amarkes/br-masker-ionic-3/network)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/amarkes/brmasker-ionic/master/LICENSE)
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
# Characters

`- . / ( ) , * + @ # R$ $ & %`

# Guide

[brmasker]="{mask:'000.000.000-00', len:14}"

[brmasker] = component receive array (mask, len)

mask --> required / default = '' / custom mask

len --> required / default = 0 / number of length

### data
```html
[brmasker]="{mask:'00/00/0000', len:10}"
```
### cep
```html
[brmasker]="{mask:'00.000-000', len:10}"
```

### cpf
```html
[brmasker]="{mask:'000.000.000-00', len:14}"
```

### cnpj
```html
[brmasker]="{mask:'00.000.000/0000-00', len:18}"
```

### telefone
```html
[brmasker]="{mask:'(00) 0000-0000', len:14}"
```

### whatsapp
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