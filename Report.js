<style>
.ViewTable{
	margin: 0px;
}
</style>

<link media="screen, print" type="text/css" href="/OnDemand/018.020.008.00/eng/themes/oracle/css/main.css" rel="stylesheet"/>

<script type='text/javascript' charset='utf-8'>



 var callReportRecId = "";
 
 var EMPTY_STRING = ""; 
 var queryString = location.search.substring(1);
 var SSO_TOKEN = EMPTY_STRING; 
 //var WS_LOCATION = "/Services/Integration";
 var USERNAME = ""; 
 var PASSWORD = "";
 var WSTK_EMPTY_STRING = ""; 
 var JSESSIONID = WSTK_EMPTY_STRING; 
 var QUERY_PAGE_METHOD_NAME = "QueryPage";
 var INSERT_PAGE_METHOD_NAME = "InsertChild";
 var MINUS_ONE = -1; 
 var httpRequest; 
 var isLastPage = false; 
 var recordCount = "0";
 var isIEBrowser = getBrowserType(detectBrowser());
 
 
var ODSTR = document.location.href.split("OnDemand/");
var ODURL = ODSTR[0];
var WS_LOCATION = ODURL + "Services/Integration";

 // will return isIEBrowser or not?
function getBrowserType(browserName){
	var isIEBrowserValue;
	var browserName = detectBrowser();
	if(browserName!=null && browserName == 'MSIE'){
		isIEBrowserValue = "true";
	}else{
		isIEBrowserValue = "false";
	}
	return isIEBrowserValue;
}

//Utility.js code begins below - Merge
// will detect browser 
function detectBrowser(){
	if(navigator.userAgent.indexOf("MSIE")!=-1){
		return "MSIE";
	}else if(navigator.userAgent.indexOf("Chrome")!=-1){
		return "Chrome";
	}else if(navigator.userAgent.indexOf("Navigator")!=-1){
		return "Netscape";
	}else if(navigator.userAgent.indexOf("Firefox")!=-1){
		return "Firefox";
	}else if(navigator.userAgent.indexOf("Opera")!=-1){
		return "Opera";
	}else if(navigator.userAgent.indexOf("Safari")!=-1){
		return "Safari";
	}
}
 function KeyValue(key, value)
 {
     this.key = key; this.value = value;
 } 
 function Map()
 {
     this.array = new Array();
	 return WSTK_EMPTY_STRING;
 }
   
Map.prototype.put = function(key, value) 
 {
     if((typeof key != "undefined") && (typeof value != "undefined")) 
     {
         this.array[this.array.length] = new KeyValue(key, value);
     }
	 return WSTK_EMPTY_STRING;
 }
  
Map.prototype.get = function(key) 
 {
     for(var k = 0 ; k < this.array.length ; k++)
     {
         if(this.array[k].key == key) 
         {
             return this.array[k].value;
         }
     } 
     return WSTK_EMPTY_STRING;
 }  
 
Map.prototype.containsKey = function(key) 
 {
     for(var k = 0 ; k < this.array.length ; k++)
     {
         if(this.array[k].key == key) 
         {
             return true;
         }
     } 
     return false;
 }
 
Map.prototype.remove = function(key) 
 {
	 var returnValue;
     for(var k = 0 ; k < this.array.length ; k++)
     {
         if(this.array[k].key == key) 
         {
        	 returnValue = this.array[k].value;
        	 this.array.splice(k, 1);
         }
     } 
     return returnValue;
 }
 
Map.prototype.getKeySet = function() 
 {
 	var allKeyArray = new Array();
    for(var k = 0 ; k < this.array.length ; k++)
    {
        allKeyArray[k] = this.array[k].key;
    } return allKeyArray;
 }
 
Map.prototype.length = function() 
 {
     return this.array.length;
 }
 function getParameter(parameterName) 
 {
	var parameterName = parameterName + "=";
	if ( queryString.length > 0 ) 
	{
		begin = queryString.indexOf (parameterName);
		if ( begin != -1 ) 
		{
			begin += parameterName.length;
			end = queryString.indexOf ( "&" , begin );
			if ( end == -1 ) 
			{
				end = queryString.length;
			}
			return queryString.substring(begin, end);
		} 
		return null;
	}
 }  

 function ssoLoginOCOD(wsLocation, ssoToken) 
 {
	httpRequest = getXMLHTTPRequest();

	var ocodURL = wsLocation + "?command=ssologin&odSsoToken=" + ssoToken;
	httpRequest.open("post", ocodURL, false);
	httpRequest.onreadystatechange = setJSessionId;

	try	
	{
		httpRequest.send();
	} 
	catch (ssoLoginEx){
		alert("Cannot Access OnDemand. SSO Login Failed.");
		window.status="Cannot Access OnDemand. SSO Login Failed";
		throw "Cannot Access OnDemand. SSO Login Failed";
	}	
	return JSESSIONID;
 }

 function setJSessionId() 
 {
 	if (httpRequest.readyState == 4)
 	{
		window.status = "Trying Login to OnDemand";
	
		if(httpRequest.status == 200)
		{
			//JSESSIONID = getJsessionIdFromheader(httpRequest,"Set-Cookie");
			window.status = "Able to access OnDemand";
		} 
		else {
			window.status = "Failed to access Ondemand..." + "httpRequest.status: " + httpRequest.status;
		}
	} 
	else {
		window.status="Trying to access Ondemand..." + "httpRequest.readyState: "+ httpRequest.readyState;
	}
 }
 
 
