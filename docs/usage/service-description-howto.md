# How to describe a service

## General Info

To describe a new service by means of Service Catalogue Editor go to
"Services" and clicks on "Add new"

![](howto1.png)

You will redirect to the Service Editor page showing you several tabs
where you can provide information about the service:

-   Service overall information

-   Service instance information

-   Service Personal Data handling information.

You can find the complete description of Service Model here.

Go to ***Catalogue Info*** tab and insert mandatory information:

-   Service Name

-   Service Identifier

Select as optional if the service is Public or not ( by default Yes):

![](howto2.png)

## Service Information

In ***Service Information*** tab you can insert a set of information
compliant to CSPV-AP Public Service model. The properties "Identifier"
and "Name" have been filled automatically with the values inserted in
the previous tab

![](howto3.png)

Insert *Spatial* and *Processing Time* if you want provide information
about the time needed for executing the services and if you want that
the Services could be filtered by location. Duration should be inserted
by using the ISO8601 syntax *P(n)Y(n)M(n)W(n)DT(n)H(n)M(n)S* (e.g P1Y is
one year duration)

**\*NOTES\*** Several fields are mandatory or have syntax constrains. An
alert will inform you.

In **Keyword** tab provide one or more keywords if you want that the
Services could be filtered/searchable by a set of keywords

![](howto4.png)

Select one more "Sector", "Thematic" and "Type" and "Event" categories
if you want categorize your service description.

![](howto5.png)

To provide multilanguage descriptions first of all select the available
languages from **Language** tab

![](howto6.png)

To provide further external information use the tab "Described at"

![](howto7.png)

Compile **Competent Authority** and **Contact Point** tabs for
information how to contact/reach the agent providing the service.

![](howto8.png)

A service could require several other services. Use the tab **Requires**
to provide a list of required services. From this tab you can select one
or more registered services in the catalogue or to put a reference (e.g
the url) to an external service.

![](howto9.png)

By means of **Channel** tab you can provide information about the
several channels through which an Agent provides, uses or otherwise
interacts with the Public Service, such as an online service, phone
number or office.

![](howto10.png)

According to the type of channel other information should be included in
order to access the service ( e.g Contact point or Competent Authority
info). In particular if *RESTService* is selected several information
should be provided into **Service Instance** tab.

Each channel can be associated with several inputs defined previously in
**Input** tab

![](howto11.png)

For each input several reference information can be provided and in
particular the specification (**Conforms to** tab) of Dataset defined in
**Service Instance** tab.

![](howto12.png)

![](howto13.png)

In tab **Cost** the user can provide information about the cost of provision and in case for which selected channel.

![](cost.png)

## Service Instance

The **Service Instance** tab collects all information on the specific
service instance invocable at the endpoint filled in the "Endpoint"
section

![](howto14.png)

## Personal Data Handling

The **Personal Data Handling** tab collects all information about the
personal data processing for specific purposes by referring the datasets
defined in Service Instance section.

![](howto15.png)

The following section provides an example of what information should be
included for a rest service invocation as alternative to use the
information included in endpoint documentation and related connection
with personal data handling section.

## Example: service invocation information

The minimum set of information needed to invoke a service:

it will use the info provided in the following pages, to invoke the REST
services:

-   *Service Instance-\>Endpoint Connector-\>Endpoint section*

-   *Service Instance-\>Service Data Description-\>Basic section*

-   *Service Instance-\>Service Data Description-\>Data Mapping section*

![](howto14.png)

Endpoint properties:

-   Access URL- root url of REST endpoint

-   Path- Relative path of the specific endpoint \[{METHOD},
    Content-Type:{content-type}\]

    -   METHOD = GET/POST/PUT

    -   Content-type:

        -   Application/json

        -   Multipart/form-data, where eachpart could be a string or a
            file (Content-Type=application/octet-stream), depending on
            how it has been defined in Service Instance-\>Service Data
            Description-Data Mapping

![](howto17.png)

Create separate datasets by distinguishing personal data and not.
Personal dataset are used to specify which property requires data
consent as defined in *Personal Data Handling-\>Required Datasets*

![](howto18.png)

In **Data Mapping** tab the inputs to the REST service are defined. The
following values are used:

-   Property- the input identifier to be used when invoking the REST
    service

-   Type- possible values recognised for invoking the REST service:

    -   Input text

    -   File

-   Required: true/false

-   Concept: (if personal data)personal data concept
