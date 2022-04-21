$(document).ready(function (e) {
    $("#filePush").on('click',(function(e) {
     e.preventDefault();
     $.ajax({
            url: "includes/fileupload.php",
      type: "POST",
      data:  $(".file-field").val(),
      contentType: false,
            cache: false,
      processData:false,
      beforeSend : function()
      {
       //$("#preview").fadeOut();
       $("#fileErr").fadeOut();
      },
      success: function(data)
         {
       if(data=='invalid')
       {
        // invalid file format.
        $("#fileErr").html("Invalid File !").fadeIn();
       }
       else
       {
        // view uploaded file.
        $("#preview").html(data).fadeIn();
        $("#form")[0].reset(); 
       }
         },
        error: function(e) 
         {
       $("#fileErr").html(e).fadeIn();
         }          
       });
    }));
   });