function getXMLHTTPRequest() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch(httpRequestEx) {
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest()
		} else if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (xmlhttp != null) {
			window.status = "Your browser supports XMLHTTP.";
		} else {
			alert("Your browser does not support XMLHTTP.")
			throw "Your browser does not support XMLHTTP.";
		}
	}
	return xmlhttp;
}


 function queryWithChild(objectKeyValueMap, nameOfObject, childObjMap, wsURL, wsVer)
 {
	var startRowNumber = 0;
	var pageSize = 100;
	/*** This is the global array that which contains the entire result.*/
	var globalQueriedResultArray = new Array();
	/*** The 'isLastPage' to flag for Query operation during initiation of the operation.*/
	isLastPage = false;
	
	try
	{
	
		/*** Loop it until lastPage = false.*/
		var iCounter = 0;
		while(!isLastPage)
		{
			/*** Query OnDemand for the set criteria.*/
			var resultArray = queryWithStartRwNo(objectKeyValueMap, nameOfObject, childObjMap, startRowNumber, pageSize, wsURL, wsVer);
			
			//iCounter = iCounter + 1;
			///if (iCounter>5) {
			//	isLastPage=true;
			//	break;
			//}
			if(resultArray.length > 0) 
			{
			
				/*** Setting returned values (after querying from OnDemand) in the globalQueriedResultArray.*/
				globalQueriedResultArray = globalQueriedResultArray.concat(resultArray);
				/** Incrementing Start Row Number, as only hundered records can be queried at once.*/
				startRowNumber = startRowNumber + pageSize;
			}
		}
	} 
	catch (queryEx)
	{
		alert("Exception occured during " + nameOfObject + " Query with Child operation! ERROR DESCRIPTION :: " + queryEx.message);
		window.status = "Exception occured during " + nameOfObject + " Query with Child operation!";
		throw "Exception occured during " + nameOfObject + " Query with Child operation!";
	} 
		return globalQueriedResultArray;
 }

 function queryWithStartRwNo(objectKeyValueMap, nameOfObject, childObjMap, startRowNumber, pageSize, wsUrl, wsVer)
 {
	var soapMessage = WSTK_EMPTY_STRING;
	var errorMsg = WSTK_EMPTY_STRING;
	var wsConnection;
	var resultArray = new Array();
	/*** This method builds SOAP message for the operation.*/
	if(wsVer == "WS2.0")
	{
		soapMessage = buildSOAPForWS2Query(objectKeyValueMap, nameOfObject, startRowNumber, pageSize);
	} 
	else {
		soapMessage = buildSOAPForWS1Query(objectKeyValueMap, nameOfObject, childObjMap, startRowNumber, pageSize);
		
	}
	
	try	
	{
		if(JSESSIONID.length < 0 || JSESSIONID == WSTK_EMPTY_STRING)
		{
			window.status = "Logging In";
			/***loginOCOD(WS_LOCATION, USERNAME, PASSWORD);*/
			ssoLoginOCOD(WS_LOCATION, SSO_TOKEN);
		}
		/*** Getting the XMLHTTPRequest Connection handler.*/
		wsConnection = getXMLHTTPRequest();
		/*** Set the Request Headers.*/
		if(wsVer == "WS2.0")
		{
			setRequestHeaderForWS2CODOperation(wsConnection, nameOfObject, QUERY_PAGE_METHOD_NAME, wsUrl);
		}
		else 
		{
			setRequestHeaderForWS1CODOperation(wsConnection, nameOfObject, QUERY_PAGE_METHOD_NAME, wsUrl);
		}
		
		wsConnection.onreadystatechange = function(){
			if (wsConnection.readyState == 4)
			{
				if(wsConnection.status == 200)
				{					
					var soapResponse = wsConnection.responseText;
					var resultMap;
					if(wsVer == "WS2.0")
					{
						resultMap = parseWS2SoapResponse(soapResponse, nameOfObject);
					} 
					else {
						resultMap = parseWS1SoapResponse(soapResponse, nameOfObject);
						
					}
					resultArray = moveMapToArray(resultMap);
					
				} 
				else {					
					var xmlDOM = wsConnection.responseXML;
					var responseXmlStr = xmlObj2XmlStr(xmlDOM);
					errorMsg = parseSoapErrorRespose(responseXmlStr);
				}
			}
			 else {
				window.status = "Querying With Session Id :: " + JSESSIONID;
			}
		}
		wsConnection.send(soapMessage);
		/*** Throwing exception here, as unable to throw exception from inline 
		 * function => "wsConnection.onreadystatechange = function(){}".
		 * This is because anything returned/thrown from inline function becomes 
		 * a part of "wsConnection.onreadystatechange".*/
		if(typeof errorMsg != null && errorMsg != ""){
			throw errorMsg;
		}
	} 
	catch (webServiceEx) 
	{
		window.status = "Exception occured during Query operation!";
		throw webServiceEx;
	} 
	return resultArray;
 }

 /*** This method build a SOAP message for OnDemand Parent object Query operation. */
 function buildSOAPForWS1Query(objectKeyValueMap, objectName, childObjMap, startRowNumber, pageSize)
 {
	var operationName = QUERY_PAGE_METHOD_NAME;
	var dateHead = WSTK_EMPTY_STRING;
	/*** Build the SOAP message.*/
	var soapMessage = "<?xml version=\"1.0\"?>";
	soapMessage = soapMessage + "<SOAP-ENV:Envelope xmlns:SOAP-ENV=" + "\"http://schemas.xmlsoap.org/soap/envelope/\" ";
	soapMessage = soapMessage + " xmlns:SOAPSDK1=\"urn:crmondemand/ws/";
	
	/*** Doing case-insensitive comparison of two string.*/
	/*** And it returns 0, if the strings are equal.*/
	if((objectName.toLowerCase() != "note") && (objectName.toLowerCase() != "book"))
	{
		dateHead = "10/2004";
	}
	
	soapMessage = soapMessage + objectName.toLowerCase() + "/" + dateHead + "\"";
	soapMessage = soapMessage + " xmlns:SOAPSDK2=\"urn:/crmondemand/xml/";
	soapMessage = soapMessage + objectName.toLowerCase() + "\">" + "<SOAP-ENV:Body>";
	
	if(objectName.toLowerCase() == "activity")
	{
		soapMessage = soapMessage + "<SOAPSDK1:ActivityNWS_Activity_" + operationName + "_Input> ";
	} 
	else
	{
		soapMessage = soapMessage + "<SOAPSDK1:" + objectName + "WS_" + objectName + operationName + "_Input> ";
	}
	
	if(pageSize != MINUS_ONE && startRowNumber != MINUS_ONE)
	{
		soapMessage = soapMessage + "<PageSize>" + pageSize + "</PageSize>" + "<StartRowNum>" + startRowNumber + "</StartRowNum>";
	}
	
	/***This is for the Parent object to be included in the SOAP Message.*/
	soapMessage = soapMessage + "<SOAPSDK2:ListOf" + objectName + ">";
	soapMessage = soapMessage + "<" + objectName + ">";
	
	/*** Checking is empty for object key/value Map.*/
	if(objectKeyValueMap.length() > 0)
	{
		/*** Getting all the keys of object key/value Map.*/
 		var keySetArray = objectKeyValueMap.getKeySet();
 		/*** The body of the SOAP message (Setting Integration Tags).*/
 		for(var k = 0; k < keySetArray.length; k++) 
 		{
       		var integrationTag = keySetArray[k];
       		var queryCriteria = objectKeyValueMap.get(integrationTag);
       		if(containsSpecialCharacters(queryCriteria) >= 0)
       		{
       			queryCriteria = encodeXMLTag(queryCriteria);
       		}
       		/*** Inside this "for" loop, adding all the object fields to the SOAP Message.*/
       		soapMessage = soapMessage + "<" + integrationTag + ">" + queryCriteria + "</" + integrationTag + ">";
    	}
 	}
	/*** Iterating Child Object Map * Start.*/	
	if((typeof childObjMap != null) && (childObjMap instanceof Map) && childObjMap.length() > 0)
	{
		/*** Getting all the keys (child object names) of child Map (object name and key/valueMap).*/
 		var childObjNameSetArray = childObjMap.getKeySet();
 		
		for(var k = 0; k < childObjNameSetArray.length; k++)
		{
			var childObjName = childObjNameSetArray[k];
			soapMessage = soapMessage + "<SOAPSDK2:ListOf" + childObjName + ">";
			soapMessage = soapMessage + "<" + childObjName + ">";

			var oneChildObjMap = childObjMap.get(childObjName);
			if((typeof oneChildObjMap != null) && (oneChildObjMap instanceof Map) && oneChildObjMap.length() > 0) 
			{
				/*** Getting all the keys of one child object key/value Map.*/
 				var keySetArray = oneChildObjMap.getKeySet();
				/*** The body of the SOAP message (Setting Integration Tags).*/
				for(var n = 0; n < keySetArray.length; n++)	
				{
					var integrationTag = keySetArray[n];
					var queryCriteria = oneChildObjMap.get(integrationTag);
					if(containsSpecialCharacters(queryCriteria) >= 0)
					{
						queryCriteria = encodeXMLTag(queryCriteria);
					}
					/*** Inside this "for" loop, adding all the child object fields to the SOAP Message.*/
					soapMessage = soapMessage + "<" + integrationTag + ">" + queryCriteria + "</" + integrationTag + ">";
				}				
			}
			soapMessage = soapMessage + "</" + childObjName + ">";
			soapMessage = soapMessage + "</SOAPSDK2:ListOf" + childObjName + ">";
		}
	}
	/**** Iterating Child Object Map * End.*/	
	soapMessage = soapMessage + "</" + objectName + ">"; 
	/*** Closing Tag Of Parent Object.*/
	soapMessage = soapMessage + "</SOAPSDK2:ListOf" + objectName + ">";	
	/*** The footer of SOAP message.*/
	if(objectName.toLowerCase() == "activity")
	{
		soapMessage = soapMessage + "</SOAPSDK1:ActivityNWS_Activity_" + operationName + "_Input> ";
	} 
	else{
		soapMessage = soapMessage + "</SOAPSDK1:" + objectName + "WS_" + objectName + operationName + "_Input>";
	}
	
	soapMessage = soapMessage + "</SOAP-ENV:Body></SOAP-ENV:Envelope>";
	
	return soapMessage;
 }
 /*** This method sets headers for the XMLHTTPRequest connection object.*/
 function setRequestHeaderForWS1CODOperation(wsConnection, objectName, operationName, wsUrl)
 {
	/**** START ***** Building SOAP Action */
	var operationHead = WSTK_EMPTY_STRING;
	var dateHead = WSTK_EMPTY_STRING;
	
	if(objectName.toLowerCase() == "activity")
	{
		operationHead = "_" + operationName;
		dateHead = "10/2004";
	} 
	else if((objectName.toLowerCase() == "note") && (objectName.toLowerCase() == "book"))
	{
		operationHead = operationName;
		dateHead = WSTK_EMPTY_STRING;
	} 
	else
	{
		operationHead = operationName;
		dateHead = "10/2004";
	}
	/**** END ***** Building SOAP Action */
	var soapActionHeader = "\"document/urn:crmondemand/ws/" + objectName.toLowerCase() + "/" + dateHead + ":" + objectName + operationHead + "\"";
	
	wsConnection.open("post", wsUrl, false);
	wsConnection.setRequestHeader("SOAPAction",  soapActionHeader);
	wsConnection.setRequestHeader ("Content-Type", "text/XML");
 }

 function containsSpecialCharacters(field)
 {	/*** search() returns 0 (zero) if there is no match and returns 
	 * position of the matched character when first match is found.*/
	return field.search(/(<|>|&|'|")/);
 }

 function encodeXMLTag(searchCriteria)
 {
	searchCriteria = searchCriteria.replace(/&/g,"&amp;");
	searchCriteria = searchCriteria.replace(/</g,"&lt;");
	searchCriteria = searchCriteria.replace(/>/g,"&gt;");
	searchCriteria = searchCriteria.replace(/"/g,"&quot;");
	searchCriteria = searchCriteria.replace(/'/g,"&apos;");

	return searchCriteria;
 }
 
 function parseWS1SoapResponse(returnedXml, objectName) {
	var returnedCollectionMap = new Map();
	if (trim(returnedXml).length > 0) {
		window.status = "Parsing Response......";
		var xmlDocObj = xmlStr2XmlObj(returnedXml);
		if (xmlDocObj.hasChildNodes) {
			// below line commented as ns:LastPage does not work in chrome
			//var isLastPageTag = xmlDocObj.getElementsByTagName("ns:LastPage");
			var isLastPageTag;
			if(isIEBrowser!=null && isIEBrowser == 'true'){
				isLastPageTag = xmlDocObj.getElementsByTagName("ns:LastPage");
			}else{
				isLastPageTag = xmlDocObj.getElementsByTagName("LastPage");
			}
			// added by Pawan
			if (isLastPageTag.length > 0) {
				var isLastPageStr = isLastPageTag[0].childNodes[0].nodeValue;
				isLastPage = (isLastPageStr == "true") ? true : false;
			}
			var rootNode = xmlDocObj.getElementsByTagName("ListOf" + objectName)[0];
			if (( typeof rootNode != "undefined") && (rootNode.nodeName == ("ListOf" + objectName))) {
				returnedCollectionMap = parseAllNodeOfALevel(rootNode, objectName);
			}
		}
	} else {
		window.status = "No Records Found!";
	}
	return returnedCollectionMap;
}

function parseAllNodeOfALevel(rootNode, objectName) {
	childNodeValue = WSTK_EMPTY_STRING;
	var tagNamesNValuesOfOnelevel = new Map();
	if (rootNode.hasChildNodes) {
		var i = 0;
		var childNode = rootNode.firstChild;
		while (childNode != null) {
			var childNodeName = childNode.nodeName;
			if (childNode.hasChildNodes) {
				var subChildNode = childNode.firstChild;
				//alert("subChildNode::"+subChildNode);
				//  below if added by PAWAN
				if(subChildNode!=null && typeof(subChildNode) != 'undefined'){
				//alert("subChildNode2::"+subChildNode);
					var childNodeType = subChildNode.nodeType;
					if (childNodeType != 3) {
						returnedBelowLevelNodesMap = parseAllNodeOfALevel(childNode, objectName);
						if (tagNamesNValuesOfOnelevel.containsKey(childNodeName)) {
							var existingNodeValueOrMap = tagNamesNValuesOfOnelevel.remove(childNodeName);
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + i, existingNodeValueOrMap);
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), returnedBelowLevelNodesMap);
						} else if (tagNamesNValuesOfOnelevel.containsKey(childNodeName + "::" + 1)) {
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), returnedBelowLevelNodesMap);
						} else {
							tagNamesNValuesOfOnelevel.put(childNodeName, returnedBelowLevelNodesMap);
						}
					} else {
						if(isIEBrowser!=null && isIEBrowser == 'true'){
							childNodeValue = childNode.text;
						}else{
							childNodeValue = childNode.textContent;
						}
						//alert("childNodeValue::"+childNodeValue);
						if (childNodeValue!=null && typeof(childNodeValue) != 'undefined' && childNodeValue.toLowerCase().indexOf("<no value>") >= 0) {
							childNodeValue = "";
						}
						if (tagNamesNValuesOfOnelevel.containsKey(childNodeName)) {
							var existingNodeValueOrMap = tagNamesNValuesOfOnelevel.remove(childNodeName);
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + i, existingNodeValueOrMap);
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), childNodeValue);
						} else if (tagNamesNValuesOfOnelevel.containsKey(childNodeName + "::" + 1)) {
							tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), childNodeValue);
						} else {
							tagNamesNValuesOfOnelevel.put(childNodeName, childNodeValue);
						}
					}
				}// added by pawan
			} else {
				if(isIEBrowser!=null && isIEBrowser == 'true'){
					childNodeValue = childNode.text;
				}else{
					childNodeValue = childNode.textContent;
				}
				//alert("childNodeValue2::"+childNodeValue);
				if (childNodeValue!=null && typeof(childNodeValue)!='undefined' && childNodeValue.toLowerCase().indexOf("<no value>") >= 0) {
					childNodeValue = "";
				}
				if (tagNamesNValuesOfOnelevel.containsKey(childNodeName)) {
					var existingNodeValueOrMap = tagNamesNValuesOfOnelevel.remove(childNodeName);
					tagNamesNValuesOfOnelevel.put(childNodeName + "::" + i, existingNodeValueOrMap);
					tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), childNodeValue);
				} else if (tagNamesNValuesOfOnelevel.containsKey(childNodeName + "::" + 1)) {
					tagNamesNValuesOfOnelevel.put(childNodeName + "::" + (i + 1), childNodeValue);
				} else {
					tagNamesNValuesOfOnelevel.put(childNodeName, childNodeValue);
				}
			}
			childNode = childNode.nextSibling;
			i++;
		}
	}
	return tagNamesNValuesOfOnelevel;
}
 

 function parseSoapErrorRespose(returnedXml) {
	var errorMsg = WSTK_EMPTY_STRING;
	if (trim(returnedXml).length > 0) {
		window.status = "Parsing SOAP Error Response......";
		var xmlDocObj = xmlStr2XmlObj(returnedXml);
		if (xmlDocObj.hasChildNodes) {
			var errorMsgNode = xmlDocObj.getElementsByTagName("siebelf:errormsg").length > 0 ? xmlDocObj.getElementsByTagName("siebelf:errormsg") : xmlDocObj.getElementsByTagName("ErrorMessage");
			if (errorMsgNode.length > 0) {
				var oneErrorMsgNode = errorMsgNode[errorMsgNode.length - 1];
				errorMsg = oneErrorMsgNode.text;
			}
		}
	} else {
		window.status = "Error Message Not Found!";
	}
	return errorMsg;
} 
 
 function xmlObj2XmlStr(xmlDom) {
	var xmlStr = null;
	var doc = xmlDom.documentElement;
	if (doc.xml == undefined) {
		xmlStr = (new XMLSerializer()).serializeToString(xmlDom);
	} else {
		xmlStr = doc.xml;
	}
	return xmlStr;
}

