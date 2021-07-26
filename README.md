[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [<img src="https://img.shields.io/badge/View-Website-blue">](https://coffee-chain-deploy-cfc.mybluemix.net/) [<img src="https://img.shields.io/badge/View-Video-red">](https://www.youtube.com/watch?v=7i7022EzN-0)


# Coffee Chain

<img src="https://i.ibb.co/pfGfzkL/logos.png" width=300> 

#### Marketplace with digital payment systems, which provides traceability and digital certificates based on Blockchain.

WebPage: https://coffee-chain-deploy-cfc.mybluemix.net/

#### Click here to watch our demo video:

[<img src="https://raw.githubusercontent.com/altaga/SCUP-WWAC/master/Images/click-here-button.png" width=200>](https://coffee-chain-deploy-cfc.mybluemix.net/)



<details>
  <summary>INDEX Click Here</summary>

- [CoffeeChain-CFC](#coffeechain-cfc)
- [Welcome to Coffee Chain:](#welcome-to-coffee-chain)
- [Problem:](#problem)
- [Solution:](#solution)
  - [DEMO:](#demo)
  - [How it Works:](#how-it-works)
  - [Cloudant:](#cloudant)
  - [API and Actions:](#api-and-actions)
  - [Chatbot:](#chatbot)
  - [Toolchain (CI/CD):](#toolchain-cicd)
  - [Solana Blockchain Integration:](#solana-blockchain-integration)
  - [Rapyd Integration:](#rapyd-integration)
- [Deployment/Traction:](#deploymenttraction)

</details>

# Welcome to Coffee Chain:

We are a platform where you can buy authentic, socially responsible and 100% organic products, validated and tracked by blockchain.

This is our submission for the call for code global challenge 2021 that aims to address the global challenge of hunger.


Let’s go through the problem, which is very near to the team as it is in our own country.

Mexico among a population of 127 Million has 28 of those suffering from hunger and 11 in extreme hunger. More than half which are from indigenous populations.

Economic growth is a key to alleviate that hunger, and already in these communities there's a plethora of agronomic cooperatives eager to sell their products. 

But they have several challenges, one of the most important ones that we can even see in one of their logos is actually to have a fair trade.

And that’s one of the biggest ones as we found out that most of these cooperatives have no electronic commerce and their products are being sold on other platforms in which case this does not reach the producers, indeed breaking fair trade which is devastating to those communities.

Now, what does a consumer seek in a brand?

The modern consumer seeks products that are:

Socially Responsible
Organic
Healthy
Sustainable
But mainly….
That they generate trust

Trust is determinant in a social setting as we can see from this example from Nike related to a very social cause.

Then our goal is to make a platform that HELPS producers by increasing consumer confidence and enhancing fair trade.

# Traction:

We have already taken some steps on that front by:

Reaching out to a cooperative and get to know its pain points.
Formed a commercial bond with them.
Build a prototype and work together to launch it.

The cooperative in this case is one named Obio that works in southeast Mexico and it is backed by one of the largest banks in our country and the world.



# Validation

Now this kind of idea has already reached several places and markets around the world such as the wine industry, beauty and others and it is heavily deployed by walmart china. But it has not been deployed in a social-responsible first project.

Having said this, we seek that our certificates guarantee that the purchase benefits whoever produces it.

Thank you.


# Solution:

## DEMO:

Video: Click on the image
[![DEMO](./Images/logo.png)](https://www.youtube.com/watch?v=fDPsVpeqT7I)

## How it Works:

Toda la plataforma estab primordialmente basada en servicios de IBM Cloud.

<img src="./Images/diagram.png" width="80%">

1. La aplicacion almacena los datos de los productos mediante una DB Cloudant.[Details](#cloudant)
2. La base de datos es leida por la pagina web a travez de una API ejecuta una Cloud Function basada en Python para realizar el Query de la DB.[Details](#api-and-actions)
3. Nostros Embed el chabot en el website a travez de la la Web Chat integration de IBM como un scipt.[Details](#chatbot)
4. La pagina web esta desplegada mediante un el ciclo de CI/CD gracias a una IBM toolchain.[Details](#toolchain-cicd)
5. La pagina verifica el provenance de los productos al leer los datos en la red de Solana.[Details](#solana-blockchain-integration)
6. La aplicacion puede realizar el checkout del carrito mediante las API's de Rapyd.[Details](#rapyd-integration)

NOTA: Si deseas replicar este proyecto requieres tener una cuenta activa en IBM Cloud.

[IBM Cloud Create Account](https://cloud.ibm.com/registration)

## Cloudant:

Por facilidad y rapidez de implementacion, se decidio que una base de datos no relacional era lo ideal para este proyecto y para almacenar los productos de la plataforma.

La base de datos fue proporcionada por la empresa [Obio](https://www.obioorganico.com/), los productos mostrados en la plataforma son productos reales de productores mexicanos.

<img src="./Images/db.png">

Los documentos guardados en la DB de los productos son los siguientes.

<img src="./Images/db-product.png">

## API and Actions:

Para poder consumir la base de datos en la pagina web de forma segura se implemento una API.

<img src="./Images/api.png">

Cada ruta de la api esta ligada a una action, la cual tiene como fin obtener toda la base de datos u obtener solo una parte con un query, ambas se implementaron con un runtime Python 3.7 gracias a su facilidad de uso, dejamos el ejemplo de como realizamos el query de una parte de la DB.

/getDB-label

    from ibmcloudant.cloudant_v1 import CloudantV1
    from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

    authenticator = IAMAuthenticator('XXXXXXAPI_KEYXXXXXX')

    service = CloudantV1(authenticator=authenticator)

    service.set_service_url('https://XXXXX-XXXXXXXx-XXXXXX-XXXXXX-bluemix.cloudantnosqldb.appdomain.cloud')

    def main(params):
    response = service.post_find(
        db='products',selector={
        "_id": {
            "$gt": "0"
        },
        "labels": {
            "$eq": params["__ow_headers"]["label"]
        }
    },
        fields=["code", "name","brand","classs","price","weight","description","stock","origin","details","images","labels"]
    ).get_result()

    return({"data":response["docs"]})

Esta API es ejecutada cada vez que seleccionamos en la aplicacion una categoria de productos.

<img src="./Images/selectp.png">

Si seleccionamos por ejemplo la honey, la action realizara solo el query de los productos que tengan como label honey.

<img src="./Images/honey.png">

## Chatbot:

El chatbot fue completamente implementado mediante Watson assistant.

<img src="./Images/assistant.png">

Este esta desplegado en la pagina web y puedes probarlo sin ningun problema.

<img src="./Images/webassistant.png">

Tiene como funciones principales dar informacion sobre las marcas de cafe.

- Para activar este Intent porfavor esciba en el chatbot alguna de las siguientes frases o similares.

  - Ask for coffee information
  - I want information about a coffee
  - Coffee information

<img src="./Images/info.png">

Otra de sus funciones es realizar un test para obtener el cafe ideal segun tus gustos.

- Para activar este Intent porfavor esciba en el chatbot alguna de las siguientes frases o similares.

  - Coffee test
  - I want to know my favorite coffee
  - Test

<img src="./Images/test.png">

## Toolchain (CI/CD):

Para poder desplegar la pagina y que pudiera ser utilizada por cualquier persona en el mundo se desplego siguiendo la metodologia CI/CD gracias a una toolchain de IBM.

<img src="./Images/CC-deploy.png">

Todo el control de versiones se realizo mediante un repositorio alojado en IBM.

<img src="./Images/orion.png">

Todo el desarrollo del frontend fue realizado con el framework ReactJS.

[WebPage](https://github.com/altaga/CoffeeChain-CFC/tree/main/Website)

## Solana Blockchain Integration:

La pagina web puede leer los datos directamente de la blockchain de solana para buscar el registro de cada prodcuto mediante su signature, el cual esta encoding en un QR para poderlo leer facilmente con la plataforma.

<img src="./Images/solana.png">

La lectura y escritura sobre la blockchain se hace atravez de la API de Solana.

explorer-api.devnet.solana.com

Esta seccion de la pagina tiene 3 secciones fundamentales.

- El escaner de los codigos QR.

<img src="./Images/scan.png" width="50%">

- La informacion cargada desde la blockchain, la cual incluye los checkpoints, imagen, marca y demas informacion relacionada con el producto
  
<img src="./Images/infos.png" width="50%">

- El mapa que tiene como fin poder ver las ubicaciones donde ha estado el producto haciendo checkpoint en la cadena de distribucion, ademas sobre el tendremo un link al explorer de la blockchain para poder ver la informacion cargada en ella directamente, cabe decir que esta informacion es permanente e imposible de cambiar.

<img src="./Images/blockinfo.png" width="50%">

Aqui te dejamos el QR de uno de los productos para que puedas revisarlo tu mismo.

<img src="./Images/product.jpeg">

## Rapyd Integration: 

El checkout de Rapyd es una de las partes mas importantes de el marketplace, ya que le da la capacidad de poder realizar pagos con dinero real para poder comprar los productos, en este caso la API que implementamos en la plataforma fue la de poder realizar el Checkout de los productos.

En ese caso la api es ejecutada una vez hemos terminado de seleccionar los productos y presionamos el boton de Checout.

<img src="./Images/cart.png">

Podemos ver que una vez preisonamos el boton de Checkout nos lleva dorectamente a la plagina de Checkout que nos da Rapyd.

<img src="./Images/check.png">

Como parte de la implementacion de Rapyd podemos facilmente seleccionar y agregar todos los metodos de pago que creamos convenientes para nuestro negocio.

<img src="./Images/method.png">


