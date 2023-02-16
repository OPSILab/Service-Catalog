# Introduction

The Service Catalogue is a layered application implementing the Service Registry (front-end and backend) and Metadata Catalogue features, to provide APIs for programmatically interaction with other components of ACROSS platform and dashboards and a graphical editors supporting users to manage service descriptions and related [Service Model](./docs/model/index.md) adaptation.

![alt tag](sc-architecture.png "Service Catalogue architecture")

The Backend is implemented as [Spring
Boot](https://spring.io/projects/spring-boot) Java microservice, and
will be deployed with a tightly coupled storage service
([MongoDB](https://www.mongodb.com/) 4.2+). The Front-end,named Service Catalogue Manager, is an Angular
portal based on [Nebular](https://akveo.github.io/nebular/) framework.

![alt tag](sc-tech-layers.png "Service Catalogue Layers")

The two layers can be deployed as [Docker](https://www.docker.com/)
containers, based on [Tomcat Alpine
image](https://hub.docker.com/_/tomcat) and paired with a MongoDB
container. This adoption of several reliable and production ready
technologies guarantees robustness and modularity of the solution.

![alt tag](sc-techs.png "Service Catalogue Technologies")

Service Catalogue architecture implementation is completed by
integrating Spring Security and [Keycloak](https://www.keycloak.org/)
that supports [OpenId Connect](https://openid.net/connect/) and
[OAuth2](https://oauth.net/2/) authorization framework. The Service
Catalogue uses the Open Id Connect protocol upon the OAuth2
Authorization workflows, in order to perform User authentication and
obtain an Access Token (JWT), which will be used to grant access.


![alt tag](sc-auth-layer.png "Service Catalogue Authentication layer")

Similarly, a client application/service wanting to interact with the
Service Catalogue, will perform OAuth2 Authorization, obtaining an
Access Token to be used in the request to APIs.The choice of Keycloak
provides an out of box solution for a rapid security layer development
of application with supporting features such as Single-Sign-On (SSO),
Social Login, User Federation, Client Adapters, Admin Console and
Account Management Console and finally [Identity
Brokering](https://www.keycloak.org/docs/latest/server_admin/#_identity_broker)


![alt tag](sc-keycloak-proxy.png "Keycloak identity brokering")

This last aspect will facilitate the integration of the Service Catalogue with multiple and specific identity Systems.