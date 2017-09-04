var jsonStr1;
var jsonStr2;
var json1;
var json2;
var jsonarr1 = [];
var jsonarr2 = [];
var jsonFileNameArr1 = [];
var jsonFileNameArr2 = [];



function fileDifference(root1, root2){

	if(root1 && root2)
	{
		//alert();

		list1 = [];
		fileNameList1 = [];
		list2 = [];
		fileNameList2 = [];
		root1.forEach(function (relativePath, zipEntry)
		{
			list1.push(zipEntry);
			fileNameList1.push(zipEntry.name);
		});

		root2.forEach(function (relativePath, zipEntry)
		{
			list2.push(zipEntry);
			fileNameList2.push(zipEntry.name);
		});

		for(var i = 0; i < list1.length; i++) {
		   if(fileNameList2.indexOf(fileNameList1[i])==-1){
			   //file not present in list2 therefore mark red in list1
				var nm =fileNameList1[i];
				var res = nm.split("/");
				var str = res.join("z_z_s");
				$('#'+str).addClass( "removed" );

				/*$('#'+str).css("background-color", "#ffbbbb");
				$('#'+str).css("text-decoration", "line-through");*/

			}
			else
			{
				var jsonObject1 = list1[i];
				var jsonObject2 = list2[fileNameList2.indexOf(fileNameList1[i])];

				if(!jsonObject1.dir && !jsonObject2.dir)
				{

					jsonObject1.async("string").then(function(str){
					//console.log(str);
					jsonStr1=str;
					//console.log(jsonStr1);
					//alert(jsonStr1);
					json1 = JSON.parse(jsonStr1);
					jsonarr1.push(json1);
					jsonFileNameArr1.push(jsonObject1.name);
					});

					jsonObject2.async("string").then(function(str){
					//console.log(str);
					jsonStr2 = str;
					//console.log(jsonStr2);
					//alert(jsonStr2);
					json2 = JSON.parse(jsonStr2);
					jsonarr2.push(json2);
					jsonFileNameArr2.push(jsonObject2.name);
					});


					if(json1 === json2) //json content equal
					{
						var nm =fileNameList1[i];
						var res = nm.split("/");
						var str = res.join("y_y_s");
						//$('#'+str).css("background-color", "#ffffff");
						//$('#'+str).css("text-decoration", "none");
						$('#'+str).removeClass( "removed" );
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
						//$('#'+str).css("background-color", "#ffffff");
						//$('#'+str).css("text-decoration", "none");
					}
				}

				/*if(!jsonObject2.dir)
				{

					jsonObject2.async("string").then(function(str){
					//console.log(str);
					jsonStr2 = str;
					console.log(jsonStr2);
					//alert(jsonStr2);
					json2 = JSON.parse(jsonStr2);
					});
										//
				}*/


				/*if(json1 && json2) {
					if(json1 === json2) //json content equal
					{
						var nm =fileNameList1[i];
						var res = nm.split("/");
						var str = res.join("y_y_s");
						//$('#'+str).css("background-color", "#ffffff");
						//$('#'+str).css("text-decoration", "none");
						$('#'+str).removeClass( "removed" );
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
						//$('#'+str).css("background-color", "#ffffff");
						//$('#'+str).css("text-decoration", "none");
					}
				}*/


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
