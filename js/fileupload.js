$(document).ready(function (e) {
    $("#filePush").on('click',(function(e) {
     e.preventDefault();
     $.ajax({
            url: "includes/fileupload.php",
            type: "PUT",
            data:  $(".file-field").val(),
            contentType: false,
            cache: false,
            processData:false,
            beforeSend : function(){
                $("#fileErr").fadeOut();
            },
            success: function(data){
                if(data=='invalid'){
                        $("#fileErr").html("Invalid File !").fadeIn();
                }else{
                    // view uploaded file.
                    $("#preview").html(data).fadeIn();
                    $("#form")[0].reset(); 
                }
            },
            error: function(e) {
                $("#fileErr").html(e).fadeIn();
            }          
       });
    }));
});