$(document).on('pagecreate','#pageone',function(){
  $('p').on("click",function(){
    $(this).hide();
  });
  $('#getdata-button').on("click",function(){
	  alert('Called!');
	  $.getJSON('json-data.php', function(data) {

            //alert(data); //uncomment this for debug

            //alert (data.item1+" "+data.item2+" "+data.item3); //further debug

            $('#showdata').html("<p>item1="+data.item1+" item2="+data.item2+" item3="+data.item3+"</p>");

      });
  });
  $('#getAllProduct').on("click",function(){
	  //alert('Get All Product');
	  $.getJSON('get_all_products.php', function(dataAllProduct) {
			
			//alert(dataAllProduct); //uncomment this for debug
			
			// Can not use JSON.parse
			//objAllProduct = JSON.parse(dataAllProduct);
			
			// Using console.log to print JSON (debug purpose)
			console.log(dataAllProduct);
			console.log(dataAllProduct.products[1].name);
			console.log(dataAllProduct.products);
			console.log(dataAllProduct.products.length);
			if (dataAllProduct.success == 1) {
				var i;
    			var out = "<table>";
				for(i = 0; i < dataAllProduct.products.length; i++) {
					out += "<tr><td>" + 
					dataAllProduct.products[i].name +
					"</td><td>" +
					dataAllProduct.products[i].price +
					"</td><td>" +
					dataAllProduct.products[i].created_at +
					"</td></tr>";
				}
				out += "</table>";
			};

            $('#showAllProduct').html(out);

      });
  });
  $('#btnGetTheProduct').on('click',function(){
	  $('#popupEnterProductId').popup('close');
	  productId = $('#dfnProductID').val();
	  //alert('Get The Product - ' + productId);  //uncomment this for debug
			
	  // MUST BE Initiated for clear dataTheProduct.success value from previous process
	  // NO MORE the server side always set the value
	  //success = null;
			
	  $.getJSON('get_product_details.php?pid='+productId, function(dataTheProduct) {
			
			//alert(dataTheProduct); //uncomment this for debug
			
			// Can not use JSON.parse
			//objTheProduct = JSON.parse(dataTheProduct);
			
			success = dataTheProduct.success;
			
			if (success == 1) {
				var i;
    			var out = "<table>";
				for(i = 0; i < dataTheProduct.product.length; i++) {
					out += "<tr><td>" + 
					dataTheProduct.product[i].name +
					"</td><td>" +
					dataTheProduct.product[i].price +
					"</td><td>" +
					dataTheProduct.product[i].created_at +
					"</td></tr>";
				}
				out += "</table>";

            	$('#showTheProduct').html(out);
			}
			else {
				strErrorMessage = 'Product ID '+ productId +' not found.';
				//alert(strErrorMessage); //uncomment this for debug
				$('#strErrorMessage').html(strErrorMessage);
				$('#popupErrorMessage').popup('open');
			};
      });
  });
  $('#btnCreateProduct').on('click',function(){
	  // Set variable from popupCreateProduct
	  var product = {
		  name:$('#dfsProductName').val(),
		  price:$('#dfnProductPrice').val(),
		  description:$('#dfsProductDescription').val()
	  };
	  //close popupCreateProduct
	  $('#popupCreateProduct').popup('close');
	  
	  //alert(product.name); //uncomment this for debug
	  
	  // Post product
	  $.post(
	      //Specifies the url to send the request to
		  "create_product.php",
		  
		  //Specifies data to send to the server along with the request
		  product,
		  
		  //Specifies a function to run if the request succeeds
		  function(dataProduct,status){
			  //alert("Data: " + dataProduct + "\nStatus: " + status);
			  if (dataProduct.success == 1) {
				  	var i;
					var out = "<table>";
					for(i = 0; i < dataProduct.product.length; i++) {
						out += "<tr><td>" + 
						dataProduct.product[i].pid +
						"</td><td>" +
						dataProduct.product[i].name +
						"</td><td>" +
						dataProduct.product[i].price +
						"</td><td>" +
						dataProduct.product[i].description +
						"</td></tr>";
					}
					out += "</table>";
	
					$('#showCreatedProduct').html(out);
			  }
		  },
		  
		  //Specifies the data type expected of the server response
		  "json"
	  );
  });
});