function xmlStr2XmlObj(strXML) {
	var xmlDom;
	if (window.ActiveXObject) {
		xmlDom = new ActiveXObject("Microsoft.XMLDOM");
		xmlDom.async = "false";
		xmlDom.loadXML(strXML);
	} else {
		var parser = new DOMParser();
		
		xmlDom = parser.parseFromString(strXML, "text/xml");
		// Below commented for Google Compatibility BY Pawan
		//alert("Microsoft.XMLDOM is not present. Unable to proceed.");
		//throw "Microsoft.XMLDOM is not present. Unable to proceed.";
	}
	return xmlDom;
}

function moveMapToArray(mapObject) {
	var mapContentArray = new Array();
	if (mapObject.length() > 0) {
		var mapKeySet = mapObject.getKeySet();
		for (var itr = 0; itr < mapKeySet.length; itr++) {
			var oneKey = mapKeySet[itr];
			var oneValue = mapObject.get(oneKey);
			mapContentArray[itr] = oneValue;
		}
	}
	return mapContentArray;
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g, "");
}
 
 
 function openNewPopup()
 {
	var width = 860; var height = 590;
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));
    var windowFeatures = "width=" + width + ",height=" + height + ", menubar=yes, scrollbars=1,status=1,resizable=0,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
	var accountPlanMainTlbDiv = document.getElementById("divIdOfMainTlb").innerHTML;
	/*** Pop up report. this is to hide all this javascript code.*/
	chldWnd = window.open("", "_blank", windowFeatures); 
	chldWnd.document.write(accountPlanMainTlbDiv);	
	/*** Clsoe the parent without confirmation from user.*/
	window.open("", "_self", ""); window.close();
 }

 function refreshReportDataOnLoad()
 {
	if(window.opener.document.getElementById("pageRefresherDivCT") == null 
		|| window.opener.document.getElementById("pageRefresherDivCT").value == "")
	{
		var divObj = window.opener.document.body.appendChild(window.opener.document.createElement("div"));
		divObj.id = "pageRefresherDivCT"; divObj.value = "test";
		HereLink("o:go~r:report", "Refresh"); return true;
	} 
	return false;
 }

 function buildSOAPForInsertChildOperations(parentKeyValueMap, nameOfParentObject, childObjMap, operationName) {
	var soapMessage = "";
	var dateHead = "";
	// Build the SOAP message.
	soapMessage = "<?xml version=\"1.0\"?>";
	soapMessage = soapMessage + "<SOAP-ENV:Envelope xmlns:SOAP-ENV="
			+ "\"http://schemas.xmlsoap.org/soap/envelope/\" ";
	soapMessage = soapMessage + " xmlns:SOAPSDK1=\"urn:crmondemand/ws/";
	if(nameOfParentObject.toLowerCase()!="note"){
		dateHead = "10/2004";
	}
	soapMessage = soapMessage + nameOfParentObject.toLowerCase() + "/" + dateHead + "\"";
	soapMessage = soapMessage + " xmlns:SOAPSDK2=\"urn:/crmondemand/xml/";
	soapMessage = soapMessage + nameOfParentObject.toLowerCase() + "\">"	+ "<SOAP-ENV:Body>";
	if(nameOfParentObject.toLowerCase() == "activity"){
		soapMessage = soapMessage + "<SOAPSDK1:ActivityNWS_Activity_" + operationName + "_Input> ";
	}else{
		soapMessage = soapMessage + "<SOAPSDK1:" + nameOfParentObject + "WS_"+ nameOfParentObject + operationName+"_Input> ";
	}
	
	// This is for the Parent object to be included in the SOAP Message
	soapMessage = soapMessage + "<SOAPSDK2:ListOf" + nameOfParentObject + ">";
	
	// The body of the SOAP message
	soapMessage = soapMessage + "<" + nameOfParentObject + ">"; 
	
	/*** Checking is empty for parent key/value Map.*/
	if(parentKeyValueMap.length() > 0)
	{
		/*** Getting all the keys of parent key/value Map.*/
 		var keySetArray = parentKeyValueMap.getKeySet();
 		/*** The body of the SOAP message (Setting Integration Tags).*/
 		for(var k = 0; k < keySetArray.length; k++) 
 		{
       		var integrationTag = keySetArray[k];
       		var queryCriteria = parentKeyValueMap.get(integrationTag);
       		if(containsSpecialCharacters(queryCriteria) >= 0)
       		{
       			queryCriteria = encodeXMLTag(queryCriteria);
       		}
       		/*** Inside this "for" loop, adding all the parent fields to the SOAP Message.*/
       		soapMessage = soapMessage + "<" + integrationTag + ">" + queryCriteria + "</" + integrationTag + ">";
    	}
 	}

	/**** Iterating Child Object Map Start.****/	
	if((typeof childObjMap != null) && (childObjMap instanceof Map) && childObjMap.length() > 0)
	{
		/**** Getting all the keys (child object names) of child Map (object name and key/valueMap).****/
 		var childObjNameSetArray = childObjMap.getKeySet();
 		
		for(var k = 0; k < childObjNameSetArray.length; k++)
		{
			var childObjName = childObjNameSetArray[k];
			soapMessage = soapMessage + "<SOAPSDK2:ListOf" + childObjName + ">";
			soapMessage = soapMessage + "<" + childObjName + ">";

			var oneChildObjMap = childObjMap.get(childObjName);
			if((typeof oneChildObjMap != null) && (oneChildObjMap instanceof Map) && oneChildObjMap.length() > 0) 
			{
				/*** Getting all the keys of one child object key/value Map.*/
 				var keySetArray = oneChildObjMap.getKeySet();
				/*** The body of the SOAP message (Setting Integration Tags).*/
				for(var n = 0; n < keySetArray.length; n++)	
				{
					var integrationTag = keySetArray[n];
					var queryCriteria = oneChildObjMap.get(integrationTag);
					if(containsSpecialCharacters(queryCriteria) >= 0)
					{
						queryCriteria = encodeXMLTag(queryCriteria);
					}
					/*** Inside this "for" loop, adding all the child object fields to the SOAP Message.*/
					soapMessage = soapMessage + "<" + integrationTag + ">" + queryCriteria + "</" + integrationTag + ">";
				}				
			}
			soapMessage = soapMessage + "</" + childObjName + ">";
			soapMessage = soapMessage + "</SOAPSDK2:ListOf" + childObjName + ">";
		}
	}
	/**** Iterating Child Object Map End.****/	
	soapMessage = soapMessage + "</" + nameOfParentObject + ">";
	soapMessage = soapMessage + "</SOAPSDK2:ListOf" + nameOfParentObject + ">";
	if(nameOfParentObject.toLowerCase() == "activity"){
		soapMessage = soapMessage + "</SOAPSDK1:ActivityNWS_Activity_" + operationName + "_Input> ";
	}else{
		soapMessage = soapMessage + "</SOAPSDK1:" + nameOfParentObject + "WS_" + nameOfParentObject + operationName+ "_Input>";
	}
	soapMessage = soapMessage + "</SOAP-ENV:Body></SOAP-ENV:Envelope>";
	return soapMessage;
}
 

