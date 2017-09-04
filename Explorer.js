'use strict';

//var ExplorerNode = require("./ExplorerNode.js");


/**
 * @constructor Explorer
 * @param {Object} jszipObject
 */
function Explorer (jszip) {
  this.jszip = jszip;
  this._initialize();
}

Explorer.prototype._initialize = function() {
  this.rootNode = undefined;
};

Explorer.prototype.exists = function(path) {
  // var path = zipObj.name;
  var paths = path.split('/');

  var len = paths.length;
  if(paths[len-1] === "") len = len-1;

  if(this.rootNode) {
    var prevNode = undefined, currNode = this.rootNode, nextNode;
    //console.log("Inserting node " + zipObj.name);
    for(var i=0; i < len-1; i++) {
      //console.log("Current Node: " + currNode.name);
      var childNodeName = paths[i+1];
      nextNode = currNode.getChildNode(childNodeName);
      prevNode = currNode;
      currNode = nextNode;
      //console.log("Next node: " + currNode);
      if(!currNode) return undefined;
    }
    /*var childNodeName = path[len-1];
    nextNode = currNode.getChildNode(childNodeName);
    prevNode = currNode;
    currNode = nextNode;*/

    return currNode;
  }

  return undefined;
};

Explorer.prototype._insert = function(zipObj) {
  var path = zipObj.name;
  //console.log(path);

  path = path.split('/')
  var len = path.length;
  if(path[len-1] === "") len = len-1;


  if(this.rootNode) {
    var prevNode = undefined, currNode = this.rootNode, nextNode;
    //console.log("Inserting node " + zipObj.name);
    for(var i=0; i < len-1; i++) {
      //console.log("Current Node: " + currNode.name);
      var childNodeName = path[i+1];
      nextNode = currNode.getChildNode(childNodeName);
      prevNode = currNode;
      currNode = nextNode;
      //console.log("Next node: " + currNode);
      if(!currNode) break;
    }

    currNode = new ExplorerNode(this, zipObj);
    currNode.setParent(prevNode);
    //currNode.setZipObj(zipObj);
    currNode.setName(path[len-1]);
    prevNode.appendChild(currNode);
    currNode.getJSONText();
  }
  else {
    this.rootNode = new ExplorerNode(this, zipObj);
    //this.rootNode.setZipObj(zipObj);
    this.rootNode.setName(path[0]);
    this.rootNode.setParent(undefined);
    this.rootNode.getJSONText();
  }

  //console.log("\n \n")
};

Explorer.prototype.insertNodes = function() {
  var list = [];
  this.jszip.forEach(function(relativePath, zipEntry) {
    list.push(zipEntry);
  });
  for(var i = 0; i <  list.length; i++) {
    this._insert(list[i]);
  }
};

Explorer.prototype.setText = function(path, text) {
  var node = this.exists(path);
  if(!node) return false;
  if(text === "") text = "{}";
  node.setJSONText(text);
  return true;
};

Explorer.prototype._delete = function(node) {
  //node.getParent
};

Explorer.prototype.destroy = function() {
  //destroy explorer
};

Explorer.prototype.traverse = function() {

};

Explorer.prototype.clear = function() {

};

//module.exports = Explorer;
