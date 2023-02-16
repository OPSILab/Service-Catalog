# Installing Service Catalogue Server - War packages

This document describes how to install and launch the Service catalogue Server, by building
the WAR packages from source code. After completing the build process, the
following artefact can be deployed on the Apache Tomcat Server natively installed on host machine:

-   **`service-catalogue.war`**
 
 
### Prerequisites

In order to build and deploy correctly the packages, the following tools should be properly
installed on your computer:


| Name                                                                                                           | Version              | Licence                                 |
| -------------------------------------------------------------------------------------------------------------- | -------------------- |---------------------------------------- |
| [Java OpenJDK](https://openjdk.java.net/)                                                                      | >= 15                 | GNU General Public License Version 2.0  |
| [Apache Tomcat](https://tomcat.apache.org)                                                                     | >=9.0                | Apache License v.2.0                    |
| [MongoDB Community Server](www.mongodb.com)                                                                    | >=4.2.9              | Server Side Public License (SSPL)       |
| [Maven](https://maven.apache.org)                                                                              | >=3.5.0              | Apache License 2.0                      |


---
### Build WAR packages



Execute the following commands to create the War packages.


-  Move into `service-catalogue-server` folder:

```bash
cd service-catalogue-server
```

- Then execute Maven `package` goal:

```bash
mvn package
```

- Into `target` subfolders of each component you should have the corresponding *.war package.

---

### Deployment & Configuration

### WARs deployment

Move all the WAR artifacts to the `webapps` folder of Tomcat installation, start
it up and wait until they are deployed.

### Configuration

Once all the WAR files are deployed and the server has started, modify the
properties of `application.properties` configuration files, located in each deployed folder of
Tomcat `webapps/XXX/WEB-INF/classes/` folder.


**IMPORTANT Note.** Properties are defined following Spring notation **`${ENVVARIABLE_NAME:value}`**. If `ENVVARIABLE_NAME` is defined as environment variable, its value will overwrite 
the default `value`. This is the wanted behaviour in case of [Installation with Docker](install-sc-server-docker.md).




---
### IdM Configuration

Service Catalogue Server will communicate with an Identity Manager acting as Oauth2 Authorization Server (e.g. **Keycloak**)  to:

 - Verify token issued when calling component APIs:
    
    Modify **`spring.security.oauth2.resourceserver.jwt.issuer-uri`** with the JWT Issuer Uri of installed Idm (e.g. `https://IDM_HOST/auth/realms/<realm_name>`)

**Note**. This endpoint will be used to verify token issued for the Oauth2 client application registered during Idm/Keycloak installation [(see this section)](./index.md#identity-manager).

**Note.** Change **IDM_HOST** with the real hostname where IdM (e.g. Keycloak) has been deployed.

### CORS Configuration

If the Service Catalogue Manager is going to be deployed in a different domain (e.g. http://localhost) than the one of Service Catalogue Server component , modify one of the following appropriately:

 - **cors.allowed-origin-patterns**
 - **cors.allowed-origins**

in order to correctly enable CORS requests between the Service Catalogue Manager and Service Catalogue Server.

---
### Applying configuration

In order to apply all the configuration done previously, restart the Tomcat server and
wait until the artifact is redeployed. 

