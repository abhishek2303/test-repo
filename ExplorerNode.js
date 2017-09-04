'use strict';

//var appendExplorerNodeFactory = require("./appendExplorerNodeFactory");

function ExplorerNode (explorer, zipObj) {
  this.explorer = explorer;
  this.zipObj = zipObj;
  this._initializeNode();
}

ExplorerNode.prototype._initializeNode = function() {
  this.childNodes = [];
  this.childFiles = [];
  this.text = "{}";
};

ExplorerNode.prototype.setZipObj = function(zipObj) {
  this.zipObj = zipObj;
};

ExplorerNode.prototype.setName = function(name) {
  this.name = name;
};

ExplorerNode.prototype.setJSONText = function(text) {
  this.text = text;
}

ExplorerNode.prototype.appendNode = function(node) {
  if (this.isDir()) {
    //throw error
    return  ;
  }

  if(node.isDir()) {
    this.childNodes.push(node);
  }

  else {
    this.childFiles.push(node);
  }
};

ExplorerNode.prototype.isDir = function() {
  return this.zipObj.dir;
};

// ExplorerNode.prototype.getJSONText = function() {
//   if(this.isDir()) return ;
//   var text = "";
//   var promiseText = this.zipObj.async("string");
//   promiseText.then(function(str){
//     this.text = str;
//     text = str;
//     return step(str)
//       .then(null, function(){
//         return Error();
//       });
//   }).then(null, function(){
//     console.log("Ended");
//   });
//   return text;
// };

ExplorerNode.prototype.getJSONText = function() {
  return this.text;
};

ExplorerNode.prototype.getText = function(){
  return this.text;
};

ExplorerNode.prototype.setParent = function(node) {
  this.parent = node;
};

ExplorerNode.prototype.getParent = function() {
  return this.parent;
};

ExplorerNode.prototype.appendChild = function(node) {
  //check if the present node is a file
  if(!this.isDir()) {
    //TODO: Throw error or log it
    return ;
  }
  node.setParent(this);
  if(node.isDir()) {
    this.childNodes.push(node);
  }
  else {
    this.childFiles.push(node);
  }
};

ExplorerNode.prototype.getChildNode = function(childNodeName) {
  var childnodes = this.childNodes;

  for(var i=0; i < childnodes.length; i++) {
    if(childnodes[i].name === childNodeName) {
      return childnodes[i];
    }
  }
  childnodes = this.childFiles;
  for(var i=0; i < childnodes.length; i++) {
    if(childnodes[i].name === childNodeName) {
      return childnodes[i];
    }
  }
  return undefined;
};

ExplorerNode.prototype._hasChilds = function () {
  return (this.childNodes == 0 ||
              this.childFiles == 0);
};

ExplorerNode.prototype._totalChilds = function () {
  return (this.childNodes.length + this.childFiles.length);
};

ExplorerNode.prototype.getLevel = function() {
  return (this.parent ? this.parent.getLevel() + 1 : 0);
};

//module.exports = ExplorerNode;