function insertChild(parentKeyValueMap, nameOfParentObject, childObjMap, wsUrl) {

	var errorMsg;
	var isInserted = false;
	var operationName = INSERT_PAGE_METHOD_NAME;
	
	// This method builds SOAP message for the operation.
	var soapMessage = buildSOAPForInsertChildOperations(parentKeyValueMap, nameOfParentObject, childObjMap, operationName);
	
	try
	{
		/*** Getting the XMLHTTPRequest Connection handler. ***/
		wsConnection = getXMLHTTPRequest();
		
		setRequestHeaderForWS1CODOperation(wsConnection, nameOfParentObject, operationName, wsUrl);
		
		wsConnection.onreadystatechange = function(){
		
			if (wsConnection.readyState == 4)
			{
				if(wsConnection.status == 200)
				{					
					var soapResponse = wsConnection.responseText;
					var resultMap;
					resultMap = parseWS1SoapResponse(soapResponse, nameOfParentObject);
					resultArray = moveMapToArray(resultMap);
					isInserted = true;
					window.status = "Insertion completed";
				} else {					
					var xmlDOM = wsConnection.responseXML;
					var responseXmlStr = xmlObj2XmlStr(xmlDOM);
					errorMsg = parseSoapErrorRespose(responseXmlStr);
					isInserted = false;
				}
			} else {
				window.status = "Inserting with Session Id :: " + JSESSIONID;
			}
		}
		wsConnection.send(soapMessage);
		/*** Throwing exception here, as unable to throw exception from inline 
		 * function => "wsConnection.onreadystatechange = function(){}".
		 * This is because anything returned/thrown from inline function becomes 
		 * a part of "wsConnection.onreadystatechange".*/
		if(typeof errorMsg != null && errorMsg != ""){
			throw errorMsg;
		}
		
	} catch (webServiceEx) {
		window.status = "Exception occured during Insert operation!";
	}
	return isInserted;
}
  
 function getCallRecordContacts(callReportRecId, wsUrl)
 {
	try {

		var callRecordQueryMap = new Map();
		callRecordQueryMap.put("CustomObject1Id", "='" + callReportRecId + "'");
		callRecordQueryMap.put("IndexedPick3", "");
		callRecordQueryMap.put("bUpdate_Authorized_User", "");
	
		var contactQueryMap = new Map();
		contactQueryMap.put("ContactId", "");	
		
		var childObjectsMap = new Map();
		childObjectsMap.put("Contact", contactQueryMap);
		
		
		var resultMapArray = queryWithChild(callRecordQueryMap, "CustomObject1", childObjectsMap, wsUrl, "WS1.0");
		
		return resultMapArray;	
	
	}catch (err){
		alert(err.message + " , " + err.line);
		throw err;		
	}
 }
 
 function isContactExisting(callReportRecId, contactIdToCheck, wsUrl)
 {

		
		var resultMapArray = getCallRecordContacts(callReportRecId, wsUrl);
		var isContactExists = false;
		var contactAndOdResultArray = new Array(2);

	if(resultMapArray.length > 0)
	{
	
		var oneParentObjMap = resultMapArray[0];		
		/*** Checking whether Account Plan Map contains child Contact Map.*/
		if(oneParentObjMap.containsKey("ListOfContact")) 
		{
			/*** Geting Map of all Child Contacts.*/
			var listOfContactMap = oneParentObjMap.get("ListOfContact");
			/*** Validity check for Map of all Child Contacts. */				
			if((typeof listOfContactMap != null) && (listOfContactMap instanceof Map) && listOfContactMap.length() > 0) 
			{
				var allContKeySetArray = listOfContactMap.getKeySet(); 
				for(var k = 0; k < allContKeySetArray.length; k++) 
				{
					/*** Geting one Contact child Map key from ListOfContact Map. */
					/*** Key is of the format "Contact::1" */
					var contactDCNoKey = allContKeySetArray[k];
					var oneChildContactMap = listOfContactMap.get(contactDCNoKey);
					/*** Validity check for Map of one Child Contacts.*/
					if(oneChildContactMap instanceof Map) 
					{
						var contactId = oneChildContactMap.get("ContactId");
						if(contactId == contactIdToCheck)
						{
							isContactExists = true;
							break;
						}
					}
				}
			}
		}
	}
	contactAndOdResultArray[0] = resultMapArray;
	contactAndOdResultArray[1] = isContactExists;
	return contactAndOdResultArray;
 }
	
