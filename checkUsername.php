<!--This page is the checkUsername php page called checkUsername.php. This page
collects the form data from registration.html for the username field and makes
sure they are not already being used in the database.
Created by: Mark Cirincione
Date of Creation: 4/25/16
Last Date of Modification: 5/4/16 -->

<?php
	#connect to mysql database
	$db = mysql_connect("studentdb-maria.gl.umbc.edu","xr43817","xr43817");

	if(!$db) {
		echo 'Could not connect using studentdb-maria.gl.umbc.edu: ' . mysql_error();
		
		$db = mysql_connect("studentdb-maria.gl.umbc.edu","xr43817","xr43817");
		if(!$db)
			die('Could not connect using localhost: ' . mysql_error());
	}	

	#select database root
	$er = mysql_select_db("xr43817");
	if(!$er)
		exit("Error - could not select database");
	
	$query2 = "SELECT user_name from USERS"; 
	$result2 = mysql_query($query2);
	
	#Array declaration
	$usernameArray=array();
	
	#Populates array with usernames from the database
	while($row = mysql_fetch_array($result2)){
		$usernameArray[]=$row["user_name"];
	}
	
	#retrieve value of parameter by name 'user_name' and store the value in the local variable $chkEmail
	$checkUsername=$_GET["user_name"];
	
	#Checks user input to see if their email is in the database
	if (in_array($checkUsername,$usernameArray)){
		$response="Username in database.";
	}
	else{
		$response="Username not in database.";
	}
	echo $response;
	
?>