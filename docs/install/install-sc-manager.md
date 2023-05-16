# Installing Service Catalogue Manager 


This section covers the steps needed to properly install Service Catalogue Manager dashboard. 
It is an [Angular](https://angular.io/) Web portal based on [Nebular/Ngx-admin](https://github.com/akveo/nebular) framework that can be installed in the following ways:

-   Build as Angular distribution and deploy natively on a Web Server
-   Run as Docker containerized environment (recommended)


The following sections describe each installation method in detail.

---
## Install natively on Web Server

Build Angular application and deploy compiled folder on a Web Server.

### Requirements

In order to install Service Catalogue Manager the followings must be correctly installed and
configured:

| Framework                                                                                                      | Version                | Licence                                 |
| -------------------------------------------------------------------------------------------------------------- | ---------------------- |---------------------------------------- |
| [NodeJS with NPM](https://nodejs.org/en/)                                                                      | >=14.15                | MIT                                     |
| [Apache](https://httpd.apache.org) or [Nginx](https://nginx.org/en) Web server                                 | 2.4.43 / 1.18.0        | Apache License v.2.0 /  2-clause BSD    |

&nbsp;
### Build Angular Application

Execute the following commands to create the dist folder.

-  Move into `service-catalogue-manager/` folder:

```bash
cd service-catalogue-manager
```

- Run following commands:

```bash
npm install
```

```bash
npm run build:prod
```

- The application files will be compiled into `dist` folder



### Deployment and Configuration

#### Dist folder deployment

Move the files in `dist` subfolder to a new folder on the Web server document root (e.g. `/var/www/html` for Apache and `/usr/share/nginx/html` for Nginx.

#### Configuration

Once the dist folder files are deployed and the server has started, modify the
fields of `config.json` configuration file, located in `dist/assets/` folder.
(These modifications can be made also in `service-catalogue-manager/src/assets/config.json` file before building the Application, as described in the section above).


- **`serviceRegistry.url`**: with **PUBLIC** (as the Dashboard will make HTTP calls from frontend running locally on browser) endpoint (**`host`:`port`**) where Service Catalogue Server is listening:


```
{
  "serviceRegistry": {
	"url": "http://localhost:8088/service-catalogue"
  }
...
```  

- **`system.sdkUrl`**: with **PUBLIC** (as the Dashboard will make HTTP calls from frontend running locally on browser) endpoint (**`host`:`port`/api/v2**) where (if any) Cape SDK Client is listening (see [CaPe](https://github.com/OPSILab/Cape))

```  
  "system": {
    "sdkUrl": "http://localhost:8085/cape-service-sdk/api/v2",
``` 

- **`system.serviceEditorUrl`**: with endpoint (**`host`:`port`**) where the dashboard is running (depends on Web server configuration or if running with Docker on different published port).

```   
    "serviceEditorUrl": "http://localhost/service-manager",
```   

- **`i18n.locale`**: with locale ( `en` allowed as default) enabling internazionalization on Dashboard pages. 

```
  },
  "i18n": {
    "locale": "en",
    "languages": ["it","en","de","el","lv"] 
  }
}
```

#### Enabling other languages

In the Service Catalogue translations are available directly for the following parts:
- Page Labels
- Service Model (Title, Description, Enumeration)

##### Page Labels
Page Labels are available in 
`service-catalogue-manager/ src/assets/data/i18n/`**LOCALE**`.json`

Where **`LOCALE`** is one of the configured languages in

service-catalogue-manager/src/assets/config.json file :
```
"i18n": { 
       "locale": "en", 
         "languages": ["it","en","de","el","lv"] 
        }
```

Copy, paste and rename “en.json” file with the selected language (e.g. “el”) and translate each property value. Ex:

```
"welcome": "Welcome to Service Catalogue Manager!"
```
To
```
"welcome": " Καλώς ήρθατε στο Service Catalogue Manager! "
```

by respecting upper/low cases, Ex:

```
"services": "SERVICE REGISTRY"
```
to
```
"services": "ΜΗΤΡΏΟ ΥΠΗΡΕΣΙΏΝ",
```

##### Service Model ( in Service Editor Page)

Service Model class `labels` can be translated by including or changing “title” and description for each class property. 
Copy, paste and rename folder “en” in 
`src/assets/data/service-schema/` with the target language (e.g. “el”)
each file should be translated, by changing only `"title"` and `"description"` for each class property. Ex. 

```
"property": {
      "type": "string",
      "title": "Property", <---translate this
      "description": "The property name of <---translate this
Data Concept at the Service
 (i.e. specific field in a form).", 
      "minLength": 1
            }
```

Include them if not present in the specific class property.
For some classes, e.g the ones in the first tab, if set, translate also the `“basicCategoryTitle”`
Ex ( in *service-model.json*)

```
"basicCategoryTitle": "Catalogue Info",
```


`Enumerated` list can be translated also by including localized `"enum_titles"` for each item:
Ex ( in *Event.json*)

```
"items": {
    "type": "string",
    "title": "Event",
    "enum": [
      "",
      "Having a child",
      .
      .

    ],
    "options": {
      "enum_titles": [
        "",
        "(Life) Having a child", <---translate this
        .
        .

      ]
    }

```
Or  to translate the `“value”` of `“enumSource”`. 
Ex ( *concepts.json*):

```
"enumSource": [
    {
      "source": [
        {
          "title": "",
          "value": ""
        },
        {
          "title": "Blood Glucose", <---translate this
          "value": "blood_glucose"
        },
        {
          "title": "Body Weight",
          "value": "personal_details_body_weight"
        },
        ...
```

***`IMPORTANT`.*** The above *“enum”* and *“enum_tiles”* arrays must have the same length and order to have the correct association title/value in the select box in the service editor and the correct correspondence in each language. 
Some enumeration cannot be “reduced” for an operative point of view of the service catalogue:
- *Status* in *service-model.json* and *service-cpsv-entry.json*

***`HINT`.***
Use a JSON editor to modify the files to check at end if it is well formed otherwise the Service Catalogue cannot load them and it will cause error.


#### IDM Configuration for OAuth2 authentication

Service Catalogue Manager uses the Oauth2 Client Credentials flow (without client secret at moment, soon PKCE will be implemented) to perform authentication and get User information from claims of the issued JWT.

In order to correctly execute the OAuth2 flow, Service Catalogue Manager will act as a client application previously registered in the IdM (Keycloak)

- If the Dashboard is going to be deployed in a different domain (e.g. http://localhost) than the Keycloak one, configure the Web Origins section accordingly, in order to correctly enable CORS requests between the Dashboard and Keycloak.
  
**Note**. Replace `http://localhost` with the real hostname (include http(s) protocol) where the Dashboard is deployed and accessible from browser.


- Change following fields in `src/assets/config.json` file:

    * **`system.auth.idmHost`** with endpoint (**`protocol://host`:`port`**) where IdM has been deployed.
  
    * **`system.auth.clientId`** with Client Id (`cape-service-sdk`) provided by application registration in the Idm.

---
## Install with Docker-compose

Service Catalogue Manager can be run as Docker container (based on Nginx image), by using the provided `docker-compose.yml` file.

### Prerequisites

You must install of course:

   -  **Docker Engine**: version >= 20.10 ([see the guide](https://docs.docker.com/get-docker/)).
   -  **Docker Compose**: ([see the guide](https://docs.docker.com/compose/install/#install-compose)).


### Configuration

The provided `docker-compose.yml` file has also directives to mount the provided `nginx.conf` file, needed to correctly handle deep-linking on deployed Dashboard Angular application.

It contains also the mount to the `src/assets/config.json` file, which allows to configure the Dashboard as described in the [Deployment and Configuration](#deployment-and-configuration) section.

**SOON.** Will be available configuration with environment variables to be set directly in `environment` section of `docker-compose.yml` file.

### Start it up with Docker Compose

Docker Compose allows to run the Docker container by pulling the already built image from [Cape Docker Hub repository]().

In order to accomplish this:

- Move into **`Service-Catalogue/service-catalogue-manager`** folder.
  
- Ensure you modified `config.json` file properly, as described in the section above.
	
-  Run the docker-compose file with:

```bash
docker-compose up
```

The containers will be automatically started and attached to the created network.

---
## Launch and Learn

The Data Controller Dashboard is available to the endpoint according to installation mode (Web server or Docker).

Open your favourite browser and point to that endpoint.

Go to [Service Catalogue Usage Manual](../usage/index.md) section to learn how to use the Dashboard.

[Service Catalogue Editor](../usage/index.md#service-description-editor-section) section is implemented by using  [JSON Schema Based Editor](https://github.com/json-editor/json-editor) libraries to build editor from [**Service Model**](../model/service-model.md) schema . Please refer on related documentation for further info and customization.

---