function loginOCOD(wsLocation, username, password) {
	httpRequest = getXMLHTTPRequest();
	var ocodURL = wsLocation + "?command=login";
	httpRequest.open("post", ocodURL, false);
	httpRequest.setRequestHeader("UserName", username);
	httpRequest.setRequestHeader("Password", password);
	httpRequest.setRequestHeader("Content-Type", "application/xml; charset=utf-8");
	httpRequest.onreadystatechange = setJSessionId;
	try {
		httpRequest.send();
	} catch (loginEx) {
		alert("Cannot Access OnDemand. Login Failed");
		window.status = "Cannot Access OnDemand. Login Failed";
		throw "Cannot Access OnDemand. Login Failed";
	}
	return JSESSIONID;
}



function logOffOCOD(wsLocation) {
	if (JSESSIONID != WSTK_EMPTY_STRING) {
		window.status = "Loging Off From OnDemand.";
		httpRequest = getXMLHTTPRequest();
		var ocodURL = wsLocation + "?command=logoff";
		httpRequest.open("post", ocodURL, false);
		httpRequest.setRequestHeader("Cookie", JSESSIONID);
		httpRequest.onreadystatechange = invalidateOcodSessionId;
		try {
			httpRequest.send();
		} catch (logOffEx) {
			window.status = "OCOD LogOff Operation Failed.";
		}
	}
}


