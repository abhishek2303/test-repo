var text = "";

var jsonStr1;
var jsonStr2;
var json1;
var json2;

var same = [];
var changed = [];
var removed = [];
var added = [];

var pathAndTextHolder1 = {};
var pathAndTextHolder2 = {};
var list1 = [];
var list2 = [];
var fileNameList1 = [];
var fileNameList2 = [];

var exists1, exists2;

var explorer1, explorer2;


function fileDiff(root1, root2) {

	linkTextsIntoTree();

	if(root1 && root2){
		for(var i = 0; i < list1.length; i++) {
			exists1 = explorer1.exists(list1[i].name);
			exists2 = explorer2.exists(list1[i].name);

			if ( !(exists1 && exists2) ) {
				var nm = fileNameList1[i];
				var res = nm.split("/");
				var str = res.join("z_z_s");
				$('#'+str).addClass( "removed" );

			} else {

				if(!exists1.isDir() && !exists2.isDir()) {
					jsonStr1 = exists1.getJSONText();
					jsonStr2 = exists2.getJSONText();
					// jsonStr1 = JSONWrapper(exists1);
					// jsonStr2 = JSONWrapper(exists2);
					json1 = JSON.parse(jsonStr1);
					json2 = JSON.parse(jsonStr2);

					if(json1 === json2) //json content equal
					{
						var nm =fileNameList1[i];
						var res = nm.split("/");
						var str = res.join("y_y_s");
						$('#'+str).removeClass( "removed" );
						same.push({exists1, exists2});
					}
					else {
						var nm =fileNameList1[i];
						var res = nm.split("/");
						var str1 = res.join("y_y_s");
						var str2 = res.join("z_z_s");
						$('#'+str1).addClass( "changed" );
						$('#'+str2).addClass( "changed" );
						$('#'+str1).removeClass( "removed" );
						$('#'+str2).removeClass( "removed" );
					}
				}
			}
		}

		for(var i=0;i<list2.length;i++) {
		   if(fileNameList1.indexOf(fileNameList2[i])==-1){
			   //file not present in list1 therefore mark green in list2  }
			   var nm =fileNameList2[i];
				var res = nm.split("/");
				var str = res.join("y_y_s");
				$('#'+str).addClass( "added" );
				//$('#'+str).css("background-color", "#bbffbb");
			}
			else
			{
				var nm =fileNameList2[i];
				var res = nm.split("/");
				var str = res.join("z_z_s");
				$('#'+str).removeClass( "added" );

			}
		}
	}

}


function linkTextsIntoTree() {
	explorer1 = new Explorer(root1);
	explorer2 = new Explorer(root2);
	explorer1.insertNodes();
	explorer2.insertNodes();

	for(var path in pathAndTextHolder1) {
		explorer1.setText(path, pathAndTextHolder1[path]);
	}

	for(var path in pathAndTextHolder2) {
		explorer2.setText(path, pathAndTextHolder2[path]);
	}
}



function loadFiles (root1, root2) {
	pathAndTextHolder1 = {};
	pathAndTextHolder2 = {};
	list1 = [];
	list2 = [];
	fileNameList1 = [];
	fileNameList2 = [];

	if(root1 && root2)
	{
		//alert();
		root1.forEach(function (relativePath, zipEntry)
		{
			list1.push(zipEntry);
			fileNameList1.push(zipEntry.name);
			if(!zipEntry.dir) {
				zipEntry.async("string").then(function(str){
					//jsonarr1.push(str);
					pathAndTextHolder1[relativePath] = str;
				});
			}
		});

		root2.forEach(function (relativePath, zipEntry)
		{
			list2.push(zipEntry);
			fileNameList2.push(zipEntry.name);
			if(!zipEntry.dir) {
				zipEntry.async("string").then(function(str){
					//jsonarr2.push(str);
					pathAndTextHolder2[relativePath] = str;
				});
			}
		});

		// explorer1 = new Explorer(root1);
		// explorer2 = new Explorer(root2);
		// explorer1.insertNodes();
		// explorer2.insertNodes();

	}
}

function fileDifference (root1, root2) {

	linkTextsIntoTree();

	same = [];
	changed = [];
	deleted = [];

	if(root1 && root2){
		for(var i = 0; i < list1.length; i++) {
			exists1 = explorer1.exists(list1[i].name);
			exists2 = explorer2.exists(list1[i].name);

			//same path found in zip 2
			if(exists2) {
				jsonStr1 = exists1.getJSONText();
				jsonStr2 = exists2.getJSONText();
				json1 = JSON.parse(jsonStr1);
				json2 = JSON.parse(jsonStr2);

				//if both objects exists, check the content
				if (jsonStr1 === jsonStr2) {
					same.push({exists1, exists2});
				}
				//if both objects exists and contents not equal
				//mark orange in both the list
				else {
					changed.push({exists1, exists2});
					var nm =fileNameList1[i];
					var res = nm.split("/");
					var str1 = res.join("z_z_s");
					var str2 = res.join("y_y_s");
					$('#'+str1).addClass( "changed" );
					$('#'+str2).addClass( "changed" );
					$('#'+str1).removeClass( "removed" );
					$('#'+str2).removeClass( "removed" );
				}
			}
			//if not found
			//mark red (file not present)
			else{
				removed.push(exists1);
				var nm = fileNameList1[i];
				var res = nm.split("/");
				var str = res.join("z_z_s");
				$('#'+str).addClass( "removed" );
			}
		}

		for(var i = 0; i < list2.length; i++) {
			exists1 = explorer1.exists(list2[i].name);
		 	exists2 = explorer2.exists(list2[i].name);

		 	//if if exists1 exists, it has already been taken care of above.
		 	//if it doesn't exists, then exists2 has been added in zip2
			//mark green
			if(!exists1) {
				added.push(exists2);
				var nm =fileNameList2[i];
				var res = nm.split("/");
				var str = res.join("y_y_s");
				$('#'+str).addClass( "added" );
			}
		}
	}

}
