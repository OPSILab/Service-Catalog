# Installing Service Catalogue Server - Docker

This document describes how to install and launch Service catalogue Server very easily
using [Docker](https://www.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/).

Service Catalogue Server component will be deployed as Docker container (based on Tomcat Alpine image paired with a MongoDB container).

Service Catalogue Server folder provides both **DockerFile** file (in each subfolder) and  the **docker-compose** file.


---
## Prerequisites

You must install of course:

   -  **Docker Engine**: version >= 20.10 ([see the guide](https://docs.docker.com/get-docker/)).
   -  **Docker Compose**: ([see the guide](https://docs.docker.com/compose/install/#install-compose)).

## Start it up with Docker Compose

Docker Compose allows to run the whole stack and to link each component to the other under the same Docker network.

In order to accomplish this:

  - Move into **Service-Catalogue/service-catalogue-server** folder
  
  - Before launching docker-compose.yml, modify it to configure environment variables properly, as
    described below.
	
     (**ONLY AFTER COMPLETING FOLLOWING CONFIGURATION SECTION**) 
	 
	 Run the docker-compose file with:

```bash
docker-compose up
```

The containers will be automatically started and attached to the created `sc-network` network (see below).

---
## Configuration

### Docker networking

All the Service Catalogue Server containers will be attached to the same Docker network and each one will have its own assigned IP and
hostname, internal to the network. 

You can check the created network (after running "docker-compose up"), where all the containers will be attached to,
with:

```bash
docker network ls
```

Once the application was started, you can check IPs assigned to running
containers, with:

```bash
docker inspect network sc-network.
```


**NOTE**.
As the network is a bridge, each port exposed by containers (e.g. 8080), will be
mapped and also reachable in the machine where Docker was installed. Thus, if
the machine is publicly and directly exposed, also these ports will be
reachable, unless they were closed.

### Configuration through environment variables


**IMPORTANT Note.**.
The properties in each components's `application.properties` file (see [WAR packaging installation](install-sc-server-war.md))
are defined following Spring notation **property=`${ENVVARIABLE_NAME:value}`**. 

Every `ENVVARIABLE_NAME` defined in `environment` sections of each container  will overwrite 
the default `value` defined in the properties file. 

As other configuration (see next sections) relies on docker networking lookup, the only environment variables to be modified is:

 - **`IDM_ISSUER_URI`**: with the JWT Issuer Uri of installed Idm (e.g. `https://IDM_HOST/auth/realms/<realm_name>`)


**Note**. This endpoint will be used to verify token issued for the Oauth2 client application registered during Idm/Keycloak installation [(see this section)](./index.md#identity-manager).

**Note.** Change **IDM_HOST** with the real hostname where IdM (e.g. Keycloak) has been deployed.


#### CORS Configuration

If Service Catalogue Manager is going to be deployed in a different domain (e.g. http://localhost) than the one of Service Catalogue Server, modify one of the following environment variable appropriately:

  - **IDM_ALLOWED_ORIGIN_PATTERNS**
  - **IDM_ALLOWED_ORIGINS**

in order to correctly enable CORS requests between the Dashboard and Server APIs.

---
## Applying configuration

Once all the environment configurations are done, we can run:

```bash
docker-compose up
```

As a result of this command, the Service Catalogue Server will listen on the port as defined `ports` section.

---