function invalidateOcodSessionId() {
	if (httpRequest.readyState == 4) {
		window.status = "Performing web-service logoff from OnDemand, Status :: " + httpRequest.status;
		if (httpRequest.status == 200) {
			JSESSIONID = WSTK_EMPTY_STRING;
			window.status = "Web-service logoff successful.";
		} else {
			window.status = "Web-service logoff Failed! Status: " + httpRequest.status;
		}
	} else {
		window.status = "Performing web-service logoff from OnDemand, Ready Status :: " + httpRequest.readyState;
	}
}
 
 // will return the parameter value from URL.
function getParameterFromURL(queryString, parameterName){
	var parameterName = parameterName + "=";
	if ( queryString.length > 0 ){
		begin = queryString.indexOf (parameterName);
		if ( begin != -1 ){
			begin += parameterName.length;
			end = queryString.indexOf ( "&" , begin );
			if ( end == -1 ){
				end = queryString.length;
			}
			return queryString.substring(begin, end);
		} 
		return null;
	}
 } 
 
 function addCallRecordContact(contactId, contactExtId, contactStatus)
 {
 	try	
	{
		
		callReportRecId = getParameter("callReportRecId");	
		SSO_TOKEN = encodeURIComponent(unescape(getParameter("ssotoken")));
			
		var refSSOTokenIframeId = window.parent.document.getElementById('refSSOTokenDivId');
		var IFRAME_SRC_URL = refSSOTokenIframeId.src;
		var ssoToken = encodeURIComponent(unescape(getParameterFromURL(IFRAME_SRC_URL,'SSO_TOKEN')));
		SSO_TOKEN = ssoToken;
				
		var wsUrl = WS_LOCATION;
		var contactAndOdResultArray = isContactExisting(callReportRecId, contactId, wsUrl);
		var isContactExists = contactAndOdResultArray[1];
		
		if(!isContactExists)
		{
			
			var callRecordInsertionMap = new Map();
		 	callRecordInsertionMap.put("CustomObject1Id", callReportRecId);
		 	
			var contactInsertionMap = new Map();
			contactInsertionMap.put("ContactId", contactId);
		
			var childObjectsMap = new Map();
			childObjectsMap.put("Contact", contactInsertionMap);
		
			var isInserted = insertChild(callRecordInsertionMap,  "CustomObject1", childObjectsMap, wsUrl);
			window.status = "Contact inserted successfully.";
		
			//window.parent.location.reload();
			//window.parent.location.href = "/OnDemand/user/CustomObj1Detail?CustObj1DetailForm.Id=" + callReportRecId + //"&OMTGT=CustObj1DetailForm&OMTHD=CustomObject1DetailChildNav&OMRET0=AccountDetail&ocTitleField=Name;";
			var addLinkControlID = "Z_" + contactId;
			
			var addLinkControl = document.getElementById(addLinkControlID);
			if (addLinkControl!=null){
				addLinkControl.innerHTML="Added";
			}
			//alert(contactAndOdResultArray[0]);
			if(contactAndOdResultArray[0]!='undefined' && typeof(contactAndOdResultArray[0])!='undefined' && contactAndOdResultArray[0].length>0){
				
				var resultMapArray = contactAndOdResultArray[0];
				var oneParentObjMap = resultMapArray[0];
				//alert(oneParentObjMap.get('IndexedPick3'));
				var publicPrivate = oneParentObjMap.get('IndexedPick3');
				var isCheckboxChecked = oneParentObjMap.get('bUpdate_Authorized_User');
				if(isCheckboxChecked=='undefined' || typeof(isCheckboxChecked)=='undefined'){
					isCheckboxChecked = 'N';
				}
				contactExtId = trim(contactExtId);
				alert('Ext Id:'+contactExtId);
				alert('Ext Id Len:'+contactExtId.length);
				alert('Status:'+contactStatus);
				if(publicPrivate=='Private' && isCheckboxChecked=='N' && contactExtId!='undefined' && typeof(contactExtId)!='undefined' && contactExtId.length>0 && contactStatus!='undefined' && typeof(contactStatus)!='undefined' && contactStatus.length>0 && contactStatus=='Active'){
					alert('Proceed with insert child to team now');
					var callReportTeamInsertionMap = new Map();
					callReportTeamInsertionMap.put("CustomObject1Id", callReportRecId);
					
					var userInsertionMap = new Map();
					userInsertionMap.put("UserExternalSystemId", contactExtId);
					userInsertionMap.put("CustomObject1AccessId", "AAPA-751GNI");
					
					var childObjectsMap = new Map();
					childObjectsMap.put("Team", userInsertionMap);
					
					var isInsertedInTeam = insertChild(callReportTeamInsertionMap,  "CustomObject1", childObjectsMap, wsUrl);
					window.status = "Associated Internal Contact to Team.";
				}
			}
		}
		else
		{
		 	alert("Contact has already been added to this call report.");
			var addLinkControl = document.getElementById(addLinkControlID);
			if (addLinkControl!=null){
				addLinkControl.innerHTML="Added";
			}			
		}
		logOffOCOD(WS_LOCATION);
	} 
	catch (logOffEx) {
		alert("Web Service Operation For Contact Association Failed. " + logOffEx.message)
		window.status = "Web Service Operation For Contact Association Failed.";
	}	
 }
  
