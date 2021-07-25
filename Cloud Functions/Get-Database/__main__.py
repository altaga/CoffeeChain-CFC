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