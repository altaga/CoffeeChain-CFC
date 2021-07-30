[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [<img src="https://img.shields.io/badge/View-Website-blue">](https://coffee-chain-deploy-cfc.mybluemix.net/) [<img src="https://img.shields.io/badge/View-Video-red">](https://youtu.be/YXCFy-EfQ7s)


# Coffee Chain

<img src="https://i.ibb.co/pfGfzkL/logos.png" width=300> 

#### Marketplace with digital payment systems, which provides traceability and digital certificates based on Blockchain.

WebPage: https://coffee-chain-deploy-cfc.mybluemix.net/

#### Click here to watch our demo video:

[<img src="https://raw.githubusercontent.com/altaga/SCUP-WWAC/master/Images/click-here-button.png" width=200>](https://youtu.be/YXCFy-EfQ7s)



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

It is a platform where you can buy authentic, socially responsible and 100% organic products, validated and tracked by blockchain.

This is our submission for the call for code global challenge 2021 that aims to address the global challenge of hunger.

Let’s go through the problem, which is very near to the team as it is in our own country.
Mexico among a population of 127 Million has 28 of those suffering from hunger and 11 in extreme hunger. More than half which are from indigenous populations.

<img src="https://i.ibb.co/NTrggwr/mexicohunger.png">

Economic growth is a key to alleviate that hunger, and already in these communities there's a plethora of agronomic cooperatives eager to sell their products. 
But, they have several challenges, one of the most important ones is to have a fair trade.

<img src="https://i.ibb.co/QFDnBJm/Slide4.png">

And that’s one of the biggest ones as we found out that most of these cooperatives have no electronic commerce and their products are being sold on other platforms in which case this does not reach the producers, indeed breaking fair trade which is devastating to those communities.

<img src="https://i.ibb.co/0t97jc9/Slide5.png">

Now, what does a consumer seek in a brand?

The modern consumer seeks products that are:

* Socially Responsible
* Organic
* Healthy
* Sustainable

But mainly….
That they generate trust

Trust is determinant in a social setting as we can see from this example from Nike related to a very social cause.

<img src="https://i.ibb.co/dJLMmTk/Slide9.png">

Then our goal is to make a platform that HELPS producers by increasing consumer confidence and enhancing fair trade.

# Traction:

We have already taken some steps on that front by:

<img src="https://i.ibb.co/HDzgTxX/traction.png">

The cooperative in is named Obio that works in southeast Mexico and it is backed by one of the largest banks in our country and the world.

Here are the links that show social proof of these statements (Sorry, everything is in Spanish):

https://www.talent-republic.tv/imperdible/blank-ganador-indiscutible-del-talent-hackathon-citibanamex-2021/#:~:text=Blank%2C%20ganador%20indiscutible%20del%20Talent%20Hackathon%20Citibanamex%202021


https://www.youtube.com/watch?v=QAhZB9Bro_0


Here is an extra video of the road and our first interview with the players in question:

https://youtu.be/IQ4431EjPZI

More on obio:

https://www.obioorganico.com/obio-y-asociados/



# Validation

<img src="https://i.ibb.co/5h78njw/Slide19.png">


Having said this, we seek that our certificates guarantee that the purchase benefits whoever produces it.

Thank you.


# Solution:

## DEMO:

Video: Click on the image
[![DEMO](./Images/logo.png)](https://www.youtube.com/watch?v=fDPsVpeqT7I)


### From this point on you can find the technical documentation of the Project

## How it Works:

The entire platform was primarily based on IBM Cloud services.

<img src="./Images/diagram.png" width="80%">

1. The application stores the data of the products through a Cloudant database.[Details](#cloudant)
2. The database is read by the web page through an API, it executes a Python-based Cloud Function to perform the DB Query.[Details](#api-and-actions)
3. We embeded the chabot on the website through the IBM Web Chat integration as a scipt.[Details](#chatbot)
4. The web page is deployed through a CI / CD cycle thanks to an IBM toolchain.[Details](#toolchain-cicd)
5. The page verifies the provenance of the products by reading the data in the Solana blockchain.[Details](#solana-blockchain-integration)
6. The application can check out the cart through the Rapyd APIs.[Details](#rapyd-integration)

NOTE: If you want to replicate this project you need to have an active account in IBM Cloud.

[IBM Cloud Create Account](https://cloud.ibm.com/registration)

## Cloudant:

For ease and speed of implementation, it was decided that a non-relational database was ideal for this project and for storing the platform's products.

The database was provided by the cooperative [Obio](https://www.obioorganico.com/), the products displayed on the platform are real products from real Mexican producers.

<img src="./Images/db.png">

The documents stored in the DB of the products are as follows.

<img src="./Images/db-product.png">

## API and Actions:

In order to safely deploy the database on the website, an API was implemented.

<img src="./Images/api.png">

Each route of the API is linked to an action, which aims to obtain the entire database or obtain only a part with a query. Both were implemented with a Python 3.7 runtime because of its ease of use. We leave here an example of how we did the query in a part of the DB.

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

This API is executed every time we select a product category in the application.

<img src="./Images/selectp.png">

If we select, for example, honey, the action will only query the products that have honey as their label.

<img src="./Images/honey.png">

## Chatbot:

The chatbot was fully implemented using Watson assistant.

<img src="./Images/assistant.png">

This is displayed on the website and you can try it without any problem.

<img src="./Images/webassistant.png">

Its main functions are to provide information about coffee brands.

- To activate this Intent, please type one of the following or similar phrases in the chatbot.

  - Ask for coffee information
  - I want information about a coffee
  - Coffee information

<img src="./Images/info.png">

Another one of its functions is to carry out a test to obtain the ideal coffee according to your tastes.

- To activate this Intent, please type one of the following or similar phrases in the chatbot.

  - Coffee test
  - I want to know my favorite coffee
  - Test

<img src="./Images/test.png">

## Toolchain (CI/CD):

In order to display the page and that it could be used by anyone in the world it was deployed following the CI / CD methodology thanks to an IBM toolchain.

<img src="./Images/CC-deploy.png">

All version control was done through a repository hosted by IBM.

<img src="./Images/orion.png">

All frontend development was done with the ReactJS framework.

[WebPage](https://github.com/altaga/CoffeeChain-CFC/tree/main/Website)

## Solana Blockchain Integration:

The website can read the data directly from the solana blockchain to find the record of each product through its signature, which is encoded in a QR to be able to read it easily with the platform.

<img src="./Images/solana.png">

Reading and writing on the blockchain is done through the Solana API.

explorer-api.devnet.solana.com

This section of the page has 3 fundamental sections.

- The QR code scanner.

<img src="./Images/scan.png" width="50%">

- The information loaded from the blockchain, which includes the checkpoints, image, brand and other information related to the product:
  
<img src="./Images/infos.png" width="50%">

- The map that aims to be able to see the locations where the product has been by checking the distribution chain, in addition to it we will have a link to the blockchain explorer to be able to see the information loaded in it directly, it should be said that this information it is permanent and impossible to change.

<img src="./Images/blockinfo.png" width="50%">

Here we leave you the QR of one of the products so you can check it yourself.

<img src="./Images/product.jpeg">

## Rapyd Integration: 

The Rapyd checkout is one of the most important parts of the marketplace, since it gives you the ability to make payments with real money to buy the products, in this case the API that we implemented in the platform was to be able to perform the Checkout of the products.

In that case, the API is executed once we have finished selecting the products and press the Checkout button.

<img src="./Images/cart.png">

We can see that once we press the Checkout button it takes us directly to the Checkout page that Rapyd gives us.

<img src="./Images/check.png">

As part of the Rapyd implementation we can easily select and add all the payment methods that we think are convenient for our business.

<img src="./Images/method.png">