//Set interval to fire after 7 minutes = 7*60*1000 milliseconds = 420000 : For SSO Token.
//Set interval to fire after 4 minutes = 4*60*1000 milliseconds = 240000 : For jSessionId.
//OLD CALL REMOVED AS RELOADED THE ENTIRE PAGE ....... setInterval("refreshPage()", 300000);
//Function to refresh session after every 7 minutes
// function refreshPage() {	
//	callReportRecId = getParameter("callReportRecId");	
//	SSO_TOKEN = encodeURIComponent(unescape(getParameter("ssotoken")));
//	
//	window.parent.location.href = "/OnDemand/user/CustomObj1Detail?CustObj1DetailForm.Id=" + callReportRecId + "&OMTGT=CustObj1DetailForm&OMTHD=CustomObject1DetailChildNav&OMRET0=AccountDetail&ocTitleField=Name;";
// }

</script>	

<table class="list" id="table1" title="Results" cellSpacing="0" cellPadding="0" border="0" width="100%">		
	<tr bgcolor="#606060">
		<th>&nbsp;</th>
		<th><font color="FFFFFF">Last Name</font></th>
		<th><font color="FFFFFF">First Name</font></th>
		<th><font color="FFFFFF">Work Phone #</font></th>
		<th><font color="FFFFFF">Email</font></th>
		<th><font color="FFFFFF">Contact Type</font></th>
		<th><font color="FFFFFF">Job Title</font></th>
	</tr>
