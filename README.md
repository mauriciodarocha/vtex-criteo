VTEX CRITEO
===========

Plugins para instalação das Tags Criteo.

##Início

**Antes de iniciar, é importante saber:**

* Cada arquivo javascript tem sua(s) página(s) específica(s). Estes arquivos devem ser copiados para o seu ambiente da loja VTEX. Na dúvida, copie todos. Veja a descrição de cada arquivo abaixo.
* São necessários os 3 números de identificação que veem descritos na documentação do CRITEO para utilização destes plugins.

##Sumário dos passos para instalação

* Copiar os arquivos para a loja.
    * (Acessar admin > Configurações > Página de Vitrine > "sua loja" > Gerenciamento de arquivos) 
* Carregar os arquivos (javascript) para suas páginas. 
    * Veja instalação por template ou por javascript abaixo.
* Inicializar o plugin. 
    * Cada plugin para sua respectiva página.

##Descrição de cada arquivo

**criteo_ld.js**
* É descrito na documentação da CRITEO como "Loader URL". Este arquivo vai conectar-se ao sistema da CRITEO para o envio das informações coletadas nas páginas da sua loja.

**criteo_home.js**
* É o plugin destinado as páginas "home" de sua loja. Para utilizá-lo leia seção "como usar".

**criteo_product.js**
* É o plugin destinado a página "produto" (detalhes do produto) de sua loja. Para utilizá-lo leia seção "como usar".

**criteo_checkout.js**
* É o plugin destinado a página do "carrinho" e do "fechamento do pedido" de sua loja. Para utilizá-lo leia seção "como usar".


##Como usar

O primeiro passo é fazer com que a página carregue os arquivos necessários para sua utilização. Há 2 maneiras para que isso seja feito, **alterando o template da página** ou **carregando por javascript** os plugins da página em questão.
Depois é necessário iniciar o plugin da página. Cada plugin tem sua própria inicialização.

---
###Alterando o template da página
* abra o template e cole o código...

...para home:
```html
<script type="text/javascript" src="/arquivos/criteo_home.js"></script>
```

...para página de produto (detalhe do produto):
```html
<script type="text/javascript" src="/arquivos/criteo_product.js"></script>
```

...para o carrinho e fechamento do pedido:

**Não é possível, pois a página é uma página de sistema. Veja abaixo, carregando por javascript.**

---
###Carregando por javascript

Antes de iniciar, você irá precisar dos 3 números que estão no manual do CRITEO que é enviado para cada cliente. O primeiro número é o id de identificação do cliente para o CRITEO, e os 2 outros números são dos widget 1 e widget 2 respectivamente.

* abra o javascript da página que deseja instalar e cole o código... **(Faça a alteração dos números)**

...para home:
```javascript
if(typeof jQuery.criteo_home=="undefined")
    jQuery.getScript('/arquivos/criteo_home.js',function(){
        jQuery.criteo_home({
            id: 000,
            widget_id1: 111,
            widget_id2: 222
        });
    });
else
    jQuery.criteo_home({
        id: 000,
        widget_id1: 111,
        widget_id2: 222
    });
```

...para página de produto (detalhe do produto):
```javascript
if(typeof jQuery.criteo_product=="undefined")
    jQuery.getScript('/arquivos/criteo_product.js',function(){
        jQuery.criteo_product({
            id: 000,
            widget_id1: 111,
            widget_id2: 222
        });
    });
else
    jQuery.criteo_product({
        id: 000,
        widget_id1: 111,
        widget_id2: 222
    });
```

...para o carrinho e fechamento do pedido: (arquivo user.js)
```javascript
jQuery(document).ready(function() {
    if(jQuery("body").hasClass("carrinho")||jQuery("body").hasClass("checkout","finaliza-compra"))
        if(typeof jQuery.criteo_checkout=="undefined")
            jQuery.getScript('/arquivos/criteo_checkout.js',function(){
                jQuery.criteo_checkout({
                    id: 000,
                    widget_id1: 111,
                    widget_id2: 222
                });
            });
        else
            jQuery.criteo_checkout({
                id: 000,
                widget_id1: 111,
                widget_id2: 222
            });
});
```

**Atenção:** Não se esqueça de alterar os números 000 = id do cliente para CRITEO, 111 = widget 1, 222 = widget 2. Veja o manual da CRITEO para obter estes números.

##Inicializando o plugin

Se você utilizou a opção "Carregando por javascript", seu trabalho já está completo.

Se você optou por alterar os templates nas páginas "home" e "produto" (detalhes do produto), você ainda tem que inicializar o plugin.

* copie o código de javascript para inicializar o plugin... **(Faça a alteração dos números)**

...para home:
```javascript
jQuery.criteo_home({
    id: 000,
    widget_id1: 111,
    widget_id2: 222
});
```

...para página de produto (detalhe do produto):
```javascript
jQuery.criteo_product({
    id: 000,
    widget_id1: 111,
    widget_id2: 222
});
```

...para o carrinho e fechamento do pedido:

**Como a página do carrinho e o fechamento do pedido são página dos sistema, você deve ter utilizado "Carregando por javascript". Portanto, o plugin já é carregado e inicializado. Não há nada a ser feito.**

---
**Atenção:** Os códigos de javascript, devem ser copiados para arquivos .js, ou dentro do template entre as tags `<script type="text/javascript">` e `</script>`, senão não funcionaram.

---
