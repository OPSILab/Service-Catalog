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
To enable other languages:
- copy paste and rename src/assets/data/i18n/en.json file with the language label ( e.g. "de") and translate the related properties.
- copy, paste and rename folder src/assets/data/service-schema/en for translating service model labels, by including or changing "title" and "description" for each class property. Each property should include "title" and "description" property in order to be translated:

```
"property": {
              "type": "string",
              "title": "Property",
              "description": "The property name of Data Concept at the Service (i.e. specific field in a form).",
              "minLength": 1
            }
```
Include them if not present in the specific class property.

Enumerated list can be translated also by including localized "enum_titles" for each item

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
```


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

---

