# Installing Service Catalogue Server

This section covers the steps needed to properly install Service Catalogue Server.

---

Service Catalogue Server is the core backend of the platform. 
It implements and exposes all the main functionalities provided by Service Catalogue, regarding the lifecycle management and storage of Service Descriptions.


It is implemented as Spring Boot Java services, and will be deployed with a tighly coupled storage service (MongoDB 4.2+).

Two installation modes are available:

-   [Install natively as War Package](install-sc-server-war.md) (needs packaging type adjustements in the POM files).
-   [Install with Docker](install-sc-server-docker.md) (Recommended)